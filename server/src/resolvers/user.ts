import { Resolver, Mutation, InputType, Field, Arg, ObjectType, } from 'type-graphql'
import argon2 from 'argon2';
import { User } from '../entities/User';
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
  username: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {

  @Mutation(() => User)
  async register(
    @Arg('options') options: UsernamePasswordInput,
    @Arg('password') password: string,
    // @Ctx() { }: MyContext
  ): Promise<User> {
    const hashedPassword = await argon2.hash(password)
    return User.create({
      username: options.username,
      // email: options.email,
      password: hashedPassword,
    }).save();
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UsernamePasswordInput,
    @Arg('password') password: string,
    // @Ctx() { req }: MyContext,
  ): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username })/*  */
    if (!user) {
      return {
        errors: [{
          field: 'username',
          message: 'That user doesn\'t exist'
        }]
      }
    }
    const validPassword = await argon2.verify(user.password, password)
    if (!validPassword) {
      return {
        errors: [{
          field: 'password',
          message: 'Incorrect Password',
        }]
      }
    }

    // req.session.userId = user.id;

    return {
      user,
    };
  }
}