import {
    AppShell,
    Avatar,
    Burger,
    Button,
    Container,
    Flex,
    Group,
    NavLink,
    Popover,
    Select,
    Skeleton,
    Space,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconLogout, IconUser } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";
import { NavbarNested } from "./navbar/NavbarNested";

interface LayoutProps {
    children?: React.ReactNode;
    title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, title }: LayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const navigate = useNavigate();
    const location = useLocation();

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
                        <Popover
                            width={200}
                            position="bottom-end"
                            offset={{ mainAxis: 12, crossAxis: 0 }}
                        >
                            <Popover.Target>
                                <UnstyledButton>
                                    <Avatar
                                        size={40}
                                        key={`${user?.firstName} ${user?.lastName}`}
                                        name={`${user?.firstName} ${user?.lastName}`}
                                        color="initials"
                                    />
                                </UnstyledButton>
                            </Popover.Target>
                            <Popover.Dropdown>
                                <NavLink
                                    label="Profile"
                                    onClick={() => navigate("/profile")}
                                    leftSection={
                                        <IconUser size={16} stroke={1.5} />
                                    }
                                />
                                <NavLink
                                    label="Log out"
                                    c="red"
                                    onClick={() => navigate("/login")}
                                    leftSection={
                                        <IconLogout size={16} stroke={1.5} />
                                    }
                                />
                            </Popover.Dropdown>
                        </Popover>
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
                <Container>{children}</Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
