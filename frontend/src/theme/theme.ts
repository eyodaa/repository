import { createTheme } from "@mui/material";
import type { PaletteMode } from "@mui/material/styles";

import { typography } from "./typography";

export const getAppTheme = (mode: PaletteMode) => {
    const isLight = mode === "light";

    return createTheme({
        palette: {
            mode,

            primary: {
                main: "#2563EB",
                light: "#60A5FA",
                dark: "#1D4ED8",
                contrastText: "#FFFFFF",
            },

            secondary: {
                main: "#7C3AED",
                light: "#A78BFA",
                dark: "#6D28D9",
                contrastText: "#FFFFFF",
            },

            success: {
                main: "#22C55E",
                light: "#86EFAC",
                dark: "#16A34A",
                contrastText: "#FFFFFF",
            },

            warning: {
                main: "#F59E0B",
                light: "#FCD34D",
                dark: "#D97706",
                contrastText: "#FFFFFF",
            },

            error: {
                main: "#EF4444",
                light: "#FCA5A5",
                dark: "#DC2626",
                contrastText: "#FFFFFF",
            },

            info: {
                main: "#06B6D4",
                light: "#67E8F9",
                dark: "#0891B2",
                contrastText: "#FFFFFF",
            },

            divider: isLight
                ? "#E2E8F0"
                : "#1E293B",

            background: {
                default: isLight
                    ? "#F8FAFC"
                    : "#0F172A",

                paper: isLight
                    ? "#FFFFFF"
                    : "#1E293B",
            },

            text: {
                primary: isLight
                    ? "#172554"
                    : "#F8FAFC",

                secondary: isLight
                    ? "#64748B"
                    : "#94A3B8",

                disabled: isLight
                    ? "#94A3B8"
                    : "#475569",
            },
        },

        typography: {
            ...typography,

            fontFamily: [
                "Inter",
                "Roboto",
                "Arial",
                "sans-serif",
            ].join(","),

            h1: {
                fontWeight: 700,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            h2: {
                fontWeight: 700,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            h3: {
                fontWeight: 700,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            h4: {
                fontWeight: 700,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            h5: {
                fontWeight: 600,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            h6: {
                fontWeight: 600,
                color: isLight
                    ? "#172554"
                    : "#F8FAFC",
            },

            body1: {
                color: isLight
                    ? "#334155"
                    : "#CBD5E1",
            },

            body2: {
                color: isLight
                    ? "#64748B"
                    : "#94A3B8",
            },
        },

        shape: {
            borderRadius: 12,
        },

        /*
        ========================================================
        COMPONENTS
        ========================================================
        */

        components: {

            /*
            ====================================================
            PAPER
            ====================================================
            */

            MuiPaper: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#FFFFFF"
                            : "#1E293B",

                        border: `1px solid ${isLight
                                ? "#E2E8F0"
                                : "#334155"
                            }`,

                        backgroundImage: "none",

                        boxShadow: isLight
                            ? "0 2px 8px rgba(15, 23, 42, 0.06)"
                            : "0 2px 8px rgba(0, 0, 0, 0.2)",
                    },
                },
            },


            /*
            ====================================================
            CARD
            ====================================================
            */

            MuiCard: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#FFFFFF"
                            : "#1E293B",

                        border: `1px solid ${isLight
                                ? "#E2E8F0"
                                : "#334155"
                            }`,

                        backgroundImage: "none",

                        boxShadow: isLight
                            ? "0 2px 8px rgba(15, 23, 42, 0.06)"
                            : "0 2px 8px rgba(0, 0, 0, 0.2)",

                        borderRadius: 14,

                        transition:
                            "box-shadow 0.2s ease, transform 0.2s ease",

                        "&:hover": {
                            boxShadow: isLight
                                ? "0 6px 18px rgba(15, 23, 42, 0.10)"
                                : "0 6px 18px rgba(0, 0, 0, 0.30)",
                        },
                    },
                },
            },


            /*
            ====================================================
            APP BAR
            ====================================================
            */

            MuiAppBar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#FFFFFF"
                            : "#0F172A",

                        color: isLight
                            ? "#172554"
                            : "#F8FAFC",

                        boxShadow: isLight
                            ? "0 1px 4px rgba(15, 23, 42, 0.08)"
                            : "0 1px 4px rgba(0, 0, 0, 0.2)",

                        borderBottom: `1px solid ${isLight
                                ? "#E2E8F0"
                                : "#1E293B"
                            }`,
                    },
                },
            },


            /*
            ====================================================
            TOOLBAR
            ====================================================
            */

            MuiToolbar: {
                styleOverrides: {
                    root: {
                        minHeight: 72,
                    },
                },
            },


            /*
            ====================================================
            TABLE
            ====================================================
            */

            MuiTableHead: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#F8FAFC"
                            : "#1E293B",

                        "& .MuiTableCell-root": {
                            color: isLight
                                ? "#475569"
                                : "#CBD5E1",

                            fontWeight: 600,

                            borderBottom: `1px solid ${isLight
                                    ? "#E2E8F0"
                                    : "#334155"
                                }`,
                        },
                    },
                },
            },


            /*
            ====================================================
            TABLE CELL
            ====================================================
            */

            MuiTableCell: {
                styleOverrides: {
                    root: {
                        borderBottom: `1px solid ${isLight
                                ? "#E2E8F0"
                                : "#334155"
                            }`,

                        color: isLight
                            ? "#334155"
                            : "#CBD5E1",
                    },
                },
            },


            /*
            ====================================================
            BUTTON
            ====================================================
            */

            MuiButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 9,

                        textTransform: "none",

                        fontWeight: 600,

                        boxShadow: "none",

                        "&:hover": {
                            boxShadow: "none",
                        },

                        "&.MuiButton-containedPrimary": {
                            boxShadow:
                                "0 3px 8px rgba(37, 99, 235, 0.25)",

                            "&:hover": {
                                boxShadow:
                                    "0 5px 12px rgba(37, 99, 235, 0.30)",
                            },
                        },
                    },
                },
            },


            /*
            ====================================================
            TEXT FIELD
            ====================================================
            */

            MuiTextField: {
                defaultProps: {
                    variant: "outlined",
                },
            },


            /*
            ====================================================
            OUTLINED INPUT
            ====================================================
            */

            MuiOutlinedInput: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#FFFFFF"
                            : "#1E293B",

                        borderRadius: 10,

                        "& fieldset": {
                            borderColor: isLight
                                ? "#CBD5E1"
                                : "#475569",
                        },

                        "&:hover fieldset": {
                            borderColor: isLight
                                ? "#94A3B8"
                                : "#64748B",
                        },

                        "&.Mui-focused fieldset": {
                            borderColor: "#2563EB",

                            borderWidth: 2,
                        },
                    },

                    input: {
                        color: isLight
                            ? "#172554"
                            : "#F8FAFC",
                    },
                },
            },


            /*
            ====================================================
            INPUT LABEL
            ====================================================
            */

            MuiInputLabel: {
                styleOverrides: {
                    root: {
                        color: isLight
                            ? "#64748B"
                            : "#94A3B8",

                        "&.Mui-focused": {
                            color: "#2563EB",
                        },
                    },
                },
            },


            /*
            ====================================================
            CHIP
            ====================================================
            */

            MuiChip: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,

                        fontWeight: 500,
                    },
                },
            },


            /*
            ====================================================
            DIVIDER
            ====================================================
            */

            MuiDivider: {
                styleOverrides: {
                    root: {
                        borderColor: isLight
                            ? "#E2E8F0"
                            : "#334155",
                    },
                },
            },


            /*
            ====================================================
            ICON BUTTON
            ====================================================
            */

            MuiIconButton: {
                styleOverrides: {
                    root: {
                        color: isLight
                            ? "#475569"
                            : "#94A3B8",

                        "&:hover": {
                            backgroundColor: isLight
                                ? "#EFF6FF"
                                : "#1E293B",

                            color: "#2563EB",
                        },
                    },
                },
            },


            /*
            ====================================================
            LIST ITEM
            ====================================================
            */

            MuiListItemButton: {
                styleOverrides: {
                    root: {
                        borderRadius: 8,

                        margin: "3px 8px",

                        color: isLight
                            ? "#334155"
                            : "#CBD5E1",

                        "&:hover": {
                            backgroundColor: isLight
                                ? "#EFF6FF"
                                : "#1E293B",

                            color: isLight
                                ? "#2563EB"
                                : "#38BDF8",
                        },

                        "&.Mui-selected": {
                            backgroundColor: isLight
                                ? "#EFF6FF"
                                : "#1E293B",

                            color: isLight
                                ? "#2563EB"
                                : "#38BDF8",

                            fontWeight: 600,

                            "&:hover": {
                                backgroundColor: isLight
                                    ? "#DBEAFE"
                                    : "#334155",
                            },

                            "& .MuiListItemIcon-root": {
                                color: isLight
                                    ? "#2563EB"
                                    : "#38BDF8",
                            },
                        },
                    },
                },
            },


            /*
            ====================================================
            LIST ITEM ICON
            ====================================================
            */

            MuiListItemIcon: {
                styleOverrides: {
                    root: {
                        minWidth: 40,

                        color: isLight
                            ? "#64748B"
                            : "#94A3B8",
                    },
                },
            },


            /*
            ====================================================
            TOOLTIP
            ====================================================
            */

            MuiTooltip: {
                styleOverrides: {
                    tooltip: {
                        backgroundColor: isLight
                            ? "#172554"
                            : "#0B1727",

                        fontSize: "0.8rem",

                        borderRadius: 6,
                    },
                },
            },


            /*
            ====================================================
            DIALOG
            ====================================================
            */

            MuiDialog: {
                styleOverrides: {
                    paper: {
                        borderRadius: 16,

                        boxShadow: isLight
                            ? "0 20px 50px rgba(15, 23, 42, 0.15)"
                            : "0 20px 50px rgba(0, 0, 0, 0.5)",
                    },
                },
            },


            /*
            ====================================================
            DRAWER
            ====================================================
            */

            MuiDrawer: {
                styleOverrides: {
                    paper: {
                        backgroundColor: isLight
                            ? "#FFFFFF"
                            : "#0F172A",

                        borderRight: `1px solid ${isLight
                                ? "#E2E8F0"
                                : "#1E293B"
                            }`,

                        boxShadow: isLight
                            ? "2px 0 8px rgba(15, 23, 42, 0.04)"
                            : "2px 0 8px rgba(0, 0, 0, 0.2)",
                    },
                },
            },


            /*
            ====================================================
            BADGE
            ====================================================
            */

            MuiBadge: {
                styleOverrides: {
                    badge: {
                        fontWeight: 600,
                    },
                },
            },


            /*
            ====================================================
            AVATAR
            ====================================================
            */

            MuiAvatar: {
                styleOverrides: {
                    root: {
                        backgroundColor: isLight
                            ? "#DBEAFE"
                            : "#1E3A8A",

                        color: isLight
                            ? "#1D4ED8"
                            : "#93C5FD",

                        fontWeight: 600,
                    },
                },
            },
        },
    });
};