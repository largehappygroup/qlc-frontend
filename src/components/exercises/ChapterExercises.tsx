import React, { useEffect, useState } from "react";
import { Chapter } from "../../types/Chapter";
import axios from "axios";
import { ChapterAssignment } from "../../types/ChapterAssignment";

interface ChapterExercisesProps {
    chapterID: string;
}

const ChapterExercises: React.FC<ChapterExercisesProps> = ({
    chapterID,
}: ChapterExercisesProps) => {
    const [chapterAssignments, setChapterAssignments] =
        useState<ChapterAssignment>();

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get<ChapterAssignment>(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/assignments?chapter=${chapterID}`
            );
            setChapterAssignments(response.data);
        };

        fetchData();
    }, [chapterID]);

    return <></>;
};

export default ChapterExercises;
