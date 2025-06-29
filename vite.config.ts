import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    preview: {
        port: 5703,
        strictPort: true,
    },
    server: {
        port: 5703,
        strictPort: true,
        host: true,
        origin: "http://0.0.0.0:5703",
    },
    resolve: {
        alias: {
            // /esm/icons/index.mjs only exports the icons statically, so no separate chunks are created
            "@tabler/icons-react":
                "@tabler/icons-react/dist/esm/icons/index.mjs",
        },
    },
});
