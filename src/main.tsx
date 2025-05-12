import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";

import theme from "./theme.ts";

import App from "./App.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { MantineProvider } from "@mantine/core";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </AuthProvider>
    </StrictMode>
);
