export interface Question {
    _id: string,
    query: string,
    type: string,
    topics: string[],
    difficulty: number,
    explanation: string;
}