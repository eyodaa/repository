import {
    Alert,
    Box,
    Breadcrumbs,
    CircularProgress,
    Link,
    Paper,
    Typography,
    Chip,
    Tooltip,
    IconButton,
} from "@mui/material";

import {
    AccountTree as TreeIcon,
    Link as LinkIcon,
    Circle as CircleIcon,
    ArrowForward as ArrowIcon,
    OpenInNew as OpenInNewIcon,
    Add as AddIcon,
} from "@mui/icons-material";

import { useEffect, useState, useCallback } from "react";

import { useParams } from "react-router-dom";

import { capabilityNodeService } from "../../services/capabilityNodeService";
import { relationshipService } from "../../services/relationshipService";

import type { CapabilityNode } from "../../types/capabilityNode";
import type { RelationshipResponse } from "../../types/relationship";

import CapabilityHierarchyGraph from "../../components/capability/CapabilityHierarchyGraph";
import CreateRelationshipDialog from "../../components/relationship/CreateRelationshipDialog";
import LeafRelationshipTable from "../../components/capability/LeafRelationshipTable";

// A tree node that carries children + relationships for leaf nodes
interface HierarchyNode {
    node: CapabilityNode;
    children: HierarchyNode[];
    isLeaf: boolean;
    relationships: RelationshipResponse[];
    loadingRelationships: boolean;
}

