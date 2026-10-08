import { ProjectsService } from './projects.service.js';
import { Project } from './project.schema.js';
import { CreateProjectInput } from './dto/create-project.input.js';
import { UpdateProjectInput } from './dto/update-project.input.js';
import { User } from '../users/user.schema.js';
export declare class ProjectsResolver {
    private projectsService;
    constructor(projectsService: ProjectsService);
    getProjects(category?: string, search?: string): Promise<Project[]>;
    getProjectById(id: string): Promise<Project>;
    getMyProjects(user: User): Promise<Project[]>;
    createProject(createProjectInput: CreateProjectInput, user: User): Promise<Project>;
    updateProject(updateProjectInput: UpdateProjectInput, user: User): Promise<Project>;
    deleteProject(id: string, user: User): Promise<boolean>;
    toggleLike(projectId: string, user: User): Promise<Project>;
    addComment(projectId: string, text: string, user: User): Promise<Project>;
    deleteComment(projectId: string, commentId: string, user: User): Promise<Project>;
}
