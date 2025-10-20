import { ActionIcon, TextInput } from "@mantine/core";
import { IconArrowRight, IconSearch, IconX } from "@tabler/icons-react";
import React, {  useState } from "react";

interface SearchProps {
    items: { field: string; details: any }[];
    setItems: (items: any[]) => void;
    retrieveItems?: () => void;
}

const Search: React.FC<SearchProps> = ({
    items,
    setItems,
    retrieveItems,
}: SearchProps) => {
    const [query, setQuery] = useState<string>("");
    const [filtered, setFiltered] = useState<boolean>(false);
    const setFilter = () => {
        if (query.length > 0) {
            const newItems = items
                .filter((item) =>
                    item.field.toLowerCase().includes(query.toLowerCase())
                )
                .map((item) => item.details);
            setItems(newItems);
            setFiltered(true);
        }
    };

    const undoFilter = () => {
        if (retrieveItems) {
            retrieveItems();
        }
        setQuery("");
        setFiltered(false);
    };

    return (
        <TextInput
            disabled={filtered}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            size="xs"
            placeholder="e.g. John Doe"
            leftSection={<IconSearch size={18} stroke={1.5} />}
            rightSection={
                filtered ? (
                    <ActionIcon
                        onClick={undoFilter}
                        radius="xl"
                        variant="transparent"
                    >
                        <IconX size={18} stroke={1.5} />
                    </ActionIcon>
                ) : (
                    <ActionIcon
                        onClick={setFilter}
                        radius="xl"
                        variant="transparent"
                    >
                        <IconArrowRight size={18} stroke={1.5} />
                    </ActionIcon>
                )
            }
        />
    );
};

export default Search;
