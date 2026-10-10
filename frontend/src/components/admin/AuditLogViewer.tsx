import {
    Box,
    Typography,
    Paper,
    TextField,
    Chip,
    CircularProgress,
    Alert,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
} from "@mui/material";

import { useState, useEffect } from "react";

import { auditService } from "../../services/auditService";
import type { AuditLog } from "../../types/audit";

export default function AuditLogViewer() {
    const [logs, setLogs] = useState<AuditLog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [filterUsername, setFilterUsername] = useState("");
    const [filterAction, setFilterAction] = useState("");
    const [filterEntityType, setFilterEntityType] = useState("");

    useEffect(() => {
        loadLogs();
    }, []);

    async function loadLogs() {
        try {
            setLoading(true);
            const data = await auditService.getAllLogs();
            setLogs(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load audit logs");
        } finally {
            setLoading(false);
        }
    }

    async function applyFilters() {
        try {
            setLoading(true);
            let data;
            
            if (filterUsername) {
                data = await auditService.getLogsByUsername(filterUsername);
            } else if (filterAction) {
                data = await auditService.getLogsByAction(filterAction);
            } else if (filterEntityType) {
                data = await auditService.getLogsByEntityType(filterEntityType);
            } else {
                data = await auditService.getAllLogs();
            }
            
            setLogs(data);
            setError("");
        } catch (err) {
            console.error(err);
            setError("Failed to load audit logs");
        } finally {
            setLoading(false);
        }
    }

    function getActionColor(action: string): "default" | "primary" | "secondary" | "success" | "error" | "info" | "warning" {
        switch (action) {
            case "LOGIN":
                return "success";
            case "CREATE":
                return "primary";
            case "UPDATE":
                return "info";
            case "DELETE":
                return "error";
            default:
                return "default";
        }
    }

    function formatTimestamp(timestamp: string): string {
        return new Date(timestamp).toLocaleString();
    }

    if (loading) {
        return (
            <Box sx={{ display: "flex", justifyContent: "center", p: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >
            <Typography variant="h6" sx={{ fontWeight: 600, mb: 3 }}>
                Audit Logs
            </Typography>

            {error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
                    {error}
                </Alert>
            )}

            <Box
                sx={{
                    display: "flex",
                    gap: 2,
                    mb: 3,
                    flexWrap: "wrap",
                }}
            >
                <TextField
                    label="Filter by Username"
                    value={filterUsername}
                    onChange={(e) => setFilterUsername(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                />
                <TextField
                    label="Filter by Action"
                    value={filterAction}
                    onChange={(e) => setFilterAction(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                />
                <TextField
                    label="Filter by Entity Type"
                    value={filterEntityType}
                    onChange={(e) => setFilterEntityType(e.target.value)}
                    size="small"
                    sx={{ minWidth: 200 }}
                />
                <Box sx={{ flexGrow: 1 }} />
                <Button
                    variant="contained"
                    onClick={applyFilters}
                    size="small"
                >
                    Apply Filters
                </Button>
                <Button
                    variant="outlined"
                    onClick={() => {
                        setFilterUsername("");
                        setFilterAction("");
                        setFilterEntityType("");
                        loadLogs();
                    }}
                    size="small"
                >
                    Clear Filters
                </Button>
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Timestamp</TableCell>
                            <TableCell>Username</TableCell>
                            <TableCell>Action</TableCell>
                            <TableCell>Entity Type</TableCell>
                            <TableCell>Entity ID</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>IP Address</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {logs.map((log) => (
                            <TableRow key={log.id}>
                                <TableCell>{formatTimestamp(log.timestamp)}</TableCell>
                                <TableCell>{log.username}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={log.action}
                                        size="small"
                                        color={getActionColor(log.action)}
                                    />
                                </TableCell>
                                <TableCell>{log.entityType}</TableCell>
                                <TableCell>{log.entityId || "-"}</TableCell>
                                <TableCell
                                    sx={{
                                        maxWidth: 300,
                                        overflow: "hidden",
                                        textOverflow: "ellipsis",
                                        whiteSpace: "nowrap",
                                    }}
                                    title={log.details}
                                >
                                    {log.details}
                                </TableCell>
                                <TableCell>{log.ipAddress}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {logs.length === 0 && (
                <Box
                    sx={{
                        p: 4,
                        textAlign: "center",
                        color: "text.secondary",
                    }}
                >
                    No audit logs found
                </Box>
            )}
        </Paper>
    );
}
