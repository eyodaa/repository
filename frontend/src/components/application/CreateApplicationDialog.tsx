import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Grid,
    TextField,
    MenuItem,
    Stack,
} from "@mui/material";

import { applicationService } from "../../services/applicationService";

interface Props {

    open: boolean;

    onClose: () => void;

    onCreated: () => void;

}

const criticalities = [
    "HIGH",
    "MEDIUM",
    "LOW",
];

const lifecycleStatuses = [
    "ACTIVE",
    "PLANNED",
    "RETIRED",
];

export default function CreateApplicationDialog({

    open,

    onClose,

    onCreated,

}: Props) {

    const [formData, setFormData] = useState({

        code: "",

        name: "",

        description: "",

        vendor: "",

        version: "",

        businessCriticality: "MEDIUM",

        lifecycleStatus: "ACTIVE",

    });

    const [saving, setSaving] = useState(false);

    function change(field: string, value: string) {

        setFormData(prev => ({

            ...prev,

            [field]: value,

        }));

    }

    async function handleCreate() {

        if (!formData.code || !formData.name) return;

        setSaving(true);

        try {

            await applicationService.create({

                ...formData,

                artifactType: "APPLICATION",

            });

            onCreated();

            onClose();

            setFormData({

                code: "",

                name: "",

                description: "",

                vendor: "",

                version: "",

                businessCriticality: "MEDIUM",

                lifecycleStatus: "ACTIVE",

            });

        } finally {

            setSaving(false);

        }

    }

    return (

        <Dialog
            open={open}
            onClose={onClose}
            fullWidth
            maxWidth="md"
        >

            <DialogTitle>

                Create Application

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} sx={{ mt: 1 }}>

                    <Grid container spacing={2}>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                label="Code"
                                fullWidth
                                value={formData.code}
                                onChange={(e) =>
                                    change("code", e.target.value)
                                }
                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                label="Application Name"
                                fullWidth
                                value={formData.name}
                                onChange={(e) =>
                                    change("name", e.target.value)
                                }
                            />

                        </Grid>

                        <Grid size={12}>

                            <TextField
                                label="Description"
                                fullWidth
                                multiline
                                rows={3}
                                value={formData.description}
                                onChange={(e) =>
                                    change("description", e.target.value)
                                }
                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                label="Vendor"
                                fullWidth
                                value={formData.vendor}
                                onChange={(e) =>
                                    change("vendor", e.target.value)
                                }
                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                label="Version"
                                fullWidth
                                value={formData.version}
                                onChange={(e) =>
                                    change("version", e.target.value)
                                }
                            />

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                select
                                label="Business Criticality"
                                fullWidth
                                value={formData.businessCriticality}
                                onChange={(e) =>
                                    change(
                                        "businessCriticality",
                                        e.target.value
                                    )
                                }
                            >

                                {criticalities.map(item => (

                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >

                                        {item}

                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <TextField
                                select
                                label="Lifecycle Status"
                                fullWidth
                                value={formData.lifecycleStatus}
                                onChange={(e) =>
                                    change(
                                        "lifecycleStatus",
                                        e.target.value
                                    )
                                }
                            >

                                {lifecycleStatuses.map(item => (

                                    <MenuItem
                                        key={item}
                                        value={item}
                                    >

                                        {item}

                                    </MenuItem>

                                ))}

                            </TextField>

                        </Grid>

                    </Grid>

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Cancel
                </Button>

                <Button
                    variant="contained"
                    onClick={handleCreate}
                    disabled={saving}
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );

}