import {
    Paper,
    Typography,
    Grid,
    Chip,
    Box,
    IconButton,
    Button,
    TextField,
} from "@mui/material";
import { Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from "@mui/icons-material";
import { useState } from "react";
import type { Application } from "../../types/application";
import { toast } from "react-toastify";

interface BusinessInformationProps {
    application: Application;
    onUpdate?: (application: Application) => Promise<void>;
}

export default function BusinessInformation({ application, onUpdate }: BusinessInformationProps) {
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
            toast.success("Business Information updated successfully");
        } catch (error) {
            toast.error("Failed to update Business Information");
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Paper sx={{ p: 3, borderRadius: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6">Business Information</Typography>
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
                    <Typography color="text.secondary">Business Owner</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.businessOwner || ""}
                            onChange={handleChange('businessOwner')}
                        />
                    ) : (
                        <Typography>{application.businessOwner || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Support Group</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.supportGroup || ""}
                            onChange={handleChange('supportGroup')}
                        />
                    ) : (
                        <Typography>{application.supportGroup || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Function</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.function || ""}
                            onChange={handleChange('function')}
                        />
                    ) : (
                        <Typography>{application.function || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                    <Typography color="text.secondary">Environment</Typography>
                    {isEditing ? (
                        <TextField
                            fullWidth
                            size="small"
                            value={formData.environment || ""}
                            onChange={handleChange('environment')}
                        />
                    ) : (
                        <Typography>{application.environment || "N/A"}</Typography>
                    )}
                </Grid>

                <Grid size={{ xs: 12 }}>
                    <Typography variant="h6" sx={{ mb: 3, mt: 2 }}>
                        Supported Capabilities
                    </Typography>
                    <Chip label="Core Banking" sx={{ mr: 1, mb: 1 }} />
                    <Chip label="Customer Management" sx={{ mr: 1, mb: 1 }} />
                </Grid>
            </Grid>
        </Paper>
    );
}