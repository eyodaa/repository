import { useEffect, useState, useMemo, memo } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MarkerType,
  BackgroundVariant,
  Handle,
  Position,
  useReactFlow,
  ReactFlowProvider,
  type Node,
  type Edge,
  type NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import {
  Apps as AppsIcon,
  Storage as StorageIcon,
  Schema as SchemaIcon,
  Link as LinkIcon,
} from "@mui/icons-material";

import type { CapabilityNode } from "../../types/capabilityNode";
import type { RelationshipResponse } from "../../types/relationship";
import { layoutGraph } from "../../utils/elkLayout";

interface Props {
  rootNode: CapabilityNode;
  hierarchyTree: any[];
  rootRelationships?: RelationshipResponse[];
  onNodeClick?: (node: CapabilityNode) => void;
  height?: string | number;
}

const NODE_WIDTH = 240;
const NODE_HEIGHT = 100;

const artifactConfig: Record<
  string,
  {
    color: string;
    bg: string;
    icon: React.ReactNode;
  }
> = {
  APPLICATION: {
    color: "#3b82f6", // Blue
    bg: "rgba(59, 130, 246, 0.08)",
    icon: <AppsIcon sx={{ fontSize: 16, color: "#3b82f6" }} />,
  },
  TECHNOLOGY: {
    color: "#06b6d4", // Cyan
    bg: "rgba(6, 182, 212, 0.08)",
    icon: <StorageIcon sx={{ fontSize: 16, color: "#06b6d4" }} />,
  },
  PROCESS: {
    color: "#22c55e", // Green
    bg: "rgba(34, 197, 94, 0.08)",
    icon: <SchemaIcon sx={{ fontSize: 16, color: "#22c55e" }} />,
  },
};

const ArtifactNodeCard = memo(({ data }: NodeProps) => {
  const artifact = data.artifact as any;
  const type = (artifact.artifactType || "").toUpperCase();
  const cfg = artifactConfig[type] || {
    color: "#a855f7", // Purple fallback
    bg: "rgba(168, 85, 247, 0.08)",
    icon: <LinkIcon sx={{ fontSize: 16, color: "#a855f7" }} />,
  };

  return (
    <div
      style={{
        padding: "12px 14px",
        background: cfg.bg,
        border: `1.5px solid ${cfg.color}`,
        borderRadius: "10px",
        width: `${NODE_WIDTH}px`,
        boxSizing: "border-box",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(8px)",
        position: "relative",
      }}
    >
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: cfg.color,
          width: 8,
          height: 8,
          border: "none",
        }}
      />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "6px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {cfg.icon}
          <span
            style={{
              fontSize: "11px",
              fontWeight: 700,
              color: cfg.color,
              letterSpacing: "0.05em",
            }}
          >
            {type}
          </span>
        </div>
      </div>

      <div
        style={{
          fontWeight: 600,
          fontSize: "13px",
          color: "#f8fafc",
          marginBottom: "2px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
        title={artifact.name}
      >
        {artifact.name}
      </div>

      <div
        style={{
          fontSize: "11px",
          color: "#94a3b8",
          fontFamily: "monospace",
        }}
      >
        {artifact.code}
      </div>
    </div>
  );
});

ArtifactNodeCard.displayName = "ArtifactNodeCard";

// --- Clean Memoized Custom Node Component ---
const CapabilityNodeCard = memo(({ data }: NodeProps) => {
  const isLeaf = data.isLeaf as boolean;
  const node = data.node as CapabilityNode;
  const onNodeClick = data.onNodeClick as ((node: CapabilityNode) => void) | undefined;

  return (
    <div
      onClick={() => onNodeClick?.(node)}
      style={{
        padding: "14px 16px",
        background: isLeaf ? "rgba(34, 197, 94, 0.08)" : "rgba(59, 130, 246, 0.08)",
        border: isLeaf ? "1.5px solid #22c55e" : "1.5px solid #3b82f6",
        borderRadius: "10px",
        width: `${NODE_WIDTH}px`,
        boxSizing: "border-box",
        cursor: "pointer",
        transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
        boxShadow: "0 4px 12px rgba(0, 0, 0, 0.25)",
        backdropFilter: "blur(8px)",
      }}
    >
      {/* Top Connection Handle */}
      <Handle
        type="target"
        position={Position.Top}
        style={{
          background: isLeaf ? "#22c55e" : "#3b82f6",
          width: 8,
          height: 8,
          border: "none",
        }}
      />

      <div
        style={{
          fontWeight: 600,
          fontSize: "14px",
          color: "#f8fafc",
          marginBottom: "4px",
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
        }}
      >
        {node.name}
      </div>

      <div
        style={{
          fontSize: "12px",
          color: "#94a3b8",
          fontFamily: "monospace",
          marginBottom: "10px",
        }}
      >
        {node.code}
      </div>

      <div style={{ display: "flex", gap: "6px", alignItems: "center" }}>
        <span
          style={{
            background: isLeaf ? "rgba(34, 197, 94, 0.2)" : "rgba(59, 130, 246, 0.2)",
            color: isLeaf ? "#4ade80" : "#60a5fa",
            padding: "2px 8px",
            borderRadius: "4px",
            fontSize: "11px",
            fontWeight: 700,
            letterSpacing: "0.02em",
          }}
        >
          L{node.level}
        </span>

        {isLeaf && (
          <span
            style={{
              background: "rgba(245, 158, 11, 0.2)",
              color: "#fbbf24",
              padding: "2px 8px",
              borderRadius: "4px",
              fontSize: "11px",
              fontWeight: 600,
            }}
          >
            Leaf
          </span>
        )}
      </div>

      {/* Bottom Connection Handle */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          background: isLeaf ? "#22c55e" : "#3b82f6",
          width: 8,
          height: 8,
          border: "none",
        }}
      />
    </div>
  );
});

CapabilityNodeCard.displayName = "CapabilityNodeCard";

