export interface Chapter {
    order: number;
    assignments?: string[];
    learningObjectives: string[];
    title: string;
}

export interface ChapterWithID {
    _id: string;
    order: number;
    assignments?: string[];
    learningObjectives: string[];
    title: string;
}
