import {
    Card,
    Textarea,
    TextInput,
    Text,
    Title,
    Space,
    Flex,
    Checkbox,
    Input,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Chapter } from "../../types/Chapter";
import { Assignment } from "../../types/Assignment";

interface GeneralInfoProps {
    form: UseFormReturnType<
        Partial<Chapter> & { assignments: Partial<Assignment>[] }
    >;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
    form,
}: GeneralInfoProps) => {
    return (
        <Card withBorder shadow="sm">
            <Title order={2} pb="xs">
                General Information
            </Title>
            <Text c="dimmed">Basic details about the chapter module</Text>
            <Space h="md" />

            <Flex justify="space-between" gap="md">
                <TextInput
                    flex="1"
                    withAsterisk
                    label="Chapter Title"
                    placeholder="e.g. Introduction to Methods"
                    key={form.key("title")}
                    {...form.getInputProps("title")}
                />
                <Flex direction="column" gap="md" align="center">
                    <Input.Label>Released</Input.Label>
                    <Checkbox
                        key={form.key("released")}
                        {...form.getInputProps("released", {
                            type: "checkbox",
                        })}
                    />
                </Flex>

                <Flex direction="column" gap="md" align="center">
                    <Input.Label>Request Feedback</Input.Label>
                    <Checkbox
                        key={form.key("requestFeedback")}
                        {...form.getInputProps("requestFeedback", {
                            type: "checkbox",
                        })}
                    />
                </Flex>
            </Flex>

            <Space h="md" />
            <Textarea
                withAsterisk
                rows={6}
                label="Description"
                key={form.key("description")}
                {...form.getInputProps("description")}
            />
        </Card>
    );
};

export default GeneralInfo;
