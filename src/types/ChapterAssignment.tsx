export interface ChapterAssignment {
    _id?: string;
    chapterId?: string;
    title: string;
    identifier: string;
    instructions: string;
    startDate: Date;
    dueDate: Date;
}
