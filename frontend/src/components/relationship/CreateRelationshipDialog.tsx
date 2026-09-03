import { useState, useEffect } from "react";

import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    Stack,
    Typography,
} from "@mui/material";

import { useArtifacts } from "../../hooks/useArtifacts";
import { useCapabilityNodes } from "../../hooks/useCapabilityNodes";
import { capabilityNodeService } from "../../services/capabilityNodeService";

import { relationshipService } from "../../services/relationshipService";

import type { CapabilityNode } from "../../types/capabilityNode";

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
    const { nodes: capabilityNodes } = useCapabilityNodes() as { nodes: any[] };

    const [targetArtifactId, setTargetArtifactId] = useState<number>();

    const [relationshipType, setRelationshipType] = useState("");

    const [description, setDescription] = useState("");

    const [lastLevelChildren, setLastLevelChildren] = useState<CapabilityNode[]>([]);

    const [loadingChildren, setLoadingChildren] = useState(false);

    // Find the last level children (artifacts) when source is a capability
    useEffect(() => {
        const findLastLevelChildren = async () => {
            if (!open) return;

            const sourceArtifact = artifacts.find(a => a.id === sourceArtifactId);
            if (!sourceArtifact || sourceArtifact.artifactType !== "CAPABILITY") {
                setLastLevelChildren([]);
                return;
            }

            setLoadingChildren(true);
            try {
                // Find the capability node matching the source artifact
                const matchingNode = capabilityNodes.find(node => node.code === sourceArtifact.code);
                if (!matchingNode) {
                    setLastLevelChildren([]);
                    return;
                }

                // Recursively find all last-level children (those with no children)
                const findDeepestChildren = async (nodeId: number): Promise<CapabilityNode[]> => {
                    const children = await capabilityNodeService.getChildren(nodeId);
                    if (children.length === 0) {
                        // This is a last-level node (artifact)
                        const nodeDetails = await capabilityNodeService.getById(nodeId);
                        return [nodeDetails];
                    }

                    // Recursively find deepest children
                    const allDeepest: CapabilityNode[] = [];
                    for (const child of children) {
                        const deepest = await findDeepestChildren(child.id);
                        allDeepest.push(...deepest);
                    }
                    return allDeepest;
                };

                const deepestChildren = await findDeepestChildren(matchingNode.id);
                setLastLevelChildren(deepestChildren);

                // Auto-select the first last-level child if available
                if (deepestChildren.length > 0) {
                    const firstChildArtifact = artifacts.find(a => a.code === deepestChildren[0].code);
                    if (firstChildArtifact) {
                        setTargetArtifactId(firstChildArtifact.id);
                    }
                }
            } catch (error) {
                console.error("Error finding last-level children:", error);
                setLastLevelChildren([]);
            } finally {
                setLoadingChildren(false);
            }
        };

        findLastLevelChildren();
    }, [open, sourceArtifactId, artifacts, capabilityNodes]);

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

    // Get source artifact to check if it's a capability
    const sourceArtifact = artifacts.find(a => a.id === sourceArtifactId);
    const isSourceCapability = sourceArtifact?.artifactType === "CAPABILITY";

    // Filter artifacts based on whether source is capability
    const getFilteredArtifacts = () => {
        const allFiltered = artifacts.filter(a => a.id !== sourceArtifactId);
        
        if (isSourceCapability && lastLevelChildren.length > 0) {
            // Prioritize last-level children (artifacts)
            const lastLevelArtifacts = allFiltered.filter(a => 
                lastLevelChildren.some(child => child.code === a.code)
            );
            
            // Put last-level artifacts first, then others
            return [...lastLevelArtifacts, ...allFiltered.filter(a => 
                !lastLevelChildren.some(child => child.code === a.code)
            )];
        }
        
        return allFiltered;
    };

    const filteredArtifacts = getFilteredArtifacts();

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

                    {isSourceCapability && (
                        <Typography variant="caption" color="text.secondary">
                            {loadingChildren ? "Loading last-level capabilities..." : 
                             lastLevelChildren.length > 0 
                                ? `Relations connect to last-level capabilities (artifacts). Found ${lastLevelChildren.length} artifact(s).`
                                : "No last-level capabilities found for this capability."}
                        </Typography>
                    )}

                    <TextField
                        select
                        label="Target Artifact"
                        value={targetArtifactId ?? ""}
                        onChange={(e) =>
                            setTargetArtifactId(Number(e.target.value))
                        }
                        fullWidth
                        disabled={loadingChildren}
                    >

                        {filteredArtifacts.map(a => {
                            const isLastLevel = lastLevelChildren.some(child => child.code === a.code);
                            return (
                                <MenuItem
                                    key={a.id}
                                    value={a.id}
                                    sx={{
                                        bgcolor: isLastLevel ? "rgba(76, 175, 80, 0.08)" : "inherit",
                                        fontWeight: isLastLevel ? 600 : 400,
                                    }}
                                >
                                    {a.code} - {a.name} ({a.artifactType})
                                    {isLastLevel && " ★"}
                                </MenuItem>
                            );
                        })}

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
                    disabled={loadingChildren}
                >
                    Create
                </Button>

            </DialogActions>

        </Dialog>

    );

}