export interface Assignment {
    uuid?: string;
    chapterId?: string;
    title: string;
    identifier: string;
    instructions: string;
    startDate: Date;
    dueDate: Date;
}

export interface WithAssignment {
    assignment?: Assignment;
}

export interface WithAssignmentId {
    assignmentId?: string;
}

export const assignmentIdentifiers = [
    "PA01-W",
    "PA01-C",
    "PA01-A",
    "PA01-B",
    "PA02-W1",
    "PA02-W2",
    "PA02-B",
    "PA02-A",
    "PA03-A",
    "PA03-B",
    "PA03-W",
    "PA04-W1",
    "PA04-B",
    "PA04-A",
    "PA04-W2",
    "PA05-A",
    "PA05-B",
    "PA05-W",
    "PA06-A",
    "PA06-B",
    "PA06-W",
    "PA07-A",
    "PA07-B",
    "PA07-W",
    "PA08-A",
    "PA08-B",
    "PA09-A",
    "PA09-B",
    "PA10-A",
    "PA10-B",
    "PA11-A",
    "PA11-B",
];
