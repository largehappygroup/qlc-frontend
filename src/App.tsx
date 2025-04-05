import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Divider } from "@mantine/core";
import "./App.css";

import Home from "./pages/StudentDashboard";

import Chapters from "./pages/Chapters";
import Performance from "./pages/Performance";
import Profile from "./pages/Profile";
import Login from "./pages/Login";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/performance" element={<Performance />} />
                <Route path="/chapters" element={<Chapters />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
