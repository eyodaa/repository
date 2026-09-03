import {
    Box,
    CircularProgress,
    Alert,
    Typography
} from "@mui/material";

import {
    RichTreeView
} from "@mui/x-tree-view/RichTreeView";

import { useNavigate } from "react-router-dom";

import { useCapabilityTree } from "../../hooks/useCapabilityTree";

export default function CapabilityExplorer() {

    const navigate = useNavigate();

    const {

        tree,

        loading,

        error,

    } = useCapabilityTree();

    if (loading) {

        return <CircularProgress />;

    }

    if (error) {

        return <Alert severity="error">

            {error}

        </Alert>;

    }

    return (

        <Box>

            <Typography
                variant="h5"
                sx={{ mb: 2 }}
            >

                Business Capability Explorer

            </Typography>

            <RichTreeView

                items={tree}

                getItemId={(item) => String(item.id)}

                getItemLabel={(item) => item.name}

                getItemChildren={(item) => item.children}

                onItemClick={(_event, id) => {

                    navigate(`/capabilities/${id}`);

                }}

            />

        </Box>

    );

}