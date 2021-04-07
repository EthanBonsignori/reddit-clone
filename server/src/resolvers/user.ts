import { Resolver, Mutation, InputType, Field, Arg, } from 'type-graphql'
import { User } from 'src/entities/User';

// @ObjectType()
// class FieldError {
//   @Field()
//   field: string;
//   @Field()
//   message: string;
// }

// @ObjectType()
// class UserResponse {
//   @Field(() => [FieldError], { nullable: true })
//   errors?: FieldError[];

//   @Field(() => User, { nullable: true })
//   user?: User;
// }

@InputType()
class UsernamePasswordInput {
  @Field()
  username: string

  @Field()
  password: string
}

@Resolver()
export class UserResolver {
  @Mutation(() => String)
  register(
    @Arg('options') options: UsernamePasswordInput
    // @Ctx() { }: MyContext
  ): Promise<User> {
    return User.create({
      username: options.username,
      // email: options.email,
      password: options.password,
    }).save();
  }
}