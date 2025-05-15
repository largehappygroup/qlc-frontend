import {
    Alert,
    Avatar,
    Button,
    Card,
    Flex,
    Grid,
    Space,
    Text,
    TextInput,
    Title,
} from "@mantine/core";
import Layout from "../Layout";
import { useAuth } from "../../hooks/AuthContext";

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <Grid gutter="md">
            <Grid.Col>
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
                        <Flex
                            ta={{ base: "center", md: "left" }}
                            direction="column"
                        >
                            <Title size="xl">{`${user?.firstName} ${user?.lastName}`}</Title>
                            <Text>{user?.email}</Text>
                        </Flex>
                    </Flex>
                </Card>
            </Grid.Col>
            <Grid.Col>
                <Card withBorder shadow="sm">
                    <Alert>
                        If you wish to change the listed first name and last
                        name, please contact VUIT to change these details for
                        your VUNETID account.
                    </Alert>
                    <Space h="md" />
                    <Flex justify="space-between" gap="sm">
                        <TextInput flex="1" label="First Name" disabled />
                        <TextInput flex="1" label="Last Name" disabled />
                        <TextInput flex="1" label="Preferred Name" />
                    </Flex>
                    <Space h="md" />
                    <Flex justify="end">
                        <Button>Save</Button>
                    </Flex>
                </Card>
            </Grid.Col>
        </Grid>
    );
};

export default Profile;