export default function CapabilityDetailsPage() {

    const { id } = useParams();

    const [node, setNode] =
        useState<CapabilityNode | null>(null);

    const [hierarchyTree, setHierarchyTree] =
        useState<HierarchyNode[]>([]);

    const [rootRelationships, setRootRelationships] =
        useState<RelationshipResponse[]>([]);

    const [selectedLeafRelationships, setSelectedLeafRelationships] =
        useState<RelationshipResponse[]>([]);

    const [loadingSelectedRelationships, setLoadingSelectedRelationships] =
        useState(false);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    const [relationshipDialogOpen, setRelationshipDialogOpen] = useState(false);
    const [selectedLeafNodeId, setSelectedLeafNodeId] = useState<number | null>(null);
    const [selectedLeafNode, setSelectedLeafNode] = useState<CapabilityNode | null>(null);

    useEffect(() => {

        loadNode();

    }, [id]);

    // Recursively build the full hierarchy tree
    const buildTreeRecursive = useCallback(async (parentId: number): Promise<HierarchyNode[]> => {
        try {
            const children = await capabilityNodeService.getChildren(parentId);

            if (children.length === 0) {
                return [];
            }

            const treeNodes: HierarchyNode[] = [];

            for (const child of children) {
                const subChildren = await buildTreeRecursive(child.id);
                const isLeaf = subChildren.length === 0;

                const treeNode: HierarchyNode = {
                    node: child,
                    children: subChildren,
                    isLeaf,
                    relationships: [],
                    loadingRelationships: false,
                };

                treeNodes.push(treeNode);
            }

            return treeNodes;
        } catch (err) {
            console.error("Error building tree:", err);
            return [];
        }
    }, []);

    // Load relationships for all leaf nodes in the tree
    const loadLeafRelationships = useCallback(async (tree: HierarchyNode[]): Promise<HierarchyNode[]> => {
        const updatedTree: HierarchyNode[] = [];

        for (const treeNode of tree) {
            if (treeNode.isLeaf) {
                // Leaf node - try loading relationships by artifact ID
                try {
                    const rels = await relationshipService.getByArtifactId(treeNode.node.id);
                    updatedTree.push({
                        ...treeNode,
                        relationships: rels,
                        loadingRelationships: false,
                    });
                } catch {
                    updatedTree.push({
                        ...treeNode,
                        relationships: [],
                        loadingRelationships: false,
                    });
                }
            } else {
                // Non-leaf - recurse into children
                const updatedChildren = await loadLeafRelationships(treeNode.children);
                updatedTree.push({
                    ...treeNode,
                    children: updatedChildren,
                });
            }
        }

        return updatedTree;
    }, []);

    // Handle opening relationship dialog for a leaf node
    const handleOpenRelationshipDialog = (leafNodeId: number, leafNode: CapabilityNode) => {
        setSelectedLeafNodeId(leafNodeId);
        setSelectedLeafNode(leafNode);
        setRelationshipDialogOpen(true);
    };

    // Load relationships for the selected leaf node when its ID changes
    useEffect(() => {
        if (selectedLeafNodeId) {
            loadSelectedRelationships(selectedLeafNodeId);
        } else {
            setSelectedLeafRelationships([]);
        }
    }, [selectedLeafNodeId]);

    async function loadSelectedRelationships(nodeId: number) {
        setLoadingSelectedRelationships(true);
        try {
            const rels = await relationshipService.getByArtifactId(nodeId);
            setSelectedLeafRelationships(rels);
        } catch (err) {
            console.error("Error loading selected leaf relationships:", err);
            setSelectedLeafRelationships([]);
        } finally {
            setLoadingSelectedRelationships(false);
        }
    }

    // Handle relationship deletion
    const handleDeleteRelationship = async (relationshipId: number) => {
        try {
            await relationshipService.delete(relationshipId);
            // Reload the node hierarchy and graph
            loadNode();
            // Reload the current selected leaf node relationships
            if (selectedLeafNodeId) {
                loadSelectedRelationships(selectedLeafNodeId);
            }
        } catch (err) {
            console.error("Error deleting relationship:", err);
        }
    };

    // Handle relationship created
    const handleRelationshipCreated = () => {
        // Reload the hierarchy to update relationships
        loadNode();
        if (selectedLeafNodeId) {
            loadSelectedRelationships(selectedLeafNodeId);
        }
    };

    // Helper to check if a node has children in the hierarchy tree
    const hasChildren = (nodeId: number, tree: HierarchyNode[]): boolean => {
        for (const treeNode of tree) {
            if (treeNode.node.id === nodeId) {
                return treeNode.children.length > 0;
            }
            if (treeNode.children && treeNode.children.length > 0) {
                const found = hasChildren(nodeId, treeNode.children);
                if (found) return true;
            }
        }
        return false;
    };

    // Handle node click in graph
    const handleNodeClick = (clickedNode: CapabilityNode) => {
        const isRoot = clickedNode.id === node?.id;
        const isLeaf = isRoot 
            ? hierarchyTree.length === 0 
            : (clickedNode.level === 3 || !hasChildren(clickedNode.id, hierarchyTree));

        if (isLeaf) {
            setSelectedLeafNodeId(clickedNode.id);
            setSelectedLeafNode(clickedNode);
            setTimeout(() => {
                const element = document.getElementById("leaf-relationship-section");
                if (element) {
                    element.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }, 100);
        } else {
            if (!isRoot) {
                window.location.href = `/capabilities/${clickedNode.id}`;
            }
        }
    };

    async function loadNode() {

        if (!id) {
            setError("Invalid capability identifier.");
            setLoading(false);
            return;
        }

        try {

            setLoading(true);

            let data: CapabilityNode;

            if (!isNaN(Number(id))) {
                data = await capabilityNodeService.getById(Number(id));
            } else {
                data = await capabilityNodeService.getByCode(id);
            }

            setNode(data);

            if (data) {
                // Build the full recursive hierarchy tree
                const tree = await buildTreeRecursive(data.id);

                // Load relationships for leaf nodes
                const treeWithRelationships = await loadLeafRelationships(tree);

                setHierarchyTree(treeWithRelationships);

                // Determine if root node is a leaf
                const isLeaf = treeWithRelationships.length === 0;
                let rootRels: RelationshipResponse[] = [];
                if (isLeaf) {
                    try {
                        rootRels = await relationshipService.getByArtifactId(data.id);
                    } catch (err) {
                        console.error("Error loading root relationships:", err);
                    }
                    setSelectedLeafNodeId(data.id);
                    setSelectedLeafNode(data);
                } else {
                    // Reset selected leaf node if navigating to a non-leaf capability details page
                    setSelectedLeafNodeId(null);
                    setSelectedLeafNode(null);
                }
                setRootRelationships(rootRels);
            }

            setError("");

        }

        catch (err) {

            console.error(err);

            setError("Unable to load capability.");

        }

        finally {

            setLoading(false);

        }

    }

    // Build hierarchy chain from root to current node
    const buildBreadcrumbHierarchy = (currentNode: CapabilityNode | null): CapabilityNode[] => {
        const hierarchy: CapabilityNode[] = [];
        let n = currentNode;

        while (n) {
            hierarchy.unshift(n);
            n = n.parent || null;
        }

        return hierarchy;
    };

    if (loading) {

        return (

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    mt: 10,
                    gap: 2,
                }}
            >
                <CircularProgress size={40} sx={{ color: "#3B82F6" }} />
                <Typography color="#94A3B8" variant="body2">
                    Loading capability hierarchy...
                </Typography>
            </Box>

        );

    }

    if (error || !node) {

        return (

            <Alert severity="error">

                {error}

            </Alert>

        );

    }

    const breadcrumbHierarchy = buildBreadcrumbHierarchy(node);

    return (

        <Box sx={{ p: 4 }}>

            <Breadcrumbs sx={{ mb: 3 }}>

                <Link
                    underline="hover"
                    href="/capabilities"
                >

                    Capabilities

                </Link>

                {breadcrumbHierarchy.map((hNode, index) => (
                    index < breadcrumbHierarchy.length - 1 ? (
                        <Link
                            key={hNode.id}
                            underline="hover"
                            href={`/capabilities/${hNode.id}`}
                            sx={{ color: "#94A3B8" }}
                        >
                            {hNode.name}
                        </Link>
                    ) : (
                        <Typography key={hNode.id}>
                            {hNode.name}
                        </Typography>
                    )
                ))}

            </Breadcrumbs>

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: .5,
                }}
            >

                {node.name}

            </Typography>

            <Typography
                color="text.secondary"
                sx={{ mb: 4 }}
            >

                Enterprise Business Capability - Level {node.level}

            </Typography>

            <Box

                sx={{

                    display: "grid",

                    gridTemplateColumns: "1fr 1fr",

                    gap: 3,

                    mb: 3,

                }}

            >

                {/* Capability General Information */}
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >

                        Capability Information

                    </Typography>

                    <Typography>

                        <b>Code:</b> {node.code}

                    </Typography>

                    <Typography>

                        <b>Name:</b> {node.name}

                    </Typography>

                    <Typography>

                        <b>Level:</b> {node.level}

                    </Typography>

                    <Typography sx={{ mt: 2 }}>

                        {node.description}

                    </Typography>

                    <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <Chip
                            label={`Current Maturity: ${node.currentMaturity}`}
                            color="primary"
                            size="small"
                        />
                        <Chip
                            label={`Target Maturity: ${node.targetMaturity}`}
                            color="success"
                            size="small"
                        />
                    </Box>

                </Paper>

                {/* Hierarchy from root to current */}
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                    }}
                >

                    <Typography
                        variant="h6"
                        sx={{ mb: 2 }}
                    >

                        Ancestry Path

                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                        {breadcrumbHierarchy.map((hNode, index) => (
                            <Box key={hNode.id} sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Typography variant="caption" sx={{ color: "#94a3b8", minWidth: 20 }}>
                                    L{hNode.level}
                                </Typography>
                                <Chip
                                    label={hNode.name}
                                    size="small"
                                    color={index === breadcrumbHierarchy.length - 1 ? "primary" : "default"}
                                    sx={{
                                        fontWeight: index === breadcrumbHierarchy.length - 1 ? 600 : 400,
                                        flex: 1
                                    }}
                                />
                                {index < breadcrumbHierarchy.length - 1 && (
                                    <Typography sx={{ color: "#94a3b8" }}>↓</Typography>
                                )}
                            </Box>
                        ))}
                    </Box>

                </Paper>

            </Box>

            {/* Capability Hierarchy Graph */}
            <Paper
                sx={{
                    p: 3,
                    borderRadius: 3,
                    mb: 3,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 3 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <TreeIcon sx={{ color: "#3B82F6" }} />
                        <Typography variant="h6">
                            Capability Hierarchy Graph
                        </Typography>
                    </Box>
                    <Typography variant="caption" color="text.secondary">
                        Click on nodes to navigate • Leaf nodes (green) connect to artifacts
                    </Typography>
                </Box>

                <CapabilityHierarchyGraph
                    rootNode={node}
                    hierarchyTree={hierarchyTree}
                    rootRelationships={rootRelationships}
                    onNodeClick={handleNodeClick}
                />
            </Paper>

            {/* Full Hierarchy Tree of Children */}
            {hierarchyTree.length > 0 && (
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        mb: 3,
                    }}
                >
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 3 }}>
                        <TreeIcon sx={{ color: "#3B82F6" }} />
                        <Typography variant="h6">
                            Children Hierarchy
                        </Typography>
                        <Chip
                            label={`${countNodes(hierarchyTree)} total`}
                            size="small"
                            sx={{ ml: 1, bgcolor: "rgba(59,130,246,0.15)", color: "#3B82F6" }}
                        />
                    </Box>

                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        Full tree of sub-capabilities. Leaf nodes (●) connect with other artifacts through relationships.
                    </Typography>

                    <Box sx={{ pl: 1 }}>
                        {hierarchyTree.map((treeNode, index) => (
                            <HierarchyTreeNode
                                key={treeNode.node.id}
                                treeNode={treeNode}
                                depth={0}
                                isLast={index === hierarchyTree.length - 1}
                                onAddRelationship={(nodeId) => handleOpenRelationshipDialog(nodeId, treeNode.node)}
                            />
                        ))}
                    </Box>
                </Paper>
            )}

            {hierarchyTree.length === 0 && (
                <Paper
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        mb: 3,
                        textAlign: "center",
                    }}
                >
                    <CircleIcon sx={{ color: "#22C55E", fontSize: 16, mr: 1, verticalAlign: "middle" }} />
                    <Typography variant="body2" color="text.secondary" component="span">
                        This is a leaf capability — no further sub-capabilities exist.
                    </Typography>
                </Paper>
            )}

            {/* Relationship Dialog */}
            {selectedLeafNodeId && (
                <CreateRelationshipDialog
                    open={relationshipDialogOpen}
                    sourceArtifactId={selectedLeafNodeId}
                    onClose={() => setRelationshipDialogOpen(false)}
                    onCreated={handleRelationshipCreated}
                />
            )}

            {/* Relationship Table for Selected Leaf Node */}
            {selectedLeafNode && (
                <Paper
                    id="leaf-relationship-section"
                    sx={{
                        p: 3,
                        borderRadius: 3,
                        mb: 3,
                    }}
                >
                    <LeafRelationshipTable
                        relationships={selectedLeafRelationships}
                        leafNodeId={selectedLeafNode.id}
                        leafNodeName={selectedLeafNode.name}
                        onAddRelationship={() => handleOpenRelationshipDialog(selectedLeafNode.id, selectedLeafNode)}
                        onDeleteRelationship={handleDeleteRelationship}
                    />
                </Paper>
            )}

        </Box>

    );

}

