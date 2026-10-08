import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class ContributorInput {
  @Field()
  @IsNotEmpty()
  name: string;

  @Field({ nullable: true })
  role?: string;
}

@InputType()
export class CreateProjectInput {
  @Field()
  @IsNotEmpty()
  title: string;

  @Field()
  @IsNotEmpty()
  description: string;

  @Field({ nullable: true })
  impact?: string;

  @Field()
  @IsNotEmpty()
  studentName: string;

  @Field({ nullable: true })
  teamName?: string;

  @Field({ nullable: true })
  coverImage?: string;

  @Field(() => [String], { nullable: true })
  screenshots?: string[];

  @Field({ nullable: true })
  category?: string;

  @Field(() => [String], { nullable: true })
  techStack?: string[];

  @Field(() => [ContributorInput], { nullable: true })
  contributors?: ContributorInput[];

  @Field({ nullable: true })
  demoUrl?: string;

  @Field({ nullable: true })
  youtubeUrl?: string;

  @Field({ nullable: true })
  githubUrl?: string;
}
