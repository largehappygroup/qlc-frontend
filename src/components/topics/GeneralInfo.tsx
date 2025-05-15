import {
    Card,
    Container,
    Textarea,
    TextInput,
    Text,
    Title,
    Space,
    Flex,
} from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { Chapter } from "../../types/Chapter";
import { DateInput } from "@mantine/dates";

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
            <Flex justify="space-between" gap="md">
                <TextInput
                    flex="1"
                    withAsterisk
                    label="Chapter Title"
                    placeholder="e.g. Introduction to Methods"
                    key={form.key("title")}
                    {...form.getInputProps("title")}
                />
                <Flex flex="1" gap="md">
                    <DateInput
                        withAsterisk
                        flex="1"
                        label="Release Date"
                        key={form.key("releaseDate")}
                        {...form.getInputProps("releaseDate")}
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
