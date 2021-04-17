import {
  Resolver,
  Mutation,
  InputType,
  Field,
  Arg,
  ObjectType,
  Ctx,
  Query,
} from 'type-graphql';
import argon2 from 'argon2';
import { User } from '../entities/User';
import { MyContext } from 'src/types';
import { COOKIE_NAME } from 'src/constants';
// import { MyContext } from 'src/types';

@ObjectType()
class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string;

  @Field()
  password: string;
}

@Resolver()
export class UserResolver {
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req }: MyContext) {
    // User not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await User.findOne({ id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    // @Arg('password') password: string,
    // @Ctx() { }: MyContext
  ): Promise<UserResponse> {
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: 'username',
            message: 'Username must be 3 or more characters',
          },
        ],
      };
    }

    if (options.password.length < 5) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password must be 5 or more characters',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        // email: options.email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      if (err?.code === '23505' || err?.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'username',
              message: 'Username already taken',
            },
          ],
        };
      }
    }

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username });
    if (!user) {
      return {
        errors: [
          {
            field: 'username',
            message: "That user doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, options.password);
    if (!validPassword) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Incorrect password',
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }

  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        res.clearCookie(COOKIE_NAME);
        return resolve(true);
      }),
    );
  }
}