// --- Main Inner Graph Component ---
function CapabilityHierarchyGraphInner({
  rootNode,
  hierarchyTree,
  rootRelationships = [],
  onNodeClick,
  height = "500px",
}: Props) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const { fitView } = useReactFlow();

  const nodeTypes = useMemo(
    () => ({
      capability: CapabilityNodeCard,
      artifact: ArtifactNodeCard,
    }),
    []
  );

  useEffect(() => {
    let isSubscribed = true;

    async function buildAndLayoutTree() {
      setLoading(true);

      const rawNodes: Node[] = [];
      const rawEdges: Edge[] = [];

      // Helper function to process relationships for a capability node
      const addRelationships = (capabilityId: number, relationships: RelationshipResponse[], capNodeId: string) => {
        if (!relationships || relationships.length === 0) return;

        relationships.forEach((rel) => {
          const isSource = rel.sourceArtifact.id === capabilityId;
          const otherArtifact = isSource ? rel.targetArtifact : rel.sourceArtifact;
          const otherNodeId = `artifact-${otherArtifact.id}`;

          // Check if this artifact node is already in rawNodes
          const nodeExists = rawNodes.some((n) => n.id === otherNodeId);
          if (!nodeExists) {
            rawNodes.push({
              id: otherNodeId,
              type: "artifact",
              position: { x: 0, y: 0 },
              data: {
                artifact: otherArtifact,
              },
              width: NODE_WIDTH,
              height: NODE_HEIGHT,
            });
          }

          // Add edge from capability to artifact
          rawEdges.push({
            id: `edge-rel-${capabilityId}-${otherArtifact.id}`,
            source: capNodeId,
            target: otherNodeId,
            type: "smoothstep",
            animated: true,
            label: rel.relationshipType.replaceAll("_", " "),
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#f59e0b",
              width: 14,
              height: 14,
            },
            style: {
              stroke: "#f59e0b",
              strokeWidth: 1.5,
              strokeDasharray: "5,5",
            },
            labelStyle: {
              fill: "#f8fafc",
              fontWeight: 500,
              fontSize: 10,
            },
            labelBgStyle: {
              fill: "#0f172a",
              fillOpacity: 0.85,
            },
            labelBgPadding: [4, 2],
            labelBgBorderRadius: 4,
          });
        });
      };

      // 1. Add Root Node
      const rootNodeId = `node-${rootNode.id}`;
      const isRootLeaf = hierarchyTree.length === 0;
      rawNodes.push({
        id: rootNodeId,
        type: "capability",
        position: { x: 0, y: 0 },
        data: {
          node: rootNode,
          isLeaf: isRootLeaf,
          onNodeClick,
        },
        width: NODE_WIDTH,
        height: NODE_HEIGHT,
      });

      if (isRootLeaf && rootRelationships && rootRelationships.length > 0) {
        addRelationships(rootNode.id, rootRelationships, rootNodeId);
      }

      // 2. Traversal helper for tree extraction
      const processChildren = (children: any[], parentId: string) => {
        children.forEach((child) => {
          const childNodeId = `node-${child.node.id}`;

          rawNodes.push({
            id: childNodeId,
            type: "capability",
            position: { x: 0, y: 0 },
            data: {
              node: child.node,
              isLeaf: child.isLeaf,
              onNodeClick,
            },
            width: NODE_WIDTH,
            height: NODE_HEIGHT,
          });

          rawEdges.push({
            id: `edge-${parentId}-${childNodeId}`,
            source: parentId,
            target: childNodeId,
            type: "smoothstep",
            animated: false,
            markerEnd: {
              type: MarkerType.ArrowClosed,
              color: "#3b82f6",
              width: 16,
              height: 16,
            },
            style: {
              stroke: "#3b82f6",
              strokeWidth: 2,
            },
          });

          // Add relationship nodes and edges if this is a leaf capability and has relationships
          if (child.isLeaf && child.relationships && child.relationships.length > 0) {
            addRelationships(child.node.id, child.relationships, childNodeId);
          }

          if (child.children && child.children.length > 0) {
            processChildren(child.children, childNodeId);
          }
        });
      };

      if (hierarchyTree.length > 0) {
        processChildren(hierarchyTree, rootNodeId);
      }

      // 3. Compute Auto Layout via ELK engine
      try {
        const layouted = await layoutGraph(rawNodes, rawEdges);
        if (isSubscribed) {
          setNodes(layouted.nodes);
          setEdges(layouted.edges);
          setTimeout(() => fitView({ duration: 400, padding: 0.2 }), 50);
        }
      } catch (err) {
        console.error("Failed to layout capability hierarchy:", err);
      } finally {
        if (isSubscribed) setLoading(false);
      }
    }

    buildAndLayoutTree();

    return () => {
      isSubscribed = false;
    };
  }, [rootNode, hierarchyTree, rootRelationships, onNodeClick, fitView]);

  return (
    <div
      style={{
        width: "100%",
        height,
        background: "#0f172a",
        position: "relative",
        borderRadius: "12px",
        overflow: "hidden",
        border: "1px solid #1e293b",
      }}
    >
      {loading && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 10,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(15, 23, 42, 0.75)",
            color: "#94a3b8",
            fontSize: "14px",
            fontWeight: 500,
          }}
        >
          Calculating Tree Hierarchy...
        </div>
      )}

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2, duration: 500 }}
        nodesDraggable
        panOnDrag
        panOnScroll
        zoomOnScroll
        zoomOnPinch
        zoomOnDoubleClick={false}
        nodesConnectable={false}
        elementsSelectable
        proOptions={{ hideAttribution: true }}
      >
        <Background
          variant={BackgroundVariant.Dots}
          gap={20}
          size={1}
          color="#334155"
        />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// Wrapper ensuring React Flow hooks context operates seamlessly
export default function CapabilityHierarchyGraph(props: Props) {
  return (
    <ReactFlowProvider>
      <CapabilityHierarchyGraphInner {...props} />
    </ReactFlowProvider>
  );
}