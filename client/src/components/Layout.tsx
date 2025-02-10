import {
    AppShell,
    Avatar,
    Burger,
    Button,
    Container,
    Group,
    NavLink,
    Popover,
    Skeleton,
    Text,
    UnstyledButton,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconHome, IconHome2, IconUser } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";

interface LayoutProps {
    children?: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const navigate = useNavigate();
    const location = useLocation();

    const pages = [
        {
            label: "Dashboard",
            path: "/",
            icon: <IconHome2 size={16} stroke={1.5} />,
        },
        {
            label: "Quiz",
            path: "/quiz",
            icon: <IconHome size={16} stroke={1.5} />,
        },
        {
            label: "Summary",
            path: "/summary",
            icon: <IconHome size={16} stroke={1.5} />,
        },
        {
            label: "Profile",
            path: "/profile",
            icon: <IconUser size={16} stroke={1.5} />,
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
                                    key={"HW"}
                                    name={"HW"}
                                    color="initials"
                                />
                            </UnstyledButton>
                        </Popover.Target>
                        <Popover.Dropdown>
                            <NavLink
                                label="Profile"
                                onClick={() => navigate("/profile")}
                            />
                            <NavLink label="Log out" />
                        </Popover.Dropdown>
                    </Popover>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                {pages.map((page) => (
                    <NavLink
                        onClick={() => navigate(page.path)}
                        label={page.label}
                        leftSection={page.icon}
                        active={location.pathname === page.path}
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
