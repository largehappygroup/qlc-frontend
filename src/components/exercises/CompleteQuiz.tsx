import { Flex, Title, Alert, Button, Text} from "@mantine/core";
import React from "react";

interface CompleteQuizProps {
    endQuiz: () => void;

}

const CompleteQuiz: React.FC<CompleteQuizProps> = ({ endQuiz }) => {
    return (
        <Flex
            gap="lg"
            direction="column"
            w="100%"
            h="100%"
            align="center"
            ta="center"
        >
            <Title order={1}>
                Congratulations on completing the exercise!
            </Title>
           
          
            <Button onClick={endQuiz}>Exit</Button>
        </Flex>
    );
};

export default CompleteQuiz;
