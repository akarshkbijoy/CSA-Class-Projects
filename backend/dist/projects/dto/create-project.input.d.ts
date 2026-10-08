export declare class ContributorInput {
    name: string;
    role?: string;
}
export declare class CreateProjectInput {
    title: string;
    description: string;
    impact?: string;
    studentName: string;
    teamName?: string;
    coverImage?: string;
    screenshots?: string[];
    category?: string;
    techStack?: string[];
    contributors?: ContributorInput[];
    demoUrl?: string;
    youtubeUrl?: string;
    githubUrl?: string;
}
