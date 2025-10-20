export interface Assignment {
    uuid: string;
    chapterId?: string;
    title: string;
    identifier: string;
    instructions: string;
    startDate: Date;
    dueDate: Date;
}
