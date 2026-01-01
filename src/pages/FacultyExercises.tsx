import { useState } from "react";
import Layout from "../components/Layout";

import { Select, Space } from "@mantine/core";
import ExerciseTable from "../components/exercises/ExerciseTable";
import { useAssignments } from "../hooks/assignments";

const FacultyExercises: React.FC = () => {
    const { data: assignments } = useAssignments();
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    return (
        <Layout title="Exercises">
            <Select
                data={
                    assignments?.map((assignment) => ({
                        value: assignment.uuid || "",
                        label: assignment.identifier,
                    })) || []
                }
                value={assignments?.[selectedIndex]?.uuid || ""}
                onChange={(_value, option) =>
                    setSelectedIndex(
                        assignments?.findIndex(
                            (assignment) => assignment.uuid === option?.value
                        ) || 0
                    )
                }
            />
            <Space h="md" />
            <ExerciseTable assignmentId={assignments?.[selectedIndex]?.uuid} />
        </Layout>
    );
};

export default FacultyExercises;
