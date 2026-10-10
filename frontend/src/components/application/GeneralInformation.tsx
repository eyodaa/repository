import {
    Paper,
    Typography,
    Grid,
    Chip,
    Box,
    IconButton,
    Button,
    TextField,
    MenuItem,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useState } from "react";
import type { Application } from "../../types/application";
import { toast } from "react-toastify";

interface GeneralInformationProps {
    application: Application;
    onUpdate?: (application: Application) => Promise<void>;
}

export default function GeneralInformation({ application, onUpdate }: GeneralInformationProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState<Application>(application);
    const [isSaving, setIsSaving] = useState(false);

    const handleEdit = () => {
        setFormData(application);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData(application);
    };

    const handleChange = (field: keyof Application) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [field]: event.target.value });
    };

    const handleSave = async () => {
        if (!onUpdate) return;
        setIsSaving(true);
        try {
            await onUpdate(formData);
            setIsEditing(false);
            toast.success("General Information updated successfully");
        } catch (error) {
            toast.error("Failed to update General Information");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">General Information</Typography>
                {onUpdate && !isEditing && (
                    <IconButton onClick={handleEdit} size="small" color="primary">
                        <EditIcon />
                    </IconButton>
                )}
                {isEditing && (
                    <Box>
                        <Button
                            startIcon={<CancelIcon />}
                            onClick={handleCancel}
                            disabled={isSaving}
                            sx={{ mr: 1 }}
                        >
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<SaveIcon />}
                            onClick={handleSave}
                            disabled={isSaving}
                        >
                            Save
                        </Button>
                    </Box>
                )}
            </Box>

            <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Application Code</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.code || ""}
                            // Material UI v5+ read-only property
                            slotProps={{
                                input: {
                                    readOnly: true,
                                },
                            }}
                        // If using an older MUI version, use:
                        // InputProps={{ readOnly: true }}
                        />
                    ) : (
                        <Typography>{application.code || "N/A"}</Typography>
                    )}
                </Grid>


                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Technical Owner</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.technicalOwner || ""}
                            onChange={handleChange('technicalOwner')}
                        />
                    ) : (
                        <Typography>{application.technicalOwner || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Vendor</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.vendor || ""}
                            onChange={handleChange('vendor')}
                        />
                    ) : (
                        <Typography>{application.vendor || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Version</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.version || ""}
                            onChange={handleChange('version')}
                        />
                    ) : (
                        <Typography>{application.version || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Lifecycle</Typography>
                    {isEditing ? (
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={formData.lifecycleStatus || ""}
                            onChange={handleChange('lifecycleStatus')}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                            <MenuItem value="Retired">Retired</MenuItem>
                            <MenuItem value="Development">Development</MenuItem>
                        </TextField>
                    ) : (
                        <Chip
                            label={application.lifecycleStatus || "Unknown"}
                            color={application.lifecycleStatus === 'Active' ? 'success' : 'default'}
                        />
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Criticality</Typography>
                    {isEditing ? (
                        <TextField
                            select
                            fullWidth
                            size="small"
                            value={formData.businessCriticality || ""}
                            onChange={handleChange('businessCriticality')}
                        >
                            <MenuItem value="High">High</MenuItem>
                            <MenuItem value="Medium">Medium</MenuItem>
                            <MenuItem value="Low">Low</MenuItem>
                        </TextField>
                    ) : (
                        <Chip
                            label={application.businessCriticality || "Unknown"}
                            color={application.businessCriticality === 'High' ? 'error' : 'default'}
                        />
                    )}
                </Grid>
            </Grid>
        </Paper>
    );
}