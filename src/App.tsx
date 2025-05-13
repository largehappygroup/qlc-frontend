import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Divider, MantineProvider } from "@mantine/core";
import "./App.css";

import FacultyDashboard from "./pages/FacultyDashboard";
import Chapters from "./pages/Chapters";
import FacultyProgress from "./pages/FacultyProgress";
import Profile from "./components/settings/Profile";
import Login from "./pages/Login";
import ChapterProfile from "./pages/ChapterProfile";
import WhichAccess from "./components/WhichAccess";
import StudentProgress from "./pages/StudentProgress";

import Settings from "./pages/Settings";
import { AuthProvider, useAuth } from "./hooks/AuthContext";
import ColorSchemeContext from "./hooks/ColorSchemeContext";
import { useState } from "react";
import StudentDashboard from "./pages/StudentDashboard";

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
                <Route path="/profile" element={<Profile />} />
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
            </Routes>
        </BrowserRouter>
    );
}

export default App;
