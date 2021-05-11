import {
  Arg,
  Ctx,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from 'type-graphql';
import { Comment } from '../entities/Comment';
import { User } from '../entities/User';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';
import { FieldError } from '../utils/FieldError';
import { validateComment } from '../utils/validateText';

@ObjectType()
class CommentResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Comment, { nullable: true })
  comment?: Comment;
}

@Resolver(Comment)
export class CommentResolver {
  @FieldResolver(() => User)
  async creator(@Root() comment: Comment, @Ctx() { userLoader }: MyContext) {
    const creator = await userLoader.load(comment.user.id);
    return creator;
  }

  // Find one
  @Query(() => Comment, { nullable: true })
  async comment(
    @Arg('id', () => Int) id: number,
  ): Promise<Comment | undefined> {
    const comment = await Comment.findOne(id, { relations: ['creator'] });
    return comment;
  }

  @Mutation(() => CommentResponse)
  @UseMiddleware(isAuth)
  async createComment(
    @Arg('text') text: string,
    @Ctx() { req }: MyContext,
  ): Promise<CommentResponse | undefined> {
    const errors = validateComment(text);
    if (errors) {
      return { errors };
    }

    let comment;
    try {
      comment = await Comment.create({
        text,
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
      comment,
    };
  }
}
