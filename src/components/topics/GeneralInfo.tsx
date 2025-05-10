import {
    Card,
    Container,
    Textarea,
    TextInput,
    Text,
    Title,
    Space,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Chapter } from "../../types/Chapter";

interface GeneralInfoProps {
    form: UseFormReturnType<Chapter>;
}

const GeneralInfo: React.FC<GeneralInfoProps> = ({
    form,
}: GeneralInfoProps) => {
    return (
        <Card withBorder>
            <Title order={2} pb="xs">
                General Information
            </Title>
            <Text c="dimmed">Basic details about the chapter module</Text>
            <Space h="md" />
            <TextInput
                withAsterisk
                label="Chapter Title"
                placeholder="e.g. Introduction to Methods"
                key={form.key("title")}
                {...form.getInputProps("title")}
            />
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
