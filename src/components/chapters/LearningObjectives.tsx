import { UseFormReturnType } from "@mantine/form";
import { Chapter } from "../../types/Chapter";
import {
    ActionIcon,
    Button,
    Card,
    Flex,
    Space,
    Text,
    Textarea,
    Title,
} from "@mantine/core";
import { IconPlus, IconTrash } from "@tabler/icons-react";

interface LearningObjectivesProps {
    form: UseFormReturnType<Chapter>;
    handleUpdateObjective: (index: number, value: string) => void;
    handleDeleteObjective: (index: number) => void;
    handleAddObjective: () => void;
}

const LearningObjectives: React.FC<LearningObjectivesProps> = ({
    form,
    handleUpdateObjective,
    handleDeleteObjective,
    handleAddObjective,
}: LearningObjectivesProps) => {
    return (
        <Card withBorder shadow="sm">
            <Title order={2} pb="xs">
                Learning Objectives
            </Title>
            <Text c="dimmed">
                Define what students will learn from this chapter
            </Text>
            <Space h="md" />
            <Flex direction="column" gap="md">
               
                {form.errors.learningObjectives && (
                    <Text c="red" ta="center" size="sm">
                        {form.errors.learningObjectives}
                    </Text>
                )}
                {form.values.learningObjectives.map((objective, index) => (
                    <Flex gap="lg" align="center">
                        <Textarea
                            w="100%"
                            label={`Objective ${index + 1}`}
                            rows={2}
                            value={objective}
                            onChange={(e) =>
                                handleUpdateObjective(index, e.target.value)
                            }
                        />
                        <ActionIcon
                            color="red"
                            variant="subtle"
                            onClick={() => handleDeleteObjective(index)}
                        >
                            <IconTrash stroke={1.5} size={20} />
                        </ActionIcon>
                    </Flex>
                ))}
                <Flex justify="center">
                    <Button
                        variant="default"
                        onClick={handleAddObjective}
                        leftSection={<IconPlus size={20} stroke={1.5} />}
                    >
                        Add a new learning objective
                    </Button>
                </Flex>
            </Flex>
        </Card>
    );
};

export default LearningObjectives;
