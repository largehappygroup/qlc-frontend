import { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Assignment } from "../types/Assignment";
import axios from "axios";
import { Select } from "@mantine/core";
import ExerciseTable from "../components/exercises/ExerciseTable";

const FacultyExercises: React.FC = () => {
    const [assignments, setAssignments] = useState<Assignment[]>();
    const [selectedAssignmentId, setSelectedAssignmentId] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Assignment[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/assignments`
                );
                setAssignments(response.data);
                setSelectedAssignmentId(response.data[0]?.uuid);
            } catch (error) {
                console.error("Error fetching assignments:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <Layout title="Exercises">
            <Select
                data={
                    assignments?.map((assignment) => ({
                        value: assignment.uuid || "",
                        label: assignment.identifier,
                    })) || []
                }
                value={selectedAssignmentId}
                onChange={(_value, option) =>
                    setSelectedAssignmentId(option?.value)
                }
            />
            <ExerciseTable assignmentId={selectedAssignmentId} />
        </Layout>
    );
};

export default FacultyExercises;
