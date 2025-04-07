export interface NewChapter {
    order?: number;
    assignments?: string[];
    learningObjectives: string[];
    title: string;
}

export interface Chapter {
    _id: string;
    order: number;
    assignments?: string[];
    learningObjectives: string[];
    title: string;
}
