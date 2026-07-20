import {
    Grid,
    TextField,
    MenuItem,
} from "@mui/material";

import type { Technology } from "../../types/technology";

interface Props {

    formData: Technology;

    onChange: (field: keyof Technology, value: any) => void;

    readOnlyCode?: boolean;

}

const lifecycleStatuses = [
    "ACTIVE",
    "PLANNED",
    "RETIRED",
];

export default function TechnologyForm({

    formData,
    onChange,
    readOnlyCode = false,

}: Props) {

    return (

        <Grid container spacing={2} sx={{ mt: 1 }}>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Code"
                    value={formData.code}
                    disabled={readOnlyCode}
                    onChange={(e) =>
                        onChange("code", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Name"
                    value={formData.name}
                    onChange={(e) =>
                        onChange("name", e.target.value)
                    }
                />

            </Grid>

            <Grid size={12}>

                <TextField
                    fullWidth
                    multiline
                    rows={3}
                    label="Description"
                    value={formData.description ?? ""}
                    onChange={(e) =>
                        onChange("description", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Technology Type"
                    value={formData.technologyType ?? ""}
                    onChange={(e) =>
                        onChange("technologyType", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Vendor"
                    value={formData.vendor ?? ""}
                    onChange={(e) =>
                        onChange("vendor", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Product Name"
                    value={formData.productName ?? ""}
                    onChange={(e) =>
                        onChange("productName", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Version"
                    value={formData.version ?? ""}
                    onChange={(e) =>
                        onChange("version", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Deployment Model"
                    value={formData.deploymentModel ?? ""}
                    onChange={(e) =>
                        onChange("deploymentModel", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Platform"
                    value={formData.platform ?? ""}
                    onChange={(e) =>
                        onChange("platform", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="License Type"
                    value={formData.licenseType ?? ""}
                    onChange={(e) =>
                        onChange("licenseType", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    select
                    fullWidth
                    label="Lifecycle Status"
                    value={formData.lifecycleStatus ?? ""}
                    onChange={(e) =>
                        onChange("lifecycleStatus", e.target.value)
                    }
                >

                    {lifecycleStatuses.map(status => (

                        <MenuItem
                            key={status}
                            value={status}
                        >
                            {status}
                        </MenuItem>

                    ))}

                </TextField>

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Support Status"
                    value={formData.supportStatus ?? ""}
                    onChange={(e) =>
                        onChange("supportStatus", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
                <TextField
                    fullWidth
                    type="date"
                    label="End Of Support"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    value={formData.endOfSupportDate ?? ""}
                    onChange={(e) =>
                        onChange("endOfSupportDate", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    type="date"
                    label="End Of Life"
                    slotProps={{
                        inputLabel: {
                            shrink: true,
                        },
                    }}
                    value={formData.endOfLifeDate ?? ""}
                    onChange={(e) =>
                        onChange("endOfLifeDate", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Owner"
                    value={formData.owner ?? ""}
                    onChange={(e) =>
                        onChange("owner", e.target.value)
                    }
                />

            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>

                <TextField
                    fullWidth
                    label="Support Group"
                    value={formData.supportGroup ?? ""}
                    onChange={(e) =>
                        onChange("supportGroup", e.target.value)
                    }
                />

            </Grid>

            <Grid size={12}>

                <TextField
                    fullWidth
                    label="Website"
                    value={formData.website ?? ""}
                    onChange={(e) =>
                        onChange("website", e.target.value)
                    }
                />

            </Grid>

            <Grid size={12}>

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Documentation"
                    value={formData.documentation ?? ""}
                    onChange={(e) =>
                        onChange("documentation", e.target.value)
                    }
                />

            </Grid>

        </Grid>

    );

}