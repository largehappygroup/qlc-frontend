import { Button, Checkbox, Flex, Popover, Space, Text } from "@mantine/core";
import { IconFilter } from "@tabler/icons-react";

const Filter: React.FC = () => {
    return (
        <>
            <Popover width={200} position="bottom" withArrow shadow="md">
                <Popover.Target>
                    <Button size="xs" leftSection={<IconFilter size={20} />}>
                        Filter
                    </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    <Flex direction="column" gap="xs">
                        <Flex align="center" gap="xs">
                            <Checkbox />
                            <Text size="sm">Test</Text>
                        </Flex>
                    </Flex>
                    <Space h="xs" />
                    <Button fullWidth size="compact-xs">
                        Apply
                    </Button>
                </Popover.Dropdown>
            </Popover>
        </>
    );
};

export default Filter;
