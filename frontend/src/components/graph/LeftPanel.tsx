import { Paper, Typography, Divider, Stack } from "@mui/material";

import GraphSearch from "./left/GraphSearch";
import ArtifactFilters from "./left/ArtifactFilters";
import RelationshipFilters from "./left/RelationshipFilters";
import GraphLegend from "./left/GraphLegend";

interface Props {
    selectedTypes?: Set<string>;
    onToggleType?: (type: string) => void;
}

export default function LeftPanel({ selectedTypes, onToggleType }: Props) {

    return (

        <Paper
            sx={{
                height: "100%",
                p: 2,
                overflow: "auto",
                borderRadius: 3
            }}
        >

            <Typography
                variant="h6"
                sx={{ mb: 2 }}
            >
                Repository Navigator
            </Typography>

            <GraphSearch />

            <Divider sx={{ my: 2 }} />

            <ArtifactFilters selectedTypes={selectedTypes} onToggleType={onToggleType} />

            <Divider sx={{ my: 2 }} />

            <RelationshipFilters />

            <Divider sx={{ my: 2 }} />

            <GraphLegend />

        </Paper>

    );

}