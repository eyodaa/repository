import {
    Box,
    Typography,
    Chip,
} from "@mui/material";

import {
    Apps,
    Storage,
    AccountTree,
    Schema,
} from "@mui/icons-material";

import {
    Handle,
    Position,
} from "@xyflow/react";

interface Props {
    data: {
        label: string;
        type: string;
    };
}

const config: Record<
    string,
    {
        color: string;
        icon: React.ReactNode;
    }
> = {

    APPLICATION: {
        color: "#2563eb",
        icon: <Apps sx={{ fontSize: 30 }} />,
    },

    TECHNOLOGY: {
        color: "#06b6d4",
        icon: <Storage sx={{ fontSize: 30 }} />,
    },

    CAPABILITY: {
        color: "#8b5cf6",
        icon: <AccountTree sx={{ fontSize: 30 }} />,
    },

    PROCESS: {
        color: "#22c55e",
        icon: <Schema sx={{ fontSize: 30 }} />,
    },

};

export default function EnterpriseNode({
    data,
}: Props) {

    const node = config[data.type?.toUpperCase()] ?? {
        color: "#64748b",
        icon: <Apps sx={{ fontSize: 30 }} />,
    };

    return (
        <Box
            sx={{
                position: "relative",

                width: 240,
                minHeight: 100,

                background: `linear-gradient(
                    135deg,
                    ${node.color},
                    ${node.color}CC
                )`,

                borderRadius: "18px",

                border:
                    "1px solid rgba(255,255,255,.12)",

                color: "white",

                px: 2.5,
                py: 2,

                boxSizing: "border-box",

                boxShadow:
                    "0 18px 35px rgba(0,0,0,.35)",

                transition: ".25s",

                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-4px)",

                    boxShadow:
                        "0 24px 50px rgba(0,0,0,.45)",
                },

            }}
        >

            {/* ================================================= */}
            {/* TOP TARGET HANDLE */}
            {/* ================================================= */}

            <Handle
                id="top-target"
                type="target"
                position={Position.Top}
                style={{
                    width: 10,
                    height: 10,

                    background: "#ffffff",

                    border:
                        "2px solid #94a3b8",
                }}
            />

            {/* ================================================= */}
            {/* LEFT TARGET HANDLE */}
            {/* ================================================= */}

            <Handle
                id="left-target"
                type="target"
                position={Position.Left}
                style={{
                    width: 10,
                    height: 10,

                    background: "#ffffff",

                    border:
                        "2px solid #94a3b8",
                }}
            />

            {/* ================================================= */}
            {/* NODE CONTENT */}
            {/* ================================================= */}

            <Box
                sx={{
                    display: "flex",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "flex-start",
                }}
            >

                <Box>
                    {node.icon}
                </Box>

                <Chip
                    label={data.type}
                    size="small"
                    sx={{
                        bgcolor:
                            "rgba(255,255,255,.15)",

                        color: "white",

                        fontWeight: 700,

                        fontSize: 10,

                        letterSpacing: 1,
                    }}
                />

            </Box>

            <Typography
                sx={{
                    mt: 2,

                    fontWeight: 700,

                    fontSize: 18,

                    lineHeight: 1.3,

                    wordBreak:
                        "break-word",
                }}
            >
                {data.label}
            </Typography>

            {/* ================================================= */}
            {/* RIGHT SOURCE HANDLE */}
            {/* ================================================= */}

            <Handle
                id="right-source"
                type="source"
                position={Position.Right}
                style={{
                    width: 10,
                    height: 10,

                    background: "#ffffff",

                    border:
                        "2px solid #94a3b8",
                }}
            />

            {/* ================================================= */}
            {/* BOTTOM SOURCE HANDLE */}
            {/* ================================================= */}

            <Handle
                id="bottom-source"
                type="source"
                position={Position.Bottom}
                style={{
                    width: 10,
                    height: 10,

                    background: "#ffffff",

                    border:
                        "2px solid #94a3b8",
                }}
            />

        </Box>
    );
}