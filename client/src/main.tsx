import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { MantineProvider } from "@mantine/core";

import theme from "./theme.ts";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "./index.css";

import App from "./App.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AuthProvider>
            <MantineProvider theme={theme}>
                <App />
            </MantineProvider>
        </AuthProvider>
    </StrictMode>
);
