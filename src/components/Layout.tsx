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
    Skeleton,
    Space,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import {
    IconHome,
    IconHome2,
    IconLogout,
    IconStar,
    IconTrendingUp,
    IconUser,
} from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/AuthContext";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const navigate = useNavigate();
    const location = useLocation();

    const { user } = useAuth();

    const pages = [
        {
            label: "Dashboard",
            path: "/",
            icon: <IconHome2 size={16} stroke={1.5} />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <IconUser size={16} stroke={1.5} />,
        },
        {
            label: "Skills",
            path: "/skills",
            icon: <IconTrendingUp size={16} stroke={1.5} />,
        },
        {
            label: "Performance",
            path: "/performance",
            icon: <IconStar size={16} stroke={1.5} />,
        },
    ];

    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            navbar={{
                width: 200,
                breakpoint: "sm",
                collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
            }}
            padding="md"
        >
            <AppShell.Header>
                <Group h="100%" px="md" justify="space-between">
                    <Group h="100%">
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
                    </Group>
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

                {pages.map((page) => (
                    <NavLink
                        onClick={() => navigate(page.path)}
                        variant="filled"
                        color="cyan.5"
                        label={page.label}
                        leftSection={page.icon}
                        active={location.pathname === page.path}
                        className="navbar-navlink"
                    />
                ))}
            </AppShell.Navbar>
            <AppShell.Main>
                <Container>{children}</Container>
            </AppShell.Main>
        </AppShell>
    );
};

export default Layout;
