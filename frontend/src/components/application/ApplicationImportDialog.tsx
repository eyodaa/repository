import { useState } from "react";

import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    List,
    ListItem,
    Paper,
    Typography,
} from "@mui/material";

import UploadFileIcon from "@mui/icons-material/UploadFile";

import { applicationService } from "../../services/applicationService";

interface ImportResult {
    imported: number;
    skipped: number;
    errors: string[];
}

interface Props {
    open: boolean;
    onClose: () => void;
    onImported: () => void;
}

export default function ApplicationImportDialog({
    open,
    onClose,
    onImported,
}: Props) {

    const [file, setFile] = useState<File | null>(null);

    const [loading, setLoading] = useState(false);

    const [result, setResult] =
        useState<ImportResult | null>(null);

    const [error, setError] =
        useState("");

    async function handleImport() {

        if (!file) {

            setError("Please choose an Excel file.");

            return;

        }

        try {

            setLoading(true);

            setError("");

            const response =
                await applicationService.import(file);

            setResult(response.data);

            onImported();

        } catch {

            setError("Import failed.");

        } finally {

            setLoading(false);

        }

    }

    function handleClose() {

        setFile(null);

        setResult(null);

        setError("");

        onClose();

    }

    return (

        <Dialog
            open={open}
            onClose={handleClose}
            maxWidth="sm"
            fullWidth
        >

            <DialogTitle>

                Import Applications

            </DialogTitle>

            <DialogContent>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 3 }}
                >

                    Select the Excel workbook containing the
                    application portfolio.

                </Typography>

                <Paper
                    variant="outlined"
                    sx={{
                        p: 3,
                        textAlign: "center",
                        borderStyle: "dashed",
                    }}
                >

                    <Button
                        component="label"
                        variant="contained"
                        startIcon={<UploadFileIcon />}
                    >

                        Choose Excel File

                        <input
                            hidden
                            type="file"
                            accept=".xlsx,.xls"
                            onChange={(e) => {

                                if (e.target.files?.length) {

                                    setFile(e.target.files[0]);

                                    setResult(null);

                                }

                            }}
                        />

                    </Button>

                    {file && (

                        <Typography
                            sx={{ mt: 2 }}
                        >

                            {file.name}

                        </Typography>

                    )}

                </Paper>

                {loading && (

                    <Box
                        sx={{
                            mt: 3,
                            textAlign: "center",
                        }}
                    >

                        <CircularProgress />

                    </Box>

                )}

                {error && (

                    <Alert
                        severity="error"
                        sx={{ mt: 3 }}
                    >

                        {error}

                    </Alert>

                )}

                {result && (

                    <Alert
                        severity="success"
                        sx={{ mt: 3 }}
                    >

                        <Typography>

                            Imported: {result.imported}

                        </Typography>

                        <Typography>

                            Skipped: {result.skipped}

                        </Typography>

                    </Alert>

                )}

                {result?.errors.length ? (

                    <Box sx={{ mt: 2 }}>

                        <Typography
                        >

                            Errors

                        </Typography>

                        <List dense>

                            {result.errors.map((e) => (

                                <ListItem key={e}>

                                    • {e}

                                </ListItem>

                            ))}

                        </List>

                    </Box>

                ) : null}

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={handleClose}
                >

                    Close

                </Button>

                <Button
                    variant="contained"
                    disabled={!file || loading}
                    onClick={handleImport}
                >

                    Import

                </Button>

            </DialogActions>

        </Dialog>

    );

}