import {
    Checkbox,
    FormControlLabel,
    Typography,
    Box
} from "@mui/material";

export default function RelationshipFilters() {

    return (

        <Box>

            <Typography
                variant="subtitle2"
                sx={{ mb: 1 }}
            >
                Relationships
            </Typography>

            <FormControlLabel control={<Checkbox defaultChecked />} label="Depends On" />

            <FormControlLabel control={<Checkbox defaultChecked />} label="Uses" />

            <FormControlLabel control={<Checkbox defaultChecked />} label="Supports" />

            <FormControlLabel control={<Checkbox defaultChecked />} label="Connects To" />

        </Box>

    );

}