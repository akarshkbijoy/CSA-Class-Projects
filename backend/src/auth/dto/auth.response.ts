import { ObjectType, Field } from '@nestjs/graphql';
import { User } from '../../users/user.schema.js';

@ObjectType()
export class AuthResponse {
  @Field()
  token: string;

  @Field(() => User)
  user: User;
}

@ObjectType()
export class MessageResponse {
  @Field()
  message: string;
}
