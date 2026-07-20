import {
    Card,
    CardContent,
    Typography,
    Grid,
} from "@mui/material";

import type { Technology } from "../../types/technology";

interface Props {
    technology: Technology;
}

export default function LifecycleInformation({
    technology,
}: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    Lifecycle & Governance
                </Typography>

                <Grid container spacing={2}>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Lifecycle Status
                        </Typography>

                        <Typography>
                            {technology.lifecycleStatus}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Support Status
                        </Typography>

                        <Typography>
                            {technology.supportStatus}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            End Of Support
                        </Typography>

                        <Typography>
                            {technology.endOfSupportDate}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            End Of Life
                        </Typography>

                        <Typography>
                            {technology.endOfLifeDate}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            License
                        </Typography>

                        <Typography>
                            {technology.licenseType}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Owner
                        </Typography>

                        <Typography>
                            {technology.owner}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="caption">
                            Support Group
                        </Typography>

                        <Typography>
                            {technology.supportGroup}
                        </Typography>
                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}