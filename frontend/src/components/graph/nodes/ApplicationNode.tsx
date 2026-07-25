import { Handle, Position } from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import AppsIcon from "@mui/icons-material/Apps";

interface Props {
    data: {
        label: string;
    };
}

export default function ApplicationNode({ data }: Props) {

    return (
        <>

            <Handle type="target" position={Position.Left} />

            <Box
                sx={{
                    width: 220,
                    height: 110,

                    bgcolor: "#2563eb",

                    borderRadius: "50%",

                    color: "white",

                    display: "flex",

                    flexDirection: "column",

                    justifyContent: "center",

                    alignItems: "center",

                    boxShadow: "0 0 35px rgba(37,99,235,.55)",

                    border: "3px solid #60a5fa",
                }}
            >

                <AppsIcon sx={{ fontSize: 34 }} />

                <Typography>
                    {data.label}
                </Typography>

                <Typography
                    variant="caption"
                    sx={{ opacity: .8 }}
                >
                    APPLICATION
                </Typography>

            </Box>

            <Handle type="source" position={Position.Right} />

        </>
    );
}