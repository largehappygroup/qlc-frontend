import {
    AppShell,
    Avatar,
    Burger,
    Container,
    Flex,
    Group,
    Select,
    Space,
    Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

import { useAuth } from "../hooks/AuthContext";
import { NavbarNested } from "./navbar/NavbarNested";

interface LayoutProps {
    children?: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

    const { user, login } = useAuth();

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
                        <Select
                            value={user?._id}
                            data={[
                                {
                                    value: "665abcde1234567890abc001",
                                    label: "Student (John)",
                                },
                                {
                                    value: "665abcde1234567890abc002",
                                    label: "Student (Alice)",
                                },
                                {
                                    value: "665abcde1234567890abc005",
                                    label: "Admin",
                                },
                            ]}
                            onChange={(value) => login(value ? value : "")}
                        />
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
