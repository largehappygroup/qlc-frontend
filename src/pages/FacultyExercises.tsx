import React, { useEffect, useState } from "react";
import { Exercise } from "../types/Exercise";
import axios from "axios";

const FacultyExercises: React.FC = () => {
    const [exercises, setExercises] = useState<Exercise[]>([]);
    
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Exercise[]>(
                    `${import.meta.env.VITE_BACKEND_URL}/exercises`
                );
                setExercises(response.data);
            } catch (error) {
                console.error("Error fetching exercises:", error);
            }
        };

        fetchData();
    }, []);

    return <div>Faculty Exercises Page</div>;
}

export default FacultyExercises;