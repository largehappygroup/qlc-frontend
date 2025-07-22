import { Group, Button, MultiSelect, Flex, Alert, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { IconDownload } from "@tabler/icons-react";
import axios from "axios";

interface UserCsvProps {
    student: boolean;
}

const UserCsv: React.FC<UserCsvProps> = ({ student }: UserCsvProps) => {
    const form = useForm({
        mode: "uncontrolled",
        initialValues: {
            fields: ["firstName", "lastName", "_id", "vuNetId"],
            termSeason: "",
            termYear: "",
            studyParticipation: "",
            studyGroup: "",
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
                `${import.meta.env.VITE_BACKEND_URL}/users/download${
                    student ? "?role=student&" : "?"
                }fields=${form.getValues().fields.join(",")}`,
                { responseType: "blob" }
            );

            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "users.csv");
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error("Download error:", error);
        }
    };

    return (
        <form onSubmit={form.onSubmit((values) => console.log(values))}>
            <Alert>
                <Text>
                    <Text span inherit fw={700}>
                        Note:{" "}
                    </Text>
                    If you are downloading the .csv to edit and reupload, you
                    MUST have the "Database ID" field selected along with the
                    fields you wish to edit.
                </Text>
            </Alert>
            <Flex direction="column" gap="xs" py="xl">
                <MultiSelect
                    label="Select Fields"
                    placeholder="Add field"
                    data={[
                        { value: "firstName", label: "First Name" },
                        { value: "lastName", label: "Last Name" },
                        { value: "vuNetId", label: "VUNetID" },
                        { value: "email", label: "Email" },
                        { value: "_id", label: "Database ID" },
                        ...(student
                            ? [
                                  { value: "termSeason", label: "Term Season" },
                                  { value: "termYear", label: "Term Year" },
                                  {
                                      value: "studyParticipation",
                                      label: "Study Participation",
                                  },
                                  {
                                      value: "studyGroup",
                                      label: "Study Group (A vs. B)",
                                  },
                              ]
                            : [{ value: "role", label: "Role" }]),
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

export default UserCsv;
