import { IconChevronRight } from "@tabler/icons-react";
import { Group, Text, UnstyledButton } from "@mantine/core";
import classes from "./UserButton.module.css";
import { useAuth } from "../../hooks/AuthContext";

export function UserButton() {
    const { user } = useAuth();
    return (
        <UnstyledButton<"a">
            component="a"
            href="/profile"
            className={classes.user}
        >
            <Group>
                <div style={{ flex: 1 }}>
                    <Text size="sm" fw={500}>
                        {`${user?.firstName} ${user?.lastName}`}
                    </Text>

                    <Text c="dimmed" size="xs">
                        {user?.email}
                    </Text>
                </div>

                <IconChevronRight size={14} stroke={1.5} />
            </Group>
        </UnstyledButton>
    );
}