// Helper to count all nodes in the tree
function countNodes(tree: HierarchyNode[]): number {
    let count = 0;
    for (const node of tree) {
        count += 1;
        count += countNodes(node.children);
    }
    return count;
}

// Recursive tree node component
function HierarchyTreeNode({
    treeNode,
    depth,
    isLast,
    onAddRelationship,
}: {
    treeNode: HierarchyNode;
    depth: number;
    isLast: boolean;
    onAddRelationship?: (nodeId: number, node: CapabilityNode) => void;
}) {
    const { node, children, isLeaf, relationships } = treeNode;

    const connectorColor = "#334155";

    // Color coding by depth
    const depthColors = ["#3B82F6", "#8B5CF6", "#06B6D4", "#10B981", "#F59E0B", "#EF4444"];
    const nodeColor = depthColors[depth % depthColors.length];

    return (
        <Box sx={{ position: "relative" }}>
            {/* Vertical connector line from parent */}
            {depth > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        left: -16,
                        top: 0,
                        bottom: isLast ? "50%" : 0,
                        width: "1px",
                        bgcolor: connectorColor,
                    }}
                />
            )}

            {/* Horizontal connector line */}
            {depth > 0 && (
                <Box
                    sx={{
                        position: "absolute",
                        left: -16,
                        top: "20px",
                        width: "16px",
                        height: "1px",
                        bgcolor: connectorColor,
                    }}
                />
            )}

            {/* Node content */}
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    mb: children.length > 0 ? 0 : 1,
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1.5,
                        py: 1,
                        px: 2,
                        borderRadius: 2,
                        border: `1px solid ${isLeaf ? "rgba(34,197,94,0.3)" : "transparent"}`,
                        bgcolor: isLeaf ? "rgba(34,197,94,0.05)" : "transparent",
                        transition: "all 0.2s ease",
                        "&:hover": {
                            bgcolor: isLeaf ? "rgba(34,197,94,0.1)" : "rgba(59,130,246,0.05)",
                        },
                    }}
                >
                    {/* Node indicator */}
                    <CircleIcon
                        sx={{
                            fontSize: isLeaf ? 10 : 8,
                            color: isLeaf ? "#22C55E" : nodeColor,
                            flexShrink: 0,
                        }}
                    />

                    {/* Node info */}
                    <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography
                                variant="body2"
                                sx={{
                                    fontWeight: isLeaf ? 600 : 500,
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {node.name}
                            </Typography>
                            <Typography
                                variant="caption"
                                sx={{ color: "#64748B", flexShrink: 0 }}
                            >
                                {node.code}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Level badge */}
                    <Chip
                        label={`L${node.level}`}
                        size="small"
                        sx={{
                            height: 20,
                            fontSize: "0.7rem",
                            bgcolor: `${nodeColor}20`,
                            color: nodeColor,
                            fontWeight: 600,
                            flexShrink: 0,
                        }}
                    />

                    {/* Maturity info */}
                    <Tooltip title={`Maturity: ${node.currentMaturity} → ${node.targetMaturity}`}>
                        <Chip
                            label={`${node.currentMaturity}/${node.targetMaturity}`}
                            size="small"
                            sx={{
                                height: 20,
                                fontSize: "0.7rem",
                                bgcolor: "rgba(245,158,11,0.15)",
                                color: "#F59E0B",
                                flexShrink: 0,
                            }}
                        />
                    </Tooltip>

                    {/* Leaf indicator */}
                    {isLeaf && (
                        <Tooltip title="Leaf node — connects with artifacts">
                            <LinkIcon sx={{ fontSize: 16, color: "#22C55E", flexShrink: 0 }} />
                        </Tooltip>
                    )}

                    {/* Add relationship button for leaf nodes */}
                    {isLeaf && (
                        <Tooltip title="Add relationship">
                            <IconButton
                                size="small"
                                onClick={() => onAddRelationship?.(node.id, node)}
                                sx={{ p: 0.25, color: "#64748B", "&:hover": { color: "#22C55E" } }}
                            >
                                <AddIcon sx={{ fontSize: 14 }} />
                            </IconButton>
                        </Tooltip>
                    )}

                    {/* Navigate to this child's detail */}
                    <Tooltip title="View details">
                        <IconButton
                            size="small"
                            href={`/capabilities/${node.id}`}
                            sx={{ p: 0.25, color: "#64748B", "&:hover": { color: "#3B82F6" } }}
                        >
                            <OpenInNewIcon sx={{ fontSize: 14 }} />
                        </IconButton>
                    </Tooltip>
                </Box>

                {/* Relationships for leaf nodes */}
                {isLeaf && relationships.length > 0 && (
                    <Box
                        sx={{
                            ml: 4,
                            mt: 0.5,
                            mb: 1,
                            pl: 2,
                            borderLeft: "2px solid rgba(245,158,11,0.3)",
                        }}
                    >
                        <Typography
                            variant="caption"
                            sx={{
                                color: "#F59E0B",
                                fontWeight: 600,
                                display: "flex",
                                alignItems: "center",
                                gap: 0.5,
                                mb: 0.5,
                            }}
                        >
                            <LinkIcon sx={{ fontSize: 12 }} />
                            Relationships ({relationships.length})
                        </Typography>
                        {relationships.map((rel) => {
                            // Show the "other" artifact in the relationship
                            const isSource = rel.sourceArtifact.id === node.id;
                            const otherArtifact = isSource ? rel.targetArtifact : rel.sourceArtifact;
                            const direction = isSource ? "→" : "←";

                            return (
                                <Box
                                    key={rel.id}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1,
                                        py: 0.25,
                                    }}
                                >
                                    <ArrowIcon
                                        sx={{
                                            fontSize: 12,
                                            color: "#F59E0B",
                                            transform: isSource ? "none" : "rotate(180deg)",
                                        }}
                                    />
                                    <Chip
                                        label={rel.relationshipType.replace(/_/g, " ")}
                                        size="small"
                                        sx={{
                                            height: 18,
                                            fontSize: "0.65rem",
                                            bgcolor: "rgba(245,158,11,0.12)",
                                            color: "#F59E0B",
                                        }}
                                    />
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "#94A3B8" }}
                                    >
                                        {direction}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{
                                            fontWeight: 500,
                                            color: "#E2E8F0",
                                        }}
                                    >
                                        {otherArtifact.name}
                                    </Typography>
                                    <Typography
                                        variant="caption"
                                        sx={{ color: "#64748B" }}
                                    >
                                        ({otherArtifact.code})
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                )}
            </Box>

            {/* Children */}
            {children.length > 0 && (
                <Box sx={{ pl: 4, position: "relative" }}>
                    {children.map((child, index) => (
                        <HierarchyTreeNode
                            key={child.node.id}
                            treeNode={child}
                            depth={depth + 1}
                            isLast={index === children.length - 1}
                            onAddRelationship={onAddRelationship}
                        />
                    ))}
                </Box>
            )}
        </Box>
    );
}