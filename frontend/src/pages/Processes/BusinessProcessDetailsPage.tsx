import { useEffect, useState } from "react";

import {
    Alert,
    Box,
    Breadcrumbs,
    CircularProgress,
    Link,
} from "@mui/material";

import { useParams } from "react-router-dom";

import { processService } from "../../services/processService";

import type { BusinessProcess } from "../../types/process";

import ProcessHeader from "../../components/businessProcess/ProcessHeader";
import GeneralProcessInformation from "../../components/businessProcess/GeneralProcessInformation";
import ProcessClassification from "../../components/businessProcess/ProcessClassification";
import ChildProcessTable from "../../components/businessProcess/ChildProcessTable";


export default function BusinessProcessDetailsPage() {

    const { id } = useParams();

    const [process, setProcess] =
        useState<BusinessProcess | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        if (!id) return;

        loadProcess();

    }, [id]);

    async function loadProcess() {

        setLoading(true);

        try {

            const response =
                await processService.getById(Number(id));

            setProcess(response.data);

            setError("");

        }

        catch (err) {

            console.error(err);

            setError("Unable to load business process.");

        }

        finally {

            setLoading(false);

        }

    }

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    p: 5,
                }}
            >

                <CircularProgress />

            </Box>

        );

    }

    if (error || !process) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    return (

        <Box sx={{ p: 4 }}>

            <Breadcrumbs sx={{ mb: 3 }}>

                <Link
                    underline="hover"
                    href="/processes"
                >
                    Business Processes
                </Link>

                <Box component="span">

                    {process.name}

                </Box>

            </Breadcrumbs>

            <ProcessHeader

                process={process}

                onEdit={() => {}}

            />

            <Box
                sx={{
                    display: "flex",
                    gap: 3,
                    my: 3,
                    flexDirection: {
                        xs: "column",
                        lg: "row",
                    },
                }}
            >

                <Box sx={{ flex: 1 }}>

                    <GeneralProcessInformation

                        process={process}

                    />

                </Box>

                <Box sx={{ flex: 1 }}>

                    <ProcessClassification

                        process={process}

                    />

                </Box>

            </Box>

            <ChildProcessTable

                children={process.childProcesses}

            />


        </Box>

    );

}