import { useEffect, useRef, useState } from "react";
import axios from "axios";
import Layout from "../components/Layout";

import { ActionIcon, Badge, Flex, Loader, Select, Space } from "@mantine/core";
import ExerciseTable from "../components/exercises/ExerciseTable";
import { useAssignments } from "../hooks/assignments";
import { IconClock } from "@tabler/icons-react";

const FacultyExercises: React.FC = () => {
    const { data: assignments, isLoading } = useAssignments();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);
    const [jobStatuses, setJobStatuses] = useState<
        Record<
            string,
            {
                jobId?: string;
                progress?: number;
                state?: string;
                statusUrl?: string;
            }
        >
    >({});
    const pollingRefs = useRef<Record<string, number>>({});

    useEffect(() => {
        // For the selected assignment, check if there is an active job (so clock remains disabled on refresh)
        const assignment = assignments?.[selectedIndex];
        if (!assignment?.uuid) return;
        let cancelled = false;
        const fetchJob = async () => {
            try {
                const r = await axios.get(
                    `${import.meta.env.VITE_BACKEND_URL}/jobs/by-assignment/${
                        assignment.uuid
                    }`
                );
                const data = r.data;
                const state = data.state || data.status;
                const progress =
                    typeof data.progress === "number" ? data.progress : 0;
                if (!cancelled) {
                    setJobStatuses((s) => ({
                        ...s,
                        [assignment.uuid as string]: {
                            jobId: data.uuid,
                            state,
                            progress,
                            statusUrl: `${
                                import.meta.env.VITE_BACKEND_URL
                            }/jobs/${data.uuid}`,
                        },
                    }));
                }
                // start polling for this job so UI shows live progress
                if (
                    (state === "pending" || state === "in-progress") &&
                    !cancelled
                ) {
                    const poll = async () => {
                        try {
                            const r2 = await axios.get(
                                `${import.meta.env.VITE_BACKEND_URL}/jobs/${
                                    data.uuid
                                }`
                            );
                            const { state: s2, progress: p2 } = r2.data;
                            setJobStatuses((s) => ({
                                ...s,
                                [assignment.uuid as string]: {
                                    ...(s[assignment.uuid as string] || {}),
                                    jobId: data.uuid,
                                    state:
                                        s2 ||
                                        s[assignment.uuid as string]?.state,
                                    progress:
                                        typeof p2 === "number"
                                            ? p2
                                            : s[assignment.uuid as string]
                                                  ?.progress ?? 0,
                                },
                            }));
                            if (s2 === "completed" || s2 === "failed") {
                                const id =
                                    pollingRefs.current[
                                        assignment.uuid as string
                                    ];
                                if (id) {
                                    window.clearInterval(id);
                                    delete pollingRefs.current[
                                        assignment.uuid as string
                                    ];
                                }
                            }
                        } catch (err) {
                            console.error("Polling job status error:", err);
                        }
                    };
                    await poll();
                    const intervalId = window.setInterval(poll, 3000);
                    pollingRefs.current[assignment.uuid as string] = intervalId;
                }
            } catch (err) {
                // no active job is fine
            }
        };
        fetchJob();
        return () => {
            cancelled = true;
        };
    }, [assignments, selectedIndex]);

    // cleanup polling on unmount
    useEffect(() => {
        return () => {
            Object.values(pollingRefs.current).forEach((id) =>
                window.clearInterval(id)
            );
            pollingRefs.current = {};
        };
    }, []);

    const generateExercises = async (assignmentId: string | undefined) => {
        if (!assignmentId) return;

        // prevent duplicate requests for the same assignment while a job is active
        const existing = jobStatuses[assignmentId];
        if (
            existing &&
            existing.state !== "completed" &&
            existing.state !== "failed"
        ) {
            return;
        }

        try {
            const resp = await axios.post(
                `${
                    import.meta.env.VITE_BACKEND_URL
                }/exercises/batch?assignmentId=${assignmentId}`
            );

            const { jobId, statusUrl } = resp.data;
            const fullStatusUrl = statusUrl.startsWith("http")
                ? statusUrl
                : `${import.meta.env.VITE_BACKEND_URL}${statusUrl}`;

            // initialize job status
            setJobStatuses((s) => ({
                ...s,
                [assignmentId]: {
                    jobId,
                    progress: 0,
                    state: "waiting",
                    statusUrl: fullStatusUrl,
                },
            }));

            // start polling
            const poll = async () => {
                try {
                    const r = await axios.get(fullStatusUrl);
                    const { state, progress } = r.data;
                    setJobStatuses((s) => ({
                        ...s,
                        [assignmentId]: {
                            ...(s[assignmentId] || {}),
                            jobId,
                            state,
                            progress:
                                typeof progress === "number"
                                    ? progress
                                    : s[assignmentId]?.progress ?? 0,
                        },
                    }));

                    if (state === "completed" || state === "failed") {
                        const id = pollingRefs.current[assignmentId];
                        if (id) {
                            window.clearInterval(id);
                            delete pollingRefs.current[assignmentId];
                        }
                    }
                } catch (err) {
                    console.error("Polling job status error:", err);
                    // stop polling on repeated errors could be added here
                }
            };

            // poll immediately then set interval
            await poll();
            const intervalId = window.setInterval(poll, 3000);
            pollingRefs.current[assignmentId] = intervalId;
        } catch (err) {
            console.error(err);
            setJobStatuses((s) => ({
                ...s,
                [assignmentId]: { ...(s[assignmentId] || {}), state: "failed" },
            }));
        }
    };

    const assignment = assignments?.[selectedIndex];
    const status = assignment
        ? jobStatuses[assignment.uuid as string]
        : undefined;

    return (
        <Layout title="Exercises">
            <Flex align="center" gap="sm" justify="end">
                {status ? (
                    <Badge variant="outline">
                        {status.state === "completed"
                            ? "Done"
                            : status.state === "failed"
                            ? "Failed"
                            : `${status.progress ?? 0}%`}
                    </Badge>
                ) : (
                    <ActionIcon
                        variant="subtle"
                        color="gray"
                        onClick={() => generateExercises(assignment?.uuid)}
                    >
                        <IconClock size={16} stroke={1.5} />
                    </ActionIcon>
                )}
                <Select
                    data={
                        assignments?.map((assignment) => ({
                            value: assignment.uuid || "",
                            label: assignment.identifier,
                        })) || []
                    }
                    value={assignment?.uuid || ""}
                    onChange={(_value, option) =>
                        setSelectedIndex(
                            assignments?.findIndex(
                                (a) => a.uuid === option?.value
                            ) || 0
                        )
                    }
                />
            </Flex>

            <Space h="md" />
            {isLoading ? (
                <Flex
                    gap="lg"
                    direction="column"
                    w="100%"
                    h="100%"
                    align="center"
                    ta="center"
                >
                    <Loader type="oval" size="xl" />
                </Flex>
            ) : (
                <ExerciseTable assignmentId={assignment?.uuid} />
            )}
        </Layout>
    );
};

export default FacultyExercises;
