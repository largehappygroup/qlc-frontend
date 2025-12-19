import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";

import "./App.css";

import FacultyDashboard from "./pages/FacultyDashboard";
import Chapters from "./pages/Chapters";
import FacultyProgress from "./pages/FacultyProgress";
import Login from "./pages/Login";
import StudentProgress from "./pages/StudentProgress";

import Settings from "./pages/Settings";
import StudentDashboard from "./pages/StudentDashboard";
import UserDirectory from "./pages/UserDirectory";
import StudentChapters from "./pages/StudentChapters";

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
                <Route
                    path="/chapters"
                    element={
                        user?.role === "student" ? (
                            <StudentChapters />
                        ) : (
                            <Chapters />
                        )
                    }
                />
                <Route path="/settings" element={<Settings />} />
                <Route path="/directory" element={<UserDirectory />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
