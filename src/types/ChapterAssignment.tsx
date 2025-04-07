export interface ChapterAssignment {
    _id?: string;
    chapter?: string;
    title: string;
    identifier: string;
    instructions: string;
    initialDueDate: Date;
}
