import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { ProjectsService } from './projects.service.js';
import { Project } from './project.schema.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';
import { GqlAuthGuard } from '../auth/gql-auth.guard.js';
import { CurrentUser } from '../auth/current-user.decorator.js';
import { User } from '../users/user.schema.js';

@Resolver(() => Project)
export class ProjectsResolver {
  constructor(private projectsService: ProjectsService) {}

  // ── Public Queries ────────────────────────────────────────────────────────

  @Query(() => [Project])
  async getProjects(
    @Args('category', { nullable: true }) category?: string,
    @Args('search', { nullable: true }) search?: string,
  ): Promise<Project[]> {
    return this.projectsService.findAll(category, search);
  }

  @Query(() => Project)
  async getProjectById(@Args('id', { type: () => ID }) id: string): Promise<Project> {
    return this.projectsService.findById(id);
  }

  @UseGuards(GqlAuthGuard)
  @Query(() => [Project])
  async getMyProjects(@CurrentUser() user: User): Promise<Project[]> {
    return this.projectsService.findByUser((user as any)._id.toString());
  }

  // ── Authenticated Mutations ───────────────────────────────────────────────

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  async createProject(
    @Args('createProjectInput') createProjectInput: CreateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.create(createProjectInput, (user as any)._id.toString());
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  async updateProject(
    @Args('updateProjectInput') updateProjectInput: UpdateProjectInput,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.update(updateProjectInput, (user as any)._id.toString());
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Boolean)
  async deleteProject(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    return this.projectsService.delete(id, (user as any)._id.toString());
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  async toggleLike(
    @Args('projectId', { type: () => ID }) projectId: string,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.toggleLike(projectId, (user as any)._id.toString());
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  async addComment(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args('text') text: string,
    @CurrentUser() user: User,
  ): Promise<Project> {
    const u = user as any;
    return this.projectsService.addComment(projectId, u._id.toString(), u.name, text);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Project)
  async deleteComment(
    @Args('projectId', { type: () => ID }) projectId: string,
    @Args('commentId', { type: () => ID }) commentId: string,
    @CurrentUser() user: User,
  ): Promise<Project> {
    return this.projectsService.deleteComment(projectId, commentId, (user as any)._id.toString());
  }
}
