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
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from './project.schema.js';
let ProjectsService = class ProjectsService {
    projectModel;
    constructor(projectModel) {
        this.projectModel = projectModel;
    }
    async findAll(category, search) {
        const query = {};
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
    async findById(id) {
        const project = await this.projectModel.findById(id).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        return project;
    }
    async findByUser(userId) {
        return this.projectModel.find({ userId }).sort({ createdAt: -1 }).exec();
    }
    async create(createProjectInput, userId) {
        const project = new this.projectModel({ ...createProjectInput, userId });
        return project.save();
    }
    async update(updateProjectInput, userId) {
        const { id, ...rest } = updateProjectInput;
        const project = await this.projectModel.findById(id).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        if (project.userId.toString() !== userId) {
            throw new ForbiddenException('You can only update your own projects');
        }
        Object.assign(project, rest);
        return project.save();
    }
    async delete(id, userId) {
        const project = await this.projectModel.findById(id).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        if (project.userId.toString() !== userId) {
            throw new ForbiddenException('You can only delete your own projects');
        }
        await this.projectModel.findByIdAndDelete(id).exec();
        return true;
    }
    async toggleLike(id, userId) {
        const project = await this.projectModel.findById(id).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        const likes = project.likes;
        const likedIndex = likes.findIndex((uid) => uid.toString() === userId);
        if (likedIndex === -1) {
            likes.push(userId);
        }
        else {
            likes.splice(likedIndex, 1);
        }
        project.likes = likes;
        return project.save();
    }
    async addComment(projectId, userId, userName, text) {
        const project = await this.projectModel.findById(projectId).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        const comment = { user: userId, userName, text, createdAt: new Date() };
        project.comments.push(comment);
        return project.save();
    }
    async deleteComment(projectId, commentId, userId) {
        const project = await this.projectModel.findById(projectId).exec();
        if (!project)
            throw new NotFoundException('Project not found');
        const comments = project.comments;
        const commentIndex = comments.findIndex((c) => c._id.toString() === commentId);
        if (commentIndex === -1)
            throw new NotFoundException('Comment not found');
        const comment = comments[commentIndex];
        if (comment.user?.toString() !== userId) {
            throw new ForbiddenException('You can only delete your own comments');
        }
        comments.splice(commentIndex, 1);
        project.comments = comments;
        return project.save();
    }
};
ProjectsService = __decorate([
    Injectable(),
    __param(0, InjectModel(Project.name)),
    __metadata("design:paramtypes", [Model])
], ProjectsService);
export { ProjectsService };
//# sourceMappingURL=projects.service.js.map