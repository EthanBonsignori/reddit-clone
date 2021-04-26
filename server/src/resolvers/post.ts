import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { Upvote } from '../entities/Upvote';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { FieldError } from '../utils/FieldError';
import { validatePost } from '../utils/validatePost';

@InputType()
export class PostInput {
  @Field()
  title: string;

  @Field()
  text: string;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];

  @Field()
  hasMore: boolean;
}

@ObjectType()
class PostResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Post, { nullable: true })
  post?: Post;
}

@Resolver(Post)
export class PostResolver {
  @FieldResolver(() => User)
  async creator(@Root() post: Post, @Ctx() { userLoader }: MyContext) {
    return await userLoader.load(post.creatorId);
  }

  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() post: Post,
    @Ctx() { upvoteLoader, req }: MyContext,
  ) {
    if (!req.session.userId) {
      return null;
    }

    const upvote = await upvoteLoader.load({
      postId: post.id,
      userId: req.session.userId,
    });

    return upvote ? upvote.value : null;
  }

  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null,
    @Ctx() { req }: MyContext,
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (req.session.userId) {
      replacements.push(req.session.userId);
    }

    let cursorIdx = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      cursorIdx = replacements.length;
    }

    const posts = await getConnection().query(
      `
      SELECT p.*,
      ${
        req.session.userId
          ? '(SELECT VALUE FROM upvote WHERE "userId" = $2 AND "postId" = p.id) "voteStatus"'
          : 'null AS "voteStatus"'
      }
      FROM post p
      ${cursor ? `WHERE p."createdAt" < $${cursorIdx}` : ''}
      ORDER BY p."createdAt" DESC
      LIMIT $1
    `,
      replacements,
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  @Query(() => Post, { nullable: true })
  post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId', () => Int) postId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext,
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const { userId } = req.session;

    const upvote = await Upvote.findOne({ where: { postId, userId } });
    // user has voted before and they are changing vote
    if (upvote && upvote.value !== realValue) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          UPDATE upvote
          SET value = $1
          WHERE "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId],
        );

        await tm.query(
          `
          UPDATE post
          SET points = points + $1
          WHERE id = $2;
        `,
          [realValue * 2, postId],
        );
      });
      // has not voted before
    } else if (!upvote) {
      await getConnection().transaction(async (tm) => {
        await tm.query(
          `
          INSERT INTO upvote ("userId", "postId", value)
          VALUES($1, $2, $3);
        `,
          [userId, postId, realValue],
        );

        await tm.query(
          `
          UPDATE post
          SET points = points + $1
          WHERE id = $2;
        `,
          [realValue, postId],
        );
      });
    }

    return true;
  }

  @Mutation(() => PostResponse)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext,
  ): Promise<PostResponse> {
    const errors = validatePost(input);
    if (errors) {
      return { errors };
    }

    let post;
    try {
      post = await Post.create({
        ...input,
        creatorId: req.session.userId,
      }).save();
    } catch (err) {
      if (err) {
        return {
          errors: [
            {
              field: 'api',
              message: `Error from API: ${err}`,
            },
          ],
        };
      }
    }

    return {
      post,
    };
  }

  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async updatePost(
    @Arg('id') id: number,
    @Arg('title', () => String, { nullable: true }) title: string,
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof title !== 'undefined') {
      post.title = title;
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    try {
      await Post.delete(id);
    } catch (err) {
      return false;
    }
    return true;
  }
}
