import { Text, Avatar, Card, Flex, Title } from "@mantine/core";
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
                    key={`${user?.firstName} ${user?.lastName}`}
                    name={`${user?.firstName} ${user?.lastName}`}
                    color="initials"
                />
                <Flex ta={{ base: "center", md: "left" }} direction="column">
                    <Title size="xl">{`${user?.firstName} ${user?.lastName}`}</Title>
                    <Text>{user?.email}</Text>
                </Flex>
            </Flex>
        </Card>
    );
};

export default UserCard;
