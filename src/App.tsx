import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Divider } from "@mantine/core";
import "./App.css";

import Home from "./pages/StudentDashboard";

import Chapters from "./pages/Chapters";
import FacultyProgress from "./pages/FacultyProgress";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import ChapterProfile from "./pages/ChapterProfile";
import WhichAccess from "./components/WhichAccess";
import StudentProgress from "./pages/StudentProgress";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route
                    path="/progress"
                    element={
                        <WhichAccess
                            roles={["admin", "faculty", "ta"]}
                            includesRoleElement={<FacultyProgress />}
                            excludesRoleElement={<StudentProgress />}
                        />
                    }
                />
                <Route path="/chapters" element={<Chapters />} />
                <Route path="/chapters/:order" element={<ChapterProfile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
