import { Handle, Position } from "@xyflow/react";
import { Box, Typography } from "@mui/material";
import MemoryIcon from "@mui/icons-material/Memory";

interface Props {
    data: {
        label: string;
    };
}

export default function TechnologyNode({ data }: Props) {

    return (
        <>

            <Handle type="target" position={Position.Left} />

            <Box
                sx={{
                    width: 140,
                    height: 70,

                    bgcolor: "#06b6d4",

                    borderRadius: 4,

                    display: "flex",

                    alignItems: "center",

                    justifyContent: "center",

                    gap: 1,

                    color: "white",

                    boxShadow: "0 0 20px rgba(6,182,212,.45)",
                }}
            >

                <MemoryIcon />

                <Typography>
                    {data.label}
                </Typography>

            </Box>

            <Handle type="source" position={Position.Right} />

        </>
    );
}