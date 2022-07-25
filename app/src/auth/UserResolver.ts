import { Arg, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import { comparePassword, getHashOfPassword } from "../helpers/bcryptHelper";
import { generateJWTToken } from "../helpers/JwtHelper";
import { UserModel } from "./UserModel";

@InputType()
class SignupInput {
  @Field()
  name: string;
  @Field()
  email: string;
  @Field()
  password: string;
  @Field({ defaultValue: false })
  is_admin: boolean;
}

@InputType()
class LoginInput {
  @Field()
  email: string;
  @Field()
  password: string;
}

@ObjectType()
class AuthOutput {
  @Field()
  token: string;
  @Field()
  user: UserModel;
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  async info() {
    return "Success";
  }

  @Mutation(() => AuthOutput)
  async signup(@Arg("input") input: SignupInput): Promise<AuthOutput> {
    let existingUser = await UserModel.findOne({
      where: {
        email: input.email,
      },
    });
    if (existingUser) {
      throw new Error("User Already Exists with the email");
    }

    let hashedPassword = getHashOfPassword(input.password);

    let newUser = await UserModel.create({
      ...input,
      password: hashedPassword,
    });

    const token = generateJWTToken(newUser);

    return {
      token: token,
      user: newUser,
    };
  }

  @Mutation(() => AuthOutput)
  async login(@Arg("input") input: LoginInput): Promise<AuthOutput> {
    let existingUser = await UserModel.findOne({
      where: {
        email: input.email,
      },
    });

    console.log(existingUser);

    if (existingUser) {
      if (comparePassword(input.password, existingUser.password)) {
        const token = generateJWTToken(existingUser);

        return {
          token,
          user: existingUser,
        };
      } else {
        throw new Error("Invalid Password");
      }
    } else {
      console.log(input.password, existingUser.email, comparePassword(input.password, existingUser.email));
      throw new Error("User does not exist");
    }
  }
}
