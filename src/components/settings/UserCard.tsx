import {
    Text,
    Avatar,
    Card,
    Flex,
    Title,
    Skeleton,
    Loader,
} from "@mantine/core";
import { PropsWithUser } from "../../hooks/AuthContext";

const UserCard: React.FC<PropsWithUser> = ({ user }) => {
    return (
        <Card withBorder shadow="sm">
            <Flex
                gap="lg"
                align="center"
                direction={{ base: "column", md: "row" }}
            >
                <Avatar
                    size="xl"
                    key={user ? `${user?.firstName} ${user?.lastName}` : null}
                    name={
                        user
                            ? `${user?.firstName} ${user?.lastName}`
                            : undefined
                    }
                    color="initials"
                />

                <Flex
                    flex="1"
                    ta={{ base: "center", md: "left" }}
                    direction="column"
                    h="100%"
                >
                    <Skeleton visible={user ? false : true}>
                        <Title size="xl">{`${user?.firstName} ${user?.lastName}`}</Title>
                        <Text>{user?.email}</Text>
                    </Skeleton>
                </Flex>
            </Flex>
        </Card>
    );
};

export default UserCard;
