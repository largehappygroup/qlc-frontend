import { Route, Routes, BrowserRouter } from "react-router-dom";
import "./App.css";

import FacultyDashboard from "./pages/FacultyDashboard";
import Chapters from "./pages/Chapters";
import FacultyProgress from "./pages/FacultyProgress";
import Login from "./pages/Login";
import ChapterProfile from "./pages/ChapterProfile";
import StudentProgress from "./pages/StudentProgress";

import Settings from "./pages/Settings";
import { useAuth } from "./hooks/AuthContext";
import StudentDashboard from "./pages/StudentDashboard";
import UserDirectory from "./pages/UserDirectory";

function App() {
    const { user } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    index
                    element={
                        user?.role === "student" ? (
                            <StudentDashboard />
                        ) : (
                            <FacultyDashboard />
                        )
                    }
                />
                <Route
                    path="/progress"
                    element={
                        user?.role === "student" ? (
                            <StudentProgress />
                        ) : (
                            <FacultyProgress />
                        )
                    }
                />
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/chapters/:order" element={<ChapterProfile />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/directory" element={<UserDirectory />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
