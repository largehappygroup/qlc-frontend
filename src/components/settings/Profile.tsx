import {
    Alert,
    Button,
    Card,
    Flex,
    Grid,
    Space,
    TextInput,
} from "@mantine/core";
import { useAuth } from "../../hooks/AuthContext";
import UserCard from "./UserCard";

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <Grid gutter="md">
            <Grid.Col>
                <UserCard user={user} />
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
