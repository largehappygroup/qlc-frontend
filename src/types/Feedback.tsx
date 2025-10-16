export interface Feedback {
    _id: string;
    chapterId: string;
    userId: string;
    date: Date;
    easeOfUnderstanding: number;
    reasonableQuestions: number;
    helpsUnderstandCode: number;
    helpsUnderstandJava: number;
    comments?: string;
}