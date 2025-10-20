import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import Layout from "../components/Layout";
import ChapterDetailsList from "../components/exercises/ChapterDetailsList";

import { Chapter } from "../types/Chapter";

const ChapterPage: React.FC = () => {
    const { order } = useParams();
    const [chapter, setChapter] = useState<Chapter>();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get<Chapter[]>(
                    `${
                        import.meta.env.VITE_BACKEND_URL
                    }/chapters?order=${order}&date=${new Date()}`
                );
                if (response.data.length === 0) {
                    navigate("/not-found", { replace: true });
                } else if (response.data.length > 1) {
                    navigate("/server-error", { replace: true });
                } else {
                    setChapter(response.data[0]);
                }
            } catch (err) {
                console.error(err);
                navigate("/not-found", { replace: true });
            }
        };

        fetchData();
    }, [order]);

    return (
        <Layout title={`Chapter ${order}`}>
            <ChapterDetailsList chapter={chapter} />
        </Layout>
    );
};

export default ChapterPage;
