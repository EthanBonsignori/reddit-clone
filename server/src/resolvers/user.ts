import argon2 from 'argon2';
import { MyContext } from 'src/types';
import sendEmail from '../utils/sendEmail';
import {
  Arg,
  Ctx,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { v4 } from 'uuid';
import { COOKIE_NAME, FORGOT_PASSWORD_PREFIX } from '../constants';
import { User } from '../entities/User';
import { UsernamePasswordInput } from '../utils/UsernamePasswordInput';
import { validateRegister } from '../utils/validateRegister';

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
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const errors = validateRegister(options);
    if (errors) {
      return { errors };
    }

    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      user = await User.create({
        username: options.username,
        email: options.email,
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

    req.session.userId = user?.id;

    return {
      user,
    };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('usernameOrEmail') usernameOrEmail: string,
    @Arg('password') password: string,
    @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne(
      usernameOrEmail.includes('@')
        ? { email: usernameOrEmail }
        : { username: usernameOrEmail },
    );
    if (!user) {
      return {
        errors: [
          {
            field: 'usernameOrEmail',
            message: "That user doesn't exist",
          },
        ],
      };
    }
    const validPassword = await argon2.verify(user.password, password);
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

  @Mutation(() => Boolean)
  async forgotPassword(
    @Arg('email') email: string,
    @Ctx() { redis }: MyContext,
  ) {
    const user = await User.findOne({ email });
    if (!user) {
      return true;
    }

    const token = v4();
    await redis.set(
      `${FORGOT_PASSWORD_PREFIX}${token}`,
      user.id,
      'ex',
      1000 * 60 * 60 * 1, // 1hr
    );

    await sendEmail(
      email,
      `Click here to <a href='http://localhost:3000/reset-password/${token}'>reset your password</a>.`,
    );
  }

  @Mutation(() => UserResponse)
  async changePassword(
    @Arg('token') token: string,
    @Arg('password') password: string,
    @Arg('passwordRepeat') passwordRepeat: string,
    @Ctx() { req, redis }: MyContext,
  ): Promise<UserResponse> {
    if (password.length < 5) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Password must be 5 or more characters',
          },
        ],
      };
    }
    if (password !== passwordRepeat) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Passwords must match',
          },
        ],
      };
    }

    const userId = await redis.get(`${FORGOT_PASSWORD_PREFIX}${token}`);
    if (!userId) {
      return {
        errors: [
          {
            field: 'password',
            message: 'Token expired or invalid',
          },
        ],
      };
    }

    const user = await User.findOne({ id: parseInt(userId) });
    if (!user) {
      return {
        errors: [
          {
            field: 'password',
            message: 'User no longer exists',
          },
        ],
      };
    }

    const hashedPassword = await argon2.hash(password);
    user.password = hashedPassword;
    try {
      await User.save(user);
    } catch (err) {
      console.log(err);
      return {
        errors: [
          {
            field: 'username',
            message: 'Username already taken',
          },
        ],
      };
    }

    // log in user
    req.session.userId = user.id;

    return { user };
  }
}
