import {
    ActionIcon,
    Button,
    Flex,
    Modal,
    Switch,
    TextInput,
    Tooltip,
    Text,
    Grid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { PropsWithUser, User } from "../../hooks/AuthContext";
import { IconEdit, IconPencil } from "@tabler/icons-react";
import AverageScoreCard from "../dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../dashboard/AverageTimeSpentCard";
import ScoreDistributionCard from "../dashboard/ScoreDistributionCard";
import RecentActivityCard from "../dashboard/RecentActivityCard";


const EdituserModal: React.FC<PropsWithUser> = ({
    user,
}: PropsWithUser) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal
                fullScreen
                opened={opened}
                onClose={close}
                title={`Edit Details for ${user?.firstName} ${user?.lastName}`}
            >
                <Flex justify="end">
                    <Button>Download</Button>
                </Flex>
                <Flex justify="space-between" gap="lg">
                    
                    <TextInput
                        flex="1"
                        label="First Name"
                        value={user?.firstName}
                    />
                    <TextInput
                        flex="1"
                        label="Last Name"
                        value={user?.lastName}
                    />
                    <TextInput flex="1" label="Email" value={user?.email} />
                </Flex>

                <Text>{`${user?.termSeason} ${user?.termYear}`}</Text>

                {user?.studyParticipation && (
                    <Switch
                        label="Consented to participated in the study?"
                        checked={user.studyParticipation}
                    />
                )}

                {user?.studyGroup && <Text>{user.studyGroup}</Text>}
                <Grid>
                    <Grid.Col span={6}>
                        <AverageScoreCard userId={user?._id} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <AverageTimeSpentCard userId={user?._id} />
                    </Grid.Col>
                    <Grid.Col>
                        <ScoreDistributionCard userId={user?._id} />
                    </Grid.Col>
                    <Grid.Col>
                        <RecentActivityCard userId={user?._id} />
                    </Grid.Col>
                </Grid>
            </Modal>
            <ActionIcon variant="subtle" color="gray" onClick={open}>
                <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
        </>
    );
};

export default EdituserModal;
