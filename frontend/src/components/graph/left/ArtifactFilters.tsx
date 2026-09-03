
import {
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    FormGroup
} from "@mui/material";

interface Props {
    selectedTypes?: Set<string>;
    onToggleType?: (type: string) => void;
}

export default function ArtifactFilters({ selectedTypes, onToggleType }: Props) {
    const typeMapping = {
        "Applications": "APPLICATION",
        "Technologies": "TECHNOLOGY",
        "Capabilities": "CAPABILITY",
        "Processes": "PROCESS",
    };

    const handleChange = (type: string) => {
        if (onToggleType) {
            onToggleType(typeMapping[type as keyof typeof typeMapping]);
        }
    };

    return (
        <Box>
            <Typography variant="subtitle2" sx={{ mb: 1 }}>
                Artifact Types
            </Typography>

            <FormGroup>
                {Object.keys(typeMapping).map((displayName) => {
                    const typeValue = typeMapping[displayName as keyof typeof typeMapping];
                    return (
                        <FormControlLabel
                            key={displayName}
                            control={
                                <Checkbox
                                    checked={selectedTypes?.has(typeValue) ?? true}
                                    onChange={() => handleChange(displayName)}
                                />
                            }
                            label={displayName}
                        />
                    );
                })}
            </FormGroup>
        </Box>
    );
}