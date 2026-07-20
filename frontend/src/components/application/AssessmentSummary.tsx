import { useEffect, useState } from "react";
import {
    Paper,
    Typography,
    Grid,
    Box,
    TextField,
    Button,
    Divider,
    Alert,
} from "@mui/material";

import { assessmentService } from "../../services/assessmentService";

import type { ApplicationAssessmentRequest } from "../../types/request";

interface AssessmentSummaryProps {
    applicationId: number;
    onAssessmentSubmitted: () => void;
}

const defaultValues: Omit<ApplicationAssessmentRequest, "applicationId"> = {
    increaseValue: 3,
    reachConsumers: 3,
    reduceCosts: 3,
    enhanceServices: 3,
    governanceCompliance: 3,
    securityCompliance: 3,
    businessContinuity: 3,
    maintainability: 3,
    adaptability: 3,
    interoperability: 3,
    dataQuality: 3,
    effectiveness: 3,
    usability: 3,
    satisfaction: 3,
    licenseCost: 3,
    maintenanceCost: 3,
    indirectCost: 3,
    otherCost: 3,
};

export default function AssessmentSummary({
    applicationId,
    onAssessmentSubmitted,
}: AssessmentSummaryProps) {

    const [formData, setFormData] = useState(defaultValues);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");

    const [success, setSuccess] = useState("");

    useEffect(() => {
        loadAssessment();
    }, [applicationId]);

    async function loadAssessment() {

        try {

            const response =
                await assessmentService.getByApplication(applicationId);

            const assessment = response.data;

            setFormData({
                increaseValue: assessment.increaseValue,
                reachConsumers: assessment.reachConsumers,
                reduceCosts: assessment.reduceCosts,
                enhanceServices: assessment.enhanceServices,
                governanceCompliance: assessment.governanceCompliance,
                securityCompliance: assessment.securityCompliance,
                businessContinuity: assessment.businessContinuity,
                maintainability: assessment.maintainability,
                adaptability: assessment.adaptability,
                interoperability: assessment.interoperability,
                dataQuality: assessment.dataQuality,
                effectiveness: assessment.effectiveness,
                usability: assessment.usability,
                satisfaction: assessment.satisfaction,
                licenseCost: assessment.licenseCost,
                maintenanceCost: assessment.maintenanceCost,
                indirectCost: assessment.indirectCost,
                otherCost: assessment.otherCost,
            });

        } catch {

            // No assessment yet
            setFormData(defaultValues);

        }

    }

    const handleChange =
        (field: keyof typeof defaultValues) =>
            (event: React.ChangeEvent<HTMLInputElement>) => {

                let value = Number(event.target.value);

                if (isNaN(value)) value = 1;

                if (value < 1) value = 1;

                if (value > 5) value = 5;

                setFormData((prev) => ({
                    ...prev,
                    [field]: value,
                }));
            };

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        setLoading(true);

        setError("");

        setSuccess("");

        try {

            await assessmentService.create({
                applicationId,
                ...formData,
            });

            setSuccess("Assessment submitted successfully.");

            onAssessmentSubmitted();

            await loadAssessment();

        } catch (err: any) {

            console.error(err);

            setError(
                err?.response?.data?.message ??
                "Failed to submit assessment."
            );

        } finally {

            setLoading(false);

        }

    };

    const renderInput = (
        label: string,
        field: keyof typeof defaultValues
    ) => (

        <Grid size={{ xs: 12, sm: 6, md: 4 }} key={field}>

            <TextField
                label={label}
                type="number"
                value={formData[field]}
                onChange={handleChange(field)}
                fullWidth
                size="small"
                helperText="1 - 5"
                slotProps={{
                    htmlInput: {
                        min: 1,
                        max: 5,
                        step: 1,
                    },
                }}
                onKeyDown={(e) => {

                    const allowed = [
                        "Backspace",
                        "Delete",
                        "ArrowLeft",
                        "ArrowRight",
                        "ArrowUp",
                        "ArrowDown",
                        "Tab",
                    ];

                    if (allowed.includes(e.key)) return;

                    if (!/^[1-5]$/.test(e.key)) {
                        e.preventDefault();
                    }

                }}
            />

        </Grid>

    );

    return (

        <Paper sx={{ p: 3, borderRadius: 3 }}>

            <Typography variant="h6" sx={{ mb: 3 }}>
                Application Assessment (TIME)
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <form onSubmit={handleSubmit}>

                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "bold" }}
                >
                    Organizational Value
                </Typography>

                <Grid container spacing={2}>

                    {renderInput("Increase Value", "increaseValue")}
                    {renderInput("Reach Consumers", "reachConsumers")}
                    {renderInput("Reduce Costs", "reduceCosts")}
                    {renderInput("Enhance Services", "enhanceServices")}
                    {renderInput("Governance & Compliance", "governanceCompliance")}

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "bold" }}
                >
                    Technical Health
                </Typography>

                <Grid container spacing={2}>

                    {renderInput("Security Compliance", "securityCompliance")}
                    {renderInput("Business Continuity", "businessContinuity")}
                    {renderInput("Maintainability", "maintainability")}
                    {renderInput("Adaptability", "adaptability")}
                    {renderInput("Interoperability", "interoperability")}

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "bold" }}
                >
                    End User Perspective
                </Typography>

                <Grid container spacing={2}>

                    {renderInput("Data Quality", "dataQuality")}
                    {renderInput("Effectiveness", "effectiveness")}
                    {renderInput("Usability", "usability")}
                    {renderInput("Satisfaction", "satisfaction")}

                </Grid>

                <Divider sx={{ my: 3 }} />

                <Typography
                    variant="subtitle1"
                    color="primary"
                    sx={{ mb: 2, fontWeight: "bold" }}
                >
                    Total Cost of Ownership
                </Typography>

                <Grid container spacing={2}>

                    {renderInput(
                        "License Cost",
                        "licenseCost"
                    )}
                    {renderInput(
                        "Maintenance Cost",
                        "maintenanceCost"
                    )}
                    {renderInput(
                        "Indirect Cost",
                        "indirectCost"
                    )}
                    {renderInput(
                        "Other Cost",
                        "otherCost"
                    )}

                </Grid>

                <Box
                    sx={{
                        mt: 4,
                        display: "flex",
                        justifyContent: "flex-end",
                    }}
                >

                    <Button
                        variant="contained"
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Saving..." : "Submit Assessment"}
                    </Button>

                </Box>

            </form>

        </Paper>

    );

}