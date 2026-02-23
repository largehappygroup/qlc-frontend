import { Flex, Title, Button, Text } from "@mantine/core";
import { WithExercise } from "../../types/Exercise";
import { useEditExerciseById } from "../../hooks/useExercises";
import Summary from "./Summary";

interface CompleteQuizProps extends WithExercise {
    onEnd: () => void;
}

const CompleteQuiz: React.FC<CompleteQuizProps> = ({ onEnd, exercise }) => {
    const { mutateAsync: editExerciseById } = useEditExerciseById();
    const handleEnd = async () => {
        if (
            exercise &&
            exercise?.completedQuestions === exercise?.questions.length
        ) {
            await editExerciseById({
                exerciseId: exercise.uuid,
                updatedExercise: {
                    status: "Complete",
                    completedTimestamp: new Date(),
                },
            });
        }
        onEnd();
    };

    return (
        <Flex
            gap="lg"
            direction="column"
            w="100%"
            h="100%"
            align="center"
            ta="center"
        >
            <Title order={1}>Congratulations!</Title>
            <Summary exercise={exercise} />
            <Text fw={700}>
                You MUST click the button below to mark this exercise as
                entirely complete. If you don't, you will not be able to count
                this exercise towards your extra credit.
            </Text>
            <Button onClick={handleEnd}>Mark Complete and Exit</Button>
        </Flex>
    );
};

export default CompleteQuiz;
