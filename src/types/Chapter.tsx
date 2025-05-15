export interface Chapter {
    _id?: string;
    order?: number;
    assignmentIds?: string[];
    learningObjectives: string[];
    title: string;
    description: string;
    releaseDate: Date;
}
