import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';

// ── Sub-document GraphQL types ────────────────────────────────────────────────

@ObjectType()
export class Comment {
  @Field(() => ID)
  _id: string;

  @Field(() => ID, { nullable: true })
  user?: string;

  @Field({ nullable: true })
  userName?: string;

  @Field()
  text: string;

  @Field()
  createdAt: Date;
}

@ObjectType()
export class Contributor {
  @Field()
  name: string;

  @Field({ nullable: true })
  role?: string;
}

// ── Main Document ─────────────────────────────────────────────────────────────

export type ProjectDocument = Project & Document;

@ObjectType()
@Schema({ timestamps: true })
export class Project {
  @Field(() => ID)
  _id: string;

  @Field()
  @Prop({ required: true })
  title: string;

  @Field()
  @Prop({ required: true })
  description: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  impact?: string;

  @Field()
  @Prop({ required: true })
  studentName: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  teamName?: string;

  @Field(() => ID)
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: string;

  @Field({ nullable: true })
  @Prop()
  coverImage?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  screenshots?: string[];

  @Field({ nullable: true })
  @Prop({ default: 'Other' })
  category?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [String], default: [] })
  techStack?: string[];

  @Field(() => [Contributor], { nullable: true })
  @Prop({
    type: [{ name: { type: String }, role: { type: String } }],
    default: [],
  })
  contributors?: Contributor[];

  @Field({ nullable: true })
  @Prop({ default: '' })
  demoUrl?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  youtubeUrl?: string;

  @Field({ nullable: true })
  @Prop({ default: '' })
  githubUrl?: string;

  @Field(() => [String], { nullable: true })
  @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] })
  likes?: string[];

  @Field(() => [Comment], { nullable: true })
  @Prop({
    type: [
      {
        user: { type: Types.ObjectId, ref: 'User' },
        userName: String,
        text: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
    default: [],
  })
  comments?: Comment[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}

export const ProjectSchema = SchemaFactory.createForClass(Project);
