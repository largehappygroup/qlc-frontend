import { Route, Routes, BrowserRouter } from "react-router-dom";
import { useAuth } from "./hooks/AuthContext";

import "./App.css";

import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyChapters from "./pages/FacultyChapters";
import FacultyProgress from "./pages/FacultyProgress";
import Login from "./pages/Login";
import StudentProgress from "./pages/StudentProgress";

import Settings from "./pages/Settings";
import StudentDashboard from "./pages/StudentDashboard";
import UserDirectory from "./pages/UserDirectory";
import StudentChapters from "./pages/StudentChapters";
import FacultyExercises from "./pages/FacultyExercises";

function App() {
    const { user, viewAsStudent } = useAuth();
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route
                    index
                    element={
                        user?.role === "student" || viewAsStudent ? (
                            <StudentDashboard />
                        ) : (
                            <FacultyDashboard />
                        )
                    }
                />
                <Route
                    path="/progress"
                    element={
                        user?.role === "student" || viewAsStudent ? (
                            <StudentProgress />
                        ) : (
                            <FacultyProgress />
                        )
                    }
                />
                <Route
                    path="/chapters"
                    element={
                        user?.role === "student" || viewAsStudent ? (
                            <StudentChapters />
                        ) : (
                            <FacultyChapters />
                        )
                    }
                />
                <Route path="/exercises" element={<FacultyExercises />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/directory" element={<UserDirectory />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
