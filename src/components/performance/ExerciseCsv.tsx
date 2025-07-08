import {
    TextInput,
    Checkbox,
    Group,
    Button,
    MultiSelect,
    Radio,
    Flex,
    Alert,
    Text,
    Container,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";

const ExerciseCsv: React.FC = () => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            fields: [
                "_id",
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

    const handleDownload = async () => {
        try {
            const response = await axios.get(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/exercises/download?fields=${form
                    .getValues()
                    .fields.join(",")}`,
                {
                    responseType: "blob",
                }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "exercises.csv"); // Set filename
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Download error:", error);
        }
    };

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
                        { value: "_id", label: "Database ID" },
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
                        onClick={handleDownload}
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
