import { Flex, Loader, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";
import FeedbackCard from "./FeedbackCard";
import { WithChapter } from "../../types/Chapter";
import { useAllAssignments } from "../../hooks/useAssignments";



const ChapterDetailsList: React.FC<WithChapter> = ({
    chapter,
}: WithChapter) => {
    const { data: chapterAssignments, isLoading } = useAllAssignments(
        chapter?.uuid,
    );

    const items = chapterAssignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment} />
    ));

    return (
        <Flex direction="column" gap="xs" pt="sm">
            {isLoading ? (
                <Loader type="dots" size="xl" />
            ) : !items || items?.length === 0 ? (
                <Text style={{marginBottom: "10px"}}>No exercises found.</Text>
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
