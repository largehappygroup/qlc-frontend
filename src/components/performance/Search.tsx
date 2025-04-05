import { ActionIcon, Flex, Group, TextInput } from "@mantine/core";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import React from "react";

const Search: React.FC = () => {
    return (
        <TextInput
            size="xs"
            placeholder="e.g. John Doe"
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
                <ActionIcon radius="xl" variant="transparent">
                    <IconArrowRight size={18} stroke={1.5} />
                </ActionIcon>
            }
        />
    );
};

export default Search;
