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

export default function GeneralTechnologyInformation({
    technology,
}: Props) {

    return (

        <Card>

            <CardContent>

                <Typography
                    variant="h6"
                    gutterBottom
                >
                    General Information
                </Typography>

                <Grid container spacing={2}>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Technology Type
                        </Typography>

                        <Typography>
                            {technology.technologyType}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Vendor
                        </Typography>

                        <Typography>
                            {technology.vendor}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Product
                        </Typography>

                        <Typography>
                            {technology.productName}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Version
                        </Typography>

                        <Typography>
                            {technology.version}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Platform
                        </Typography>

                        <Typography>
                            {technology.platform}
                        </Typography>
                    </Grid>

                    <Grid size={6}>
                        <Typography variant="caption">
                            Deployment
                        </Typography>

                        <Typography>
                            {technology.deploymentModel}
                        </Typography>
                    </Grid>

                    <Grid size={12}>
                        <Typography variant="caption">
                            Description
                        </Typography>

                        <Typography>
                            {technology.description}
                        </Typography>
                    </Grid>

                </Grid>

            </CardContent>

        </Card>

    );

}