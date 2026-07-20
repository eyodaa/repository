import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    CircularProgress,
    Alert,
    Chip,
} from "@mui/material";
import { analysisService } from "../../services/analysisService";
import type { ApplicationAnalysisResponse } from "../../types/analysis";

interface ApplicationAnalysisTableProps {
    applicationId: number;
}

export default function ApplicationAnalysisTable({ applicationId }: ApplicationAnalysisTableProps) {
    const [analysis, setAnalysis] = useState<ApplicationAnalysisResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadAnalysis() {
            setLoading(true);
            try {
                const data = await analysisService.get(applicationId);
                setAnalysis(data);
                setError("");
            } catch (err) {
                setError("Failed to load application analysis.");
            } finally {
                setLoading(false);
            }
        }

        if (applicationId) {
            loadAnalysis();
        }
    }, [applicationId]);

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    if (!analysis) {
        return <Typography sx={{ p: 3 }}>No analysis available for this application.</Typography>;
    }

    return (
        <TableContainer component={Paper} elevation={0} sx={{ border: "1px solid #E5E7EB" }}>
            <Table>
                <TableHead>
                    <TableRow sx={{ backgroundColor: "#F9FAFB" }}>
                        <TableCell sx={{ fontWeight: "bold" }}>Metric</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Value</TableCell>
                        <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow>
                        <TableCell>Organizational Value</TableCell>
                        <TableCell>{analysis.organizationalValue}</TableCell>
                        <TableCell>
                            <Chip
                                label={analysis.organizationalPass ? "Pass" : "Fail"}
                                color={analysis.organizationalPass ? "success" : "error"}
                                size="small"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Technical Health</TableCell>
                        <TableCell>{analysis.technicalHealth}</TableCell>
                        <TableCell>
                            <Chip
                                label={analysis.technicalPass ? "Pass" : "Fail"}
                                color={analysis.technicalPass ? "success" : "error"}
                                size="small"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>End User Perspective</TableCell>
                        <TableCell>{analysis.endUserPerspective}</TableCell>
                        <TableCell>
                            <Chip
                                label={analysis.endUserPass ? "Pass" : "Fail"}
                                color={analysis.endUserPass ? "success" : "error"}
                                size="small"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Total Cost of Ownership</TableCell>
                        <TableCell>{analysis.totalCostOwnership}</TableCell>
                        <TableCell>
                            <Chip
                                label={analysis.totalCostOwnershipPass ? "Pass" : "Fail"}
                                color={analysis.totalCostOwnershipPass ? "success" : "error"}
                                size="small"
                            />
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Pattern</TableCell>
                        <TableCell colSpan={2}>{analysis.pattern}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Disposition</TableCell>
                        <TableCell colSpan={2}>{analysis.disposition}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>Priority</TableCell>
                        <TableCell colSpan={2}>{analysis.priority}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>

        </TableContainer>
    );
}
