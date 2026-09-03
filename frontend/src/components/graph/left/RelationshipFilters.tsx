import {
    Checkbox,
    FormControlLabel,
    Typography,
    Box,
    FormGroup,
} from "@mui/material";

interface Props {
    selectedRelationships?: Set<string>;
    onToggleRelationship?: (relationship: string) => void;
}

export default function RelationshipFilters({
    selectedRelationships,
    onToggleRelationship,
}: Props) {

    const relationshipMapping = {
        "Supports": "SUPPORTS",
        "Supported By": "SUPPORTED_BY",

        "Realizes": "REALIZES",
        "Realized By": "REALIZED_BY",

        "Enables": "ENABLES",
        "Enabled By": "ENABLED_BY",

        "Uses": "USES",
        "Used By": "USED_BY",

        "Depends On": "DEPENDS_ON",
        "Required By": "REQUIRED_BY",

        "Hosts": "HOSTS",
        "Hosted On": "HOSTED_ON",

        "Connects To": "CONNECTS_TO",

        "Consumes": "CONSUMES",
        "Provided By": "PROVIDED_BY",

        "Implements": "IMPLEMENTS",
        "Implemented By": "IMPLEMENTED_BY",

        "Owns": "OWNS",
        "Owned By": "OWNED_BY",

        "Manages": "MANAGES",
        "Managed By": "MANAGED_BY",

        "Belongs To": "BELONGS_TO",
        "Contains": "CONTAINS",

        "Associated With": "ASSOCIATED_WITH",
    };

    return (
        <Box>

            <Typography
                variant="subtitle2"
                sx={{ mb: 1 }}
            >
                Relationships
            </Typography>

            <FormGroup>

                {Object.entries(relationshipMapping).map(([label, value]) => (

                    <FormControlLabel
                        key={value}
                        control={
                            <Checkbox
                                checked={
                                    selectedRelationships?.has(value) ?? true
                                }
                                onChange={() =>
                                    onToggleRelationship?.(value)
                                }
                            />
                        }
                        label={label}
                    />

                ))}

            </FormGroup>

        </Box>
    );
}