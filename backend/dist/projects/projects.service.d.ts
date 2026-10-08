import { Model } from 'mongoose';
import { Project, ProjectDocument } from './project.schema.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';
export declare class ProjectsService {
    private projectModel;
    constructor(projectModel: Model<ProjectDocument>);
    findAll(category?: string, search?: string): Promise<Project[]>;
    findById(id: string): Promise<Project>;
    findByUser(userId: string): Promise<Project[]>;
    create(createProjectInput: CreateProjectInput, userId: string): Promise<Project>;
    update(updateProjectInput: UpdateProjectInput, userId: string): Promise<Project>;
    delete(id: string, userId: string): Promise<boolean>;
    toggleLike(id: string, userId: string): Promise<Project>;
    addComment(projectId: string, userId: string, userName: string, text: string): Promise<Project>;
    deleteComment(projectId: string, commentId: string, userId: string): Promise<Project>;
}
