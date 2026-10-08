var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
let ContributorInput = class ContributorInput {
    name;
    role;
};
__decorate([
    Field(),
    IsNotEmpty(),
    __metadata("design:type", String)
], ContributorInput.prototype, "name", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], ContributorInput.prototype, "role", void 0);
ContributorInput = __decorate([
    InputType()
], ContributorInput);
export { ContributorInput };
let CreateProjectInput = class CreateProjectInput {
    title;
    description;
    impact;
    studentName;
    teamName;
    coverImage;
    screenshots;
    category;
    techStack;
    contributors;
    demoUrl;
    youtubeUrl;
    githubUrl;
};
__decorate([
    Field(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "title", void 0);
__decorate([
    Field(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "description", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "impact", void 0);
__decorate([
    Field(),
    IsNotEmpty(),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "studentName", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "teamName", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "coverImage", void 0);
__decorate([
    Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProjectInput.prototype, "screenshots", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "category", void 0);
__decorate([
    Field(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], CreateProjectInput.prototype, "techStack", void 0);
__decorate([
    Field(() => [ContributorInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateProjectInput.prototype, "contributors", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "demoUrl", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "youtubeUrl", void 0);
__decorate([
    Field({ nullable: true }),
    __metadata("design:type", String)
], CreateProjectInput.prototype, "githubUrl", void 0);
CreateProjectInput = __decorate([
    InputType()
], CreateProjectInput);
export { CreateProjectInput };
//# sourceMappingURL=create-project.input.js.map