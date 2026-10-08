import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<ProjectDocument>,
  ) {}

  async findAll(category?: string, search?: string): Promise<Project[]> {
    const query: Record<string, any> = {};
    if (category && category !== 'All') {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { studentName: { $regex: search, $options: 'i' } },
      ];
    }
    return this.projectModel.find(query).sort({ createdAt: -1 }).exec();
  }

  async findById(id: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async findByUser(userId: string): Promise<Project[]> {
    return this.projectModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }

  async create(createProjectInput: CreateProjectInput, userId: string): Promise<Project> {
    const project = new this.projectModel({ ...createProjectInput, userId });
    return project.save();
  }

  async update(updateProjectInput: UpdateProjectInput, userId: string): Promise<Project> {
    const { id, ...rest } = updateProjectInput;
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    if (project.userId.toString() !== userId) {
      throw new ForbiddenException('You can only update your own projects');
    }
    Object.assign(project, rest);
    return project.save();
  }

  async delete(id: string, userId: string): Promise<boolean> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');
    if (project.userId.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own projects');
    }
    await this.projectModel.findByIdAndDelete(id).exec();
    return true;
  }

  async toggleLike(id: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findById(id).exec();
    if (!project) throw new NotFoundException('Project not found');

    const likes = project.likes as any[];
    const likedIndex = likes.findIndex((uid) => uid.toString() === userId);

    if (likedIndex === -1) {
      likes.push(userId);
    } else {
      likes.splice(likedIndex, 1);
    }

    project.likes = likes;
    return project.save();
  }

  async addComment(projectId: string, userId: string, userName: string, text: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) throw new NotFoundException('Project not found');

    const comment = { user: userId, userName, text, createdAt: new Date() };
    (project.comments as any[]).push(comment);
    return project.save();
  }

  async deleteComment(projectId: string, commentId: string, userId: string): Promise<Project> {
    const project = await this.projectModel.findById(projectId).exec();
    if (!project) throw new NotFoundException('Project not found');

    const comments = project.comments as any[];
    const commentIndex = comments.findIndex((c) => c._id.toString() === commentId);
    if (commentIndex === -1) throw new NotFoundException('Comment not found');

    const comment = comments[commentIndex];
    if (comment.user?.toString() !== userId) {
      throw new ForbiddenException('You can only delete your own comments');
    }

    comments.splice(commentIndex, 1);
    project.comments = comments;
    return project.save();
  }
}
