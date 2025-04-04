import { ActionIcon, Flex, TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import React from "react";

const Search: React.FC = () => {
    return (
        <Flex gap="xs">
            <TextInput size="xs" placeholder="e.g. John Doe" />
            <ActionIcon size="md">
                <IconSearch size={20} />
            </ActionIcon>
        </Flex>
    );
};

export default Search;
