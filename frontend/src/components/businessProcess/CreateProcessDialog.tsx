import { useEffect, useState } from "react";

import {
    Box,
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    TextField,
} from "@mui/material";

import { processService } from "../../services/processService";
import type { BusinessProcess } from "../../types/process";

interface Props {
    open: boolean;
    onClose: () => void;
    onCreated: () => void;
}

const initialForm: BusinessProcess = {
    code: "",
    name: "",
    description: "",

    processCode: "",
    processOwner: "",
    businessUnit: "",

    category: "CORE",
    status: "DRAFT",
    criticality: "MEDIUM",
    automationLevel: "MANUAL",
    processLevel: "LEVEL_1",

    version: "1.0",

    reviewDate: undefined,
    documentation: "",

    parentProcessId: null,
    parentProcessName: null,

    childProcesses: [],
};
export default function CreateProcessDialog({
    open,
    onClose,
    onCreated,
}: Props) {

    const [form, setForm] = useState<BusinessProcess>(initialForm);

    const [loading, setLoading] = useState(false);

    const [processes, setProcesses] = useState<BusinessProcess[]>([]);

    useEffect(() => {

        if (open) {
            loadProcesses();
        } else {
            setForm(initialForm);
        }

    }, [open]);

    const loadProcesses = async () => {

        try {

            const data = await processService.getAll();

            setProcesses(data);

        } catch (error) {

            console.error(error);

        }

    };

    const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value,
        }));

    };

    const handleParentChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {

        const value = event.target.value;

        setForm((prev) => ({
            ...prev,
            parentProcessId:
                value === ""
                    ? null
                    : Number(value),
        }));
    };

    const handleSave = async () => {

        try {

            setLoading(true);

            await processService.create(form);

            setLoading(false);

            setForm(initialForm);

            onCreated();

        } catch (error) {

            console.error(error);

            setLoading(false);

        }

    };

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>
                Create Business Process
            </DialogTitle>

            <DialogContent>

                <Box sx={{ mt: 2 }}>

                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Code"
                                name="code"
                                value={form.code}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={2}
                                label="Description"
                                name="description"
                                value={form.description}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Process Code"
                                name="processCode"
                                value={form.processCode}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Process Owner"
                                name="processOwner"
                                value={form.processOwner}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                fullWidth
                                label="Business Unit"
                                name="businessUnit"
                                value={form.businessUnit}
                                onChange={handleChange}
                            />
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Category"
                                name="category"
                                value={form.category}
                                onChange={handleChange}
                            >
                                <MenuItem value="CORE">CORE</MenuItem>
                                <MenuItem value="SUPPORT">SUPPORT</MenuItem>
                                <MenuItem value="MANAGEMENT">MANAGEMENT</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Status"
                                name="status"
                                value={form.status}
                                onChange={handleChange}
                            >
                                <MenuItem value="DRAFT">DRAFT</MenuItem>
                                <MenuItem value="ACTIVE">ACTIVE</MenuItem>
                                <MenuItem value="INACTIVE">INACTIVE</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Criticality"
                                name="criticality"
                                value={form.criticality}
                                onChange={handleChange}
                            >
                                <MenuItem value="LOW">LOW</MenuItem>
                                <MenuItem value="MEDIUM">MEDIUM</MenuItem>
                                <MenuItem value="HIGH">HIGH</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Automation"
                                name="automationLevel"
                                value={form.automationLevel}
                                onChange={handleChange}
                            >
                                <MenuItem value="MANUAL">MANUAL</MenuItem>
                                <MenuItem value="SEMI_AUTOMATED">SEMI_AUTOMATED</MenuItem>
                                <MenuItem value="AUTOMATED">AUTOMATED</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Process Level"
                                name="processLevel"
                                value={form.processLevel}
                                onChange={handleChange}
                            >
                                <MenuItem value="LEVEL_1">LEVEL 1</MenuItem>
                                <MenuItem value="LEVEL_2">LEVEL 2</MenuItem>
                                <MenuItem value="LEVEL_3">LEVEL 3</MenuItem>
                                <MenuItem value="LEVEL_4">LEVEL 4</MenuItem>
                            </TextField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <TextField
                                select
                                fullWidth
                                label="Parent Process"
                                value={form.parentProcessId ?? ""}
                                onChange={handleParentChange}
                            >
                                <MenuItem value="">
                                    None
                                </MenuItem>

                                {processes
                                    .filter(p => p.id !== form.id)
                                    .map(process => (
                                        <MenuItem
                                            key={process.id}
                                            value={process.id}
                                        >
                                            {process.name}
                                        </MenuItem>
                                    ))}
                            </TextField>
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                fullWidth
                                multiline
                                rows={3}
                                label="Documentation"
                                name="documentation"
                                value={form.documentation}
                                onChange={handleChange}
                            />
                        </Grid>

                    </Grid>

                </Box>

            </DialogContent>

            <DialogActions>

                <Button onClick={onClose}>
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleSave}
                    disabled={loading}
                >
                    {loading
                        ? <CircularProgress size={22} />
                        : "Create Process"}
                </Button>

            </DialogActions>

        </Dialog>

    );

}