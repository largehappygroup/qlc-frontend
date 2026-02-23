export interface Chapter {
    uuid: string;
    order?: number;
    title: string;
    description: string;
    released: boolean;
    requestFeedback: boolean;
}

export interface WithChapter {
    chapter?: Chapter;
}

export interface WithChapterId {
    chapterId?: string;
}