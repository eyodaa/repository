import { useEffect } from "react";
import {
    Paper,
    Typography,
    Grid,
    TextField,
    Divider,
    Box,
    Button,
    MenuItem
} from "@mui/material";

import TCOCategorySection from "../../components/application/tco/TCOCategorySection";
import { useTCOAssessment } from "../../hooks/useTCOAssessment";
import { tcoService } from "../../services/tcoService";
import type { CreateTCOAssessmentRequest } from "../../types/tco";
import { useParams } from "react-router-dom";
export default function TCOAssessmentPage() {

    const { id } = useParams();
    const applicationId = Number(id);


    const {
        assessmentId,
        setAssessmentId,

        assessmentYear,
        setAssessmentYear,

        currency,
        setCurrency,

        assessedBy,
        setAssessedBy,

        notes,
        setNotes,

        years,
        addYear,

        categories,
        updateValue,

        loadAssessment,

        grandTotal

    } = useTCOAssessment();

    useEffect(() => {
        tcoService.getApplicationAssessments(applicationId)
            .then(res => {
                if (res.data && res.data.length > 0) {
                    loadAssessment(res.data[0]);
                }
            })
            .catch(err => console.error(err));
    }, [applicationId]);

    async function saveAssessment() {
        try {
            const request = buildRequest();
            console.log(request);

            if (assessmentId) {
                const response = await tcoService.updateAssessment(assessmentId, request);
                console.log(response);
            } else {
                const response = await tcoService.createAssessment(request);
                console.log(response);
                if (response.data && response.data.id) {
                    setAssessmentId(response.data.id);
                }
            }

            alert("Assessment saved successfully.");
        } catch (error) {
            console.error(error);
            alert("Failed to save assessment.");
        }
    }

    function buildRequest(): CreateTCOAssessmentRequest {
        return {
            applicationId: applicationId,
            assessmentYear,
            assessedBy,
            currency,
            notes,
            costItems: categories.flatMap(category =>
                category.rows.map(row => ({
                    costDefinitionId: row.costDefinitionId,
                    yearlyAmounts: years.map(year => {
                        const rawVal = row.values[year];
                        const amount = (typeof rawVal === 'number' && !isNaN(rawVal)) ? rawVal : 0;
                        return {
                            financialYear: year,
                            amount
                        };
                    })
                }))
            )
        };
    }

    return (

        <Paper
            sx={{
                p: 4,
                borderRadius: 3
            }}
        >

            <Typography
                variant="h4"
                gutterBottom
            >
                Application TCO Assessment
            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >
                Assess yearly Total Cost of Ownership.
            </Typography>

            <Typography
                variant="h6"
                color="primary"
                gutterBottom
            >
                Assessment Information
            </Typography>

            <Grid
                container
                spacing={2}
            >

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        select
                        fullWidth
                        label="Assessment Year"
                        value={assessmentYear}
                        onChange={(e) =>
                            setAssessmentYear(Number(e.target.value))
                        }
                    >

                        {years.map(year => (

                            <MenuItem
                                key={year}
                                value={year}
                            >
                                {year}
                            </MenuItem>

                        ))}

                    </TextField>

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Currency"
                        value={currency}
                        onChange={(e) =>
                            setCurrency(e.target.value)
                        }
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Assessed By"
                        value={assessedBy}
                        onChange={(e) =>
                            setAssessedBy(e.target.value)
                        }
                    />

                </Grid>

                <Grid size={{ xs: 12, md: 3 }}>

                    <TextField
                        fullWidth
                        label="Notes"
                        value={notes}
                        onChange={(e) =>
                            setNotes(e.target.value)
                        }
                    />

                </Grid>

            </Grid>

            <Box
                sx={{
                    mt: 3,
                    display: "flex",
                    gap: 2
                }}
            >

                <Button
                    variant="outlined"
                    onClick={addYear}
                >
                    Add Financial Year
                </Button>

            </Box>

            <Divider sx={{ my: 4 }} />

            {categories.map(category => (

                <TCOCategorySection

                    key={category.category}

                    title={category.title}

                    years={years}

                    rows={category.rows}

                    onValueChange={(rowId, year, value) =>

                        updateValue(

                            category.category,

                            rowId,

                            year,

                            value

                        )

                    }

                />

            ))}

            <Divider sx={{ my: 4 }} />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >

                <Box>

                    <Typography variant="h6">

                        Grand Total

                    </Typography>

                    <Typography
                        variant="h4"
                        color="primary"
                    >

                        £{grandTotal.toLocaleString(undefined, {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2
                        })}

                    </Typography>

                </Box>
                <Button
                    variant="contained"
                    size="large"
                    onClick={saveAssessment}
                >
                    Save Assessment
                </Button>

            </Box>

        </Paper>

    );

}