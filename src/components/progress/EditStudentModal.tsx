import {
    ActionIcon,
    Flex,
    Modal,
    Switch,
    Text,
    Grid,
    Space,
    Card,
    Title,
    Divider,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { WithUser } from "../../types/User";
import { IconPencil } from "@tabler/icons-react";
import AverageScoreCard from "../dashboard/AverageScoreCard";
import AverageTimeSpentCard from "../dashboard/AverageTimeSpentCard";
import ScoreDistributionCard from "../dashboard/ScoreDistributionCard";
import RecentActivityCard from "../dashboard/RecentActivityCard";
import UserCard from "../settings/UserCard";

const EditUserModal: React.FC<WithUser> = ({ user }) => {
    const [opened, { open, close }] = useDisclosure(false);

    return (
        <>
            <Modal fullScreen opened={opened} onClose={close}>
                <Space h="md" />
                <Grid>
                    <Grid.Col>
                        <UserCard user={user} />
                    </Grid.Col>
                    <Grid.Col span={4}>
                        <Card h="100%" withBorder shadow="sm">
                            <Title c="dimmed" size="sm" order={1}>
                                Term
                            </Title>
                            <Flex justify="center" h="100%" align="center">
                                <Title>{`${user?.termSeason} ${user?.termYear}`}</Title>
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <Card h="100%" withBorder shadow="sm">
                            <Title c="dimmed" size="sm" order={1}>
                                Study Participation
                            </Title>
                            <Flex
                                h="100%"
                                align="center"
                                justify="center"
                                gap="lg"
                            >
                                {user?.studyParticipation && (
                                    <Switch
                                        label="Participating in the Study"
                                        checked={user.studyParticipation}
                                    />
                                )}

                                {user?.studyGroup && (
                                    <>
                                        <Divider orientation="vertical" />{" "}
                                        <Text>{`Group ${user.studyGroup}`}</Text>
                                    </>
                                )}
                            </Flex>
                        </Card>
                    </Grid.Col>
                    <Grid.Col>
                        <RecentActivityCard userId={user?.vuNetId} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <AverageScoreCard userId={user?.vuNetId} />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <AverageTimeSpentCard userId={user?.vuNetId} />
                    </Grid.Col>
                    <Grid.Col>
                        <ScoreDistributionCard userId={user?.vuNetId} />
                    </Grid.Col>
                </Grid>
            </Modal>
            <ActionIcon variant="subtle" color="gray" onClick={open}>
                <IconPencil size={16} stroke={1.5} />
            </ActionIcon>
        </>
    );
};

export default EditUserModal;
