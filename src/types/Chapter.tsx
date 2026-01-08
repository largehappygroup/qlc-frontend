export interface Chapter {
    uuid?: string;
    order?: number;
    learningObjectives: string[];
    title: string;
    description: string;
    releaseDate: Date;
    requestFeedback: boolean;
}

export interface WithChapter {
    chapter?: Chapter;
}

export interface WithChapterId {
    chapterId?: string;
}