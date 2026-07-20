import { createTheme } from "@mui/material";
import { palette } from "./palette";
import { typography } from "./typography";

export const theme = createTheme({

    palette: {
        mode: "dark",

        primary: palette.primary,
        secondary: palette.secondary,
        success: palette.success,
        warning: palette.warning,
        error: palette.error,

        divider: palette.divider,

        background: {
            default: palette.background.default,
            paper: palette.background.paper,
        },

        text: palette.text,
    },

    typography,

    shape: {
        borderRadius: 14,
    },

    components: {

        MuiPaper: {

            styleOverrides: {

                root: {

                    backgroundColor: palette.background.card,

                    border: "1px solid #334155",

                    backgroundImage: "none",

                    boxShadow:
                        "0 8px 24px rgba(0,0,0,.35)",
                },
            },
        },

        MuiCard: {

            styleOverrides: {

                root: {

                    backgroundColor: palette.background.card,

                    border: "1px solid #334155",
                },
            },
        },

        MuiTableHead: {

            styleOverrides: {

                root: {

                    background: "#172033",
                },
            },
        },

        MuiAppBar: {

            styleOverrides: {

                root: {

                    background: palette.background.sidebar,

                    boxShadow: "none",

                    borderBottom: "1px solid #334155",
                },
            },
        },
    },
});