import { Card, createTheme, rem } from "@mantine/core";

const theme = createTheme({
    colors: {
        // Add your color
        deepBlue: [
            "#eef3ff",
            "#dce4f5",
            "#b9c7e2",
            "#94a8d0",
            "#748dc1",
            "#5f7cb8",
            "#5474b4",
            "#44639f",
            "#39588f",
            "#2d4b81",
        ],
        // or replace default theme color
        cyan: [
            "#e0f7ff",
            "#b8e8f2",
            "#80d0de",
            "#4db8ca",
            "#33a7ba",
            "#1a97b0",
            "#0094ac",
            "#0081a0",
            "#00748f",
            "#00607a",
        ],
    },
    primaryColor: "cyan",

    shadows: {
        md: "1px 1px 3px rgba(0, 0, 0, .25)",
        xl: "5px 5px 3px rgba(0, 0, 0, .25)",
    },

    headings: {
        fontFamily: "Mulish, sans-serif",
        sizes: {
            h1: { fontSize: rem(28) },
            h2: { fontSize: rem(25) },
        },
    },
    components: {
        /* AppShellNavbar: AppShell.Navbar.extend({
            defaultProps: {
                bg: "cyan.3",
                c: "white",
                px: 0,
            },
        }),*/

        Card: Card.extend({
            defaultProps: {},
        }),
    },
});

export default theme;
