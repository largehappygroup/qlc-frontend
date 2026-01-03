import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "@mantine/core/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/charts/styles.css";
import "@mantine/dropzone/styles.css";
import "./index.css";

import theme from "./theme.ts";

import App from "./App.tsx";
import { AuthProvider } from "./hooks/AuthContext.tsx";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <MantineProvider theme={theme}>
                    <App />
                </MantineProvider>
            </AuthProvider>
        </QueryClientProvider>
    </StrictMode>
);
