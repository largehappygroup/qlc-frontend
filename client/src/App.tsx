import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Divider } from "@mantine/core";
import "./App.css";

import Layout from "./components/Layout";

import Home from "./pages/Dashboard";
import Quiz from "./components/Quiz";
import Summary from "./components/Summary";
import Profile from "./pages/Profile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Home />} />
                <Route path="/quiz" element={<Quiz />} />
                <Route path="/summary" element={<Summary questions={['','']} />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
