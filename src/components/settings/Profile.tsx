import { Alert, Grid } from "@mantine/core";
import { useAuth } from "../../hooks/AuthContext";
import UserCard from "./UserCard";

const Profile: React.FC = () => {
    const { user } = useAuth();

    return (
        <Grid gutter="md">
            <Grid.Col>
                <Alert>
                    If you wish to change the listed first name and last name,
                    please contact{" "}
                    <a href="mailto:helen.wu@vanderbilt.edu">
                        helen.wu@vanderbilt.edu
                    </a>
                    .
                </Alert>
            </Grid.Col>
            <Grid.Col>
                <UserCard user={user} />
            </Grid.Col>
        </Grid>
    );
};

export default Profile;
