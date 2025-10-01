import {
    AppShell,
    Avatar,
    Burger,
    Button,
    Container,
    Flex,
    Group,
    Space,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAuth } from "../hooks/AuthContext";
import { NavbarNested } from "./navbar/NavbarNested";
import Quiz from "./exercises/Quiz";
import Feedback from "./exercises/Feedback";

interface LayoutProps {
    children?: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const { user } = useAuth();

    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 250,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group h="100%" gap="lg">
                        <Burger
                            opened={mobileOpened}
                            onClick={toggleMobile}
                            hiddenFrom="sm"
                            size="sm"
                        />
                        <Burger
                            opened={desktopOpened}
                            onClick={toggleDesktop}
                            visibleFrom="sm"
                            size="sm"
                        />
                        {title && <Text size="lg">{title}</Text>}
                    </Group>
                    <Group gap="sm">
                        {user && (
                            <Avatar
                                size={40}
                                key={`${user.firstName} ${user.lastName}`}
                                name={`${user.firstName} ${user.lastName}`}
                                color="initials"
                            />
                        )}
                    </Group>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Flex direction="column" px="md" align="end">
                    <Burger
                        opened={mobileOpened}
                        onClick={toggleMobile}
                        hiddenFrom="sm"
                        size="sm"
                    />
                    <Space h="md" hiddenFrom="sm" />
                </Flex>
                <NavbarNested />
            </AppShell.Navbar>
            <AppShell.Main>
                <Container>{user ? children : null}</Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
