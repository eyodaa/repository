import {
    Box,
    Typography,
    Paper,
    Chip,
    Stack,
    Button,
    Divider,
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import HubIcon from "@mui/icons-material/Hub";
import AssessmentIcon from "@mui/icons-material/Assessment";
import type { Application } from "../../types/application";

interface ApplicationHeaderProps {
    application: Application;
}

export default function ApplicationHeader({ application }: ApplicationHeaderProps) {
    return (
        <Paper
            sx={{
                p: 4,
                borderRadius: 3,
                mb: 3,
            }}
        >
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                    <Typography variant="h4" >
                        {application.name}
                    </Typography>

                    <Typography
                        color="text.secondary"
                        sx={{ mt: 1 }}
                    >
                        {application.code}
                    </Typography>
                </Box>

                <Chip
                    label={application.lifecycleStatus}
                    color="success"
                    size="medium"
                />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: "220px 1fr",
                    rowGap: 2,
                }}
            >
                <Typography color="text.secondary">Technical Owner</Typography>
                <Typography>{application.technicalOwner}</Typography>

                <Typography color="text.secondary">Business Unit</Typography>
                <Typography>{application.businessOwner}</Typography>

                <Typography color="text.secondary">Vendor</Typography>
                <Typography>{application.vendor}</Typography>

                <Typography color="text.secondary">Lifecycle</Typography>
                <Typography>{application.lifecycleStatus}</Typography>

                <Typography color="text.secondary">Criticality</Typography>
                <Typography>{application.businessCriticality}</Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            <Stack
                direction="row"
                spacing={2}
            >
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                >
                    Edit
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<AnalyticsIcon />}
                >
                    Analyze
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<AssessmentIcon />}
                >
                    Assessments
                </Button>

                <Button
                    variant="outlined"
                    startIcon={<HubIcon />}
                >
                    Relationships
                </Button>
            </Stack>
        </Paper>
    );
}