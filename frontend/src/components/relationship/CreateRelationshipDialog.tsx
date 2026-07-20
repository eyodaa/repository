import { useState } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
} from "@mui/material";

import { useArtifacts } from "../../hooks/useArtifacts";

import { relationshipService } from "../../services/relationshipService";

const relationshipTypes = [

    "SUPPORTS",
    "SUPPORTED_BY",

    "REALIZES",
    "REALIZED_BY",

    "ENABLES",
    "ENABLED_BY",

    "USES",
    "USED_BY",

    "DEPENDS_ON",
    "REQUIRED_BY",

    "HOSTS",
    "HOSTED_ON",

    "CONNECTS_TO",
    "CONNECTED_TO",

    "CONSUMES",
    "PROVIDED_BY",

    "IMPLEMENTS",
    "IMPLEMENTED_BY",

    "OWNS",
    "OWNED_BY",

    "MANAGES",
    "MANAGED_BY",

    "BELONGS_TO",
    "CONTAINS",

    "ASSOCIATED_WITH"

];

interface Props {

    open: boolean;

    sourceArtifactId: number;

    onClose: () => void;

    onCreated: () => void;

}

export default function CreateRelationshipDialog({

    open,

    sourceArtifactId,

    onClose,

    onCreated,

}: Props) {

    const { artifacts } = useArtifacts();

    const [targetArtifactId, setTargetArtifactId] = useState<number>();

    const [relationshipType, setRelationshipType] = useState("");

    const [description, setDescription] = useState("");

    const handleSave = async () => {

        if (!targetArtifactId || !relationshipType) return;

        await relationshipService.create({

            sourceArtifactId,

            targetArtifactId,

            relationshipType,

            description,

        });

        onCreated();

        onClose();

    };

    return (

        <Dialog
            open={open}
            fullWidth
            maxWidth="sm"
        >

            <DialogTitle>

                Create Relationship

            </DialogTitle>

            <DialogContent>

                <Stack spacing={3} sx={{ mt: 1 }}>

                    <TextField
                        select
                        label="Target Artifact"
                        value={targetArtifactId ?? ""}
                        onChange={(e) =>
                            setTargetArtifactId(Number(e.target.value))
                        }
                        fullWidth
                    >

                        {artifacts
                            .filter(a => a.id !== sourceArtifactId)
                            .map(a => (

                                <MenuItem
                                    key={a.id}
                                    value={a.id}
                                >

                                    {a.code} - {a.name} ({a.artifactType})

                                </MenuItem>

                            ))}

                    </TextField>

                    <TextField
                        select
                        label="Relationship Type"
                        value={relationshipType}
                        onChange={(e) =>
                            setRelationshipType(e.target.value)
                        }
                        fullWidth
                    >

                        {relationshipTypes.map(type => (

                            <MenuItem
                                key={type}
                                value={type}
                            >

                                {type}

                            </MenuItem>

                        ))}

                    </TextField>

                    <TextField
                        label="Description"
                        value={description}
                        onChange={(e) =>
                            setDescription(e.target.value)
                        }
                        multiline
                        rows={3}
                    />

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
                    onClick={handleSave}
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );

}