import { Group, Button, MultiSelect, Flex } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDownload } from "@tabler/icons-react";
import { handleDownload } from "../../api/exercises";

interface ExerciseCsvProps {
    closeModal?: () => void;
}

const ExerciseCsv: React.FC<ExerciseCsvProps> = ({
    closeModal,
}: ExerciseCsvProps) => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            fields: [
                "uuid",
                "userId",
                "authorId",
                "assignmentId",
                "totalCorrect",
                "totalTimeSpent",
            ],
        },

        validate: {
            fields: (value) =>
                value.length == 0
                    ? "At least one field must be selected."
                    : null,
        },
    });

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Flex direction="column" gap="xs">
                <MultiSelect
                    label="Select Fields"
                    placeholder="Add field"
                    data={[
                        { value: "userId", label: "Student Database ID" },
                        { value: "authorId", label: "Author Database ID" },
                        {
                            value: "assignmentId",
                            label: "Assignment Database ID",
                        },
                        { value: "questions", label: "Questions" },
                        { value: "uuid", label: "Database ID" },
                        { value: "status", label: "Status" },
                        {
                            value: "completedTimestamp",
                            label: "Completed Timestamp",
                        },
                        {
                            value: "completedQuestions",
                            label: "Completed Questions",
                        },
                        { value: "totalTimeSpent", label: "Total Time Spent" },
                        { value: "totalCorrect", label: "Total Correct" },
                    ]}
                    required
                    searchable
                    nothingFoundMessage="Nothing found..."
                    key={form.key("fields")}
                    {...form.getInputProps("fields", { type: "input" })}
                />

                <Group justify="flex-end" mt="md">
                    <Button
                        type="submit"
                        onClick={() => {
                            handleDownload(form.getValues().fields.join(","));
                            if (closeModal) closeModal();
                        }}
                        rightSection={<IconDownload />}
                    >
                        Download
                    </Button>
                </Group>
            </Flex>
        </form>
    );
};

export default ExerciseCsv;
