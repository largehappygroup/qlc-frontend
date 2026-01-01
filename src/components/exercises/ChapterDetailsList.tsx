import { Flex, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";
import FeedbackCard from "./FeedbackCard";
import { WithChapter } from "../../types/Chapter";
import { useAssignments } from "../../hooks/assignments";

interface ChapterDetailsListProps extends WithChapter {
    date?: Date;
}

const ChapterDetailsList: React.FC<ChapterDetailsListProps> = ({
    chapter,
    date,
}: ChapterDetailsListProps) => {
    const {data: chapterAssignments, isLoading} = useAssignments(chapter?.uuid, date);

    const items = chapterAssignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment} />
    ));

    return (
        <Flex direction="column" gap="xs" pt="sm">
            {isLoading ? (
                <Text>Loading...</Text>
            ) : !items || items?.length === 0 ? (
                <Text>No exercises found.</Text>
            ) : (
                chapter?.requestFeedback && (
                    <FeedbackCard chapterId={chapter?.uuid} />
                )
            )}
            {items}
        </Flex>
    );
};

export default ChapterDetailsList;
