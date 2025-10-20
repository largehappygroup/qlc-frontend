export interface Feedback {
    uuid: string;
    chapterId: string;
    userId: string;
    date: Date;
    easeOfUnderstanding: number;
    reasonableQuestions: number;
    helpsUnderstandCode: number;
    helpsUnderstandJava: number;
    comments?: string;
}