import { Typography } from "@mui/material";

interface Props {

    capabilityCode: string | null;

}

export default function CapabilityDetails({

    capabilityCode,

}: Props) {

    if (!capabilityCode) {

        return (

            <Typography color="text.secondary">

                Select a capability

            </Typography>

        );

    }

    return (

        <Typography variant="h5">

            {capabilityCode}

        </Typography>

    );

}