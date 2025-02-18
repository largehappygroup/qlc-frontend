import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Divider } from "@mantine/core";
import "./App.css";

import Layout from "./components/Layout";

import Home from "./pages/Dashboard";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import Performance from "./pages/Performance";
import Profile from "./pages/Profile";
import Skills from "./pages/Skills";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/skills" element={<Skills />} />
                <Route path="/performance" element={<Performance />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
