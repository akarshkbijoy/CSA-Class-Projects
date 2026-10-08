import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateProjectInput } from './create-project.input.js';

@InputType()
export class UpdateProjectInput extends PartialType(CreateProjectInput) {
  @Field()
  id: string;
}
