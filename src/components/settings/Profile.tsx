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
                        name, please contact{" "}
                        <a href="mailto:helen.wu@vanderbilt.edu">
                            helen.wu@vanderbilt.edu
                        </a>
                        .
                    </Alert>
                </Card>
            </Grid.Col>
        </Grid>
    );
};

export default Profile;
