import { useNavigate, useParams } from "react-router-dom";

import Layout from "../components/Layout";
import ChapterDetailsList from "../components/exercises/ChapterDetailsList";

import { useChapters } from "../hooks/chapters";

const ChapterPage: React.FC = () => {
    const { order } = useParams();
    const {data: chapters} = useChapters(order, new Date());
    const chapter = chapters ? chapters[0] : undefined;
    const navigate = useNavigate();

    if (!order || !chapters || chapters.length == 0 || !chapter) {
        navigate("/not-found", { replace: true });
        return null;
    }

    return (
        <Layout title={`Chapter ${order}`}>
            <ChapterDetailsList chapter={chapter} />
        </Layout>
    );
};

export default ChapterPage;
