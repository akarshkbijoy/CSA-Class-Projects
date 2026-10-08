var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';
import { ObjectType, Field, ID } from '@nestjs/graphql';
let Comment = class Comment {
    _id;
    user;
    userName;
    text;
    createdAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], Comment.prototype, "_id", void 0);
__decorate([
    Field(() => ID, { nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "user", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "userName", void 0);
__decorate([
    Field(),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Comment.prototype, "createdAt", void 0);
Comment = __decorate([
    ObjectType()
], Comment);
export { Comment };
let Contributor = class Contributor {
    name;
    role;
};
__decorate([
    Field(),
    __metadata("design:type", String)
], Contributor.prototype, "name", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], Contributor.prototype, "role", void 0);
Contributor = __decorate([
    ObjectType()
], Contributor);
export { Contributor };
let Project = class Project {
    _id;
    title;
    description;
    impact;
    studentName;
    teamName;
    userId;
    coverImage;
    screenshots;
    category;
    techStack;
    contributors;
    demoUrl;
    youtubeUrl;
    githubUrl;
    likes;
    comments;
    createdAt;
    updatedAt;
};
__decorate([
    Field(() => ID),
    __metadata("design:type", String)
], Project.prototype, "_id", void 0);
__decorate([
    Field(),
    Prop({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "title", void 0);
__decorate([
    Field(),
    Prop({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "description", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "impact", void 0);
__decorate([
    Field(),
    Prop({ required: true }),
    __metadata("design:type", String)
], Project.prototype, "studentName", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "teamName", void 0);
__decorate([
    Field(() => ID),
    Prop({ type: Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", String)
], Project.prototype, "userId", void 0);
__decorate([
    Field({ nullable: true }),
    Prop(),
    __metadata("design:type", String)
], Project.prototype, "coverImage", void 0);
__decorate([
    Field(() => [String], { nullable: true }),
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "screenshots", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: 'Other' }),
    __metadata("design:type", String)
], Project.prototype, "category", void 0);
__decorate([
    Field(() => [String], { nullable: true }),
    Prop({ type: [String], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "techStack", void 0);
__decorate([
    Field(() => [Contributor], { nullable: true }),
    Prop({
        type: [{ name: { type: String }, role: { type: String } }],
        default: [],
    }),
    __metadata("design:type", Array)
], Project.prototype, "contributors", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "demoUrl", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "youtubeUrl", void 0);
__decorate([
    Field({ nullable: true }),
    Prop({ default: '' }),
    __metadata("design:type", String)
], Project.prototype, "githubUrl", void 0);
__decorate([
    Field(() => [String], { nullable: true }),
    Prop({ type: [{ type: Types.ObjectId, ref: 'User' }], default: [] }),
    __metadata("design:type", Array)
], Project.prototype, "likes", void 0);
__decorate([
    Field(() => [Comment], { nullable: true }),
    Prop({
        type: [
            {
                user: { type: Types.ObjectId, ref: 'User' },
                userName: String,
                text: String,
                createdAt: { type: Date, default: Date.now },
            },
        ],
        default: [],
    }),
    __metadata("design:type", Array)
], Project.prototype, "comments", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Project.prototype, "createdAt", void 0);
__decorate([
    Field(),
    __metadata("design:type", Date)
], Project.prototype, "updatedAt", void 0);
Project = __decorate([
    ObjectType(),
    Schema({ timestamps: true })
], Project);
export { Project };
export const ProjectSchema = SchemaFactory.createForClass(Project);
//# sourceMappingURL=project.schema.js.map