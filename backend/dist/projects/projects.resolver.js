var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { Project } from './project.schema.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';
import { GqlAuthGuard } from '../auth/gql-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { User } from '../users/user.schema.js';
let ProjectsResolver = class ProjectsResolver {
    projectsService;
    constructor(projectsService) {
        this.projectsService = projectsService;
    }
    async getProjects(category, search) {
        return this.projectsService.findAll(category, search);
    }
    async getProjectById(id) {
        return this.projectsService.findById(id);
    }
    async getMyProjects(user) {
        return this.projectsService.findByUser(user._id.toString());
    }
    async createProject(createProjectInput, user) {
        return this.projectsService.create(createProjectInput, user._id.toString());
    }
    async updateProject(updateProjectInput, user) {
        return this.projectsService.update(updateProjectInput, user._id.toString());
    }
    async deleteProject(id, user) {
        return this.projectsService.delete(id, user._id.toString());
    }
    async toggleLike(projectId, user) {
        return this.projectsService.toggleLike(projectId, user._id.toString());
    }
    async addComment(projectId, text, user) {
        const u = user;
        return this.projectsService.addComment(projectId, u._id.toString(), u.name, text);
    }
    async deleteComment(projectId, commentId, user) {
        return this.projectsService.deleteComment(projectId, commentId, user._id.toString());
    }
};
__decorate([
    Query(() => [Project]),
    __param(0, Args('category', { nullable: true })),
    __param(1, Args('search', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "getProjects", null);
__decorate([
    Query(() => Project),
    __param(0, Args('id', { type: () => ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "getProjectById", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Query(() => [Project]),
    __param(0, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "getMyProjects", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Project),
    __param(0, Args('createProjectInput')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateProjectInput,
        User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "createProject", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Project),
    __param(0, Args('updateProjectInput')),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [UpdateProjectInput,
        User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "updateProject", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Boolean),
    __param(0, Args('id', { type: () => ID })),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteProject", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Project),
    __param(0, Args('projectId', { type: () => ID })),
    __param(1, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "toggleLike", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Project),
    __param(0, Args('projectId', { type: () => ID })),
    __param(1, Args('text')),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "addComment", null);
__decorate([
    UseGuards(GqlAuthGuard),
    Mutation(() => Project),
    __param(0, Args('projectId', { type: () => ID })),
    __param(1, Args('commentId', { type: () => ID })),
    __param(2, CurrentUser()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, User]),
    __metadata("design:returntype", Promise)
], ProjectsResolver.prototype, "deleteComment", null);
ProjectsResolver = __decorate([
    Resolver(() => Project),
    __metadata("design:paramtypes", [ProjectsService])
], ProjectsResolver);
export { ProjectsResolver };
//# sourceMappingURL=projects.resolver.js.map