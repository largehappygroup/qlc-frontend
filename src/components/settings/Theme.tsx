import {
    Button,
    Flex,
    Space,
    Title,
    useMantineColorScheme,
} from "@mantine/core";
import { IconMoon, IconSun, IconSunMoon } from "@tabler/icons-react";

const Theme: React.FC = () => {
    const { setColorScheme } = useMantineColorScheme();

    return (
        <>
            <Title order={1} size="md">
                Mode
            </Title>
            <Space h="md" />
            <Flex justify="space-between" gap="sm">
                <Button
                    leftSection={<IconSun size={20} stroke={2} />}
                    flex="1"
                    variant="default"
                    onClick={() => setColorScheme("light")}
                >
                    Light
                </Button>
                <Button
                    leftSection={<IconMoon size={20} stroke={2} />}
                    flex="1"
                    variant="default"
                    onClick={() => setColorScheme("dark")}
                >
                    Dark
                </Button>
                <Button
                    leftSection={<IconSunMoon size={20} stroke={2} />}
                    flex="1"
                    variant="default"
                    onClick={() => setColorScheme("auto")}
                >
                    System
                </Button>
            </Flex>
        </>
    );
};

export default Theme;
