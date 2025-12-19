import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import ChapterDetailsList from "../components/exercises/ChapterDetailsList";

import { Chapter } from "../types/Chapter";
import { Anchor, Grid, Title, Text, Flex, Box } from "@mantine/core";

const StudentChapters: React.FC = () => {
    const [chapters, setChapters] = useState<Chapter[]>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Chapter[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/chapters`
                );
                if (response.data.length === 0) {
                    navigate("/not-found", { replace: true });
                } else {
                    setChapters(response.data);
                }
            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout title="Chapters">
            {chapters ? (
                <Grid>
                    <Grid.Col span={2}>
                        <Flex direction="column" gap="sm" align="start">
                            {chapters?.map((chapter) => (
                                <Anchor
                                    key={chapter.uuid}
                                    href={`#chapter-${chapter.order}`}
                                >
                                    {chapter.title}
                                </Anchor>
                            ))}
                        </Flex>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        {chapters &&
                            chapters.map((chapter) => (
                                <>
                                    <Box p="sm" bg="cyan.1" bdrs={10}>
                                        <Title
                                            id={`chapter-${chapter.order}`}
                                            order={3}
                                            size="sm"
                                            c="cyan"
                                        >
                                            {chapter.title}
                                        </Title>
                                    </Box>

                                    <ChapterDetailsList
                                        key={chapter.uuid}
                                        chapter={chapter}
                                    />
                                </>
                            ))}
                    </Grid.Col>
                </Grid>
            ) : (
                <Text>No chapters available.</Text>
            )}
        </Layout>
    );
};

export default StudentChapters;
