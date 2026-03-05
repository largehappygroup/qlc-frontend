import { Flex, Loader, Text } from "@mantine/core";
import ExerciseCard from "./ExerciseCard";
import FeedbackCard from "./FeedbackCard";
import { WithChapter } from "../../types/Chapter";
import { useAllAssignments } from "../../hooks/useAssignments";
import { useAllChapters } from "../../hooks/useChapters";

const ChapterDetailsList: React.FC<WithChapter & {dueDate?: Date}> = ({
    chapter,
    dueDate,
}: WithChapter & {dueDate?: Date}) => {
    if (chapter && !chapter?.released) {
        return <Text>No exercises available.</Text>;
    }
    const { data: chapters } = useAllChapters();
    const { data: chapterAssignments, isLoading } = useAllAssignments(
        chapter?.uuid,
        dueDate,
    );

    let assignments;

    if (!chapter) {
        // allChapters is already retrieved
        assignments = chapterAssignments?.filter((assignment) =>
            chapters?.some(
                (chap) =>
                    chap.uuid === assignment.chapterId &&
                    chap.released === true,
            ),
        );
    } else {
        assignments = chapterAssignments;
    }

    const items = assignments?.map((assignment, index) => (
        <ExerciseCard index={index} assignment={assignment} />
    ));

    // Determine if FeedbackCard should be shown
    let showFeedback = false;
    let feedbackChapterId = chapter?.uuid;
    if (chapter?.requestFeedback) {
        showFeedback = true;
    } else if (assignments && assignments.length > 0 && chapters) {
        // Check if any assignment's chapter has releaseFeedback === true
        for (const assignment of assignments) {
            const chap = chapters.find((c) => c.uuid === assignment.chapterId);
            if (chap && chap.requestFeedback === true) {
                showFeedback = true;
                feedbackChapterId = chap.uuid;
                break;
            }
        }
    }

    return (
        <Flex direction="column" gap="xs" pt="sm">
            {isLoading ? (
                <Loader type="dots" size="xl" />
            ) : !items || items?.length === 0 ? (
                <Text style={{ marginBottom: "10px" }}>
                    No exercises found.
                </Text>
            ) : (
                showFeedback && (
                    <FeedbackCard chapterId={feedbackChapterId} />
                )
            )}
            {items}
        </Flex>
    );
};

export default ChapterDetailsList;
