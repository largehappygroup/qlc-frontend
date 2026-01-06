import { Flex, Title, Text, Button, Alert, Loader } from "@mantine/core";
import { WithExercise } from "../../types/Exercise";
import { useAssignment } from "../../hooks/assignments";

interface StartQuizProps extends WithExercise {
    startQuiz: () => void;
}

const StartQuiz: React.FC<StartQuizProps> = ({ startQuiz, exercise }) => {
    const { data: assignment, isLoading } = useAssignment(
        exercise?.assignmentId
    );

    return isLoading ? (
        <Flex
            gap="lg"
            direction="column"
            w="100%"
            h="100%"
            align="center"
            ta="center"
        >
            <Loader type="oval" size="xl" />
        </Flex>
    ) : (
        <Flex
            gap="lg"
            direction="column"
            w="100%"
            h="100%"
            align="center"
            ta="center"
        >
            <Title order={1}>
                {`${assignment?.identifier}: ${assignment?.title}`}
            </Title>
            {assignment?.dueDate &&
            new Date(assignment.dueDate) < new Date() ? (
                <Alert color="red">
                    This exercise was due on{" "}
                    {new Date(assignment.dueDate).toLocaleDateString()}. Though
                    you can finish this exercise as a way to review the
                    material, we cannot accept past due exercises towards the
                    extra credit opportunity.
                </Alert>
            ) : (
                <Text>
                    You have unlimited time to answer each question in this
                    exercise. Your answers will be saved after each question,
                    and you can leave and come back to complete the exercise.
                    However, keep in mind that the due date for this exercise is{" "}
                    <Text component="span" fw="bolder">
                        {assignment?.dueDate &&
                            new Date(assignment.dueDate).toLocaleDateString()}
                    </Text>
                    .
                </Text>
            )}
            <Text c="dimmed">
                {`Questions Completed: ${exercise?.completedQuestions}/${exercise?.questions.length}`}
            </Text>
            <Button onClick={startQuiz}>Begin!</Button>
        </Flex>
    );
};

export default StartQuiz;
