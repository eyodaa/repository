import {
    useEffect,
    useState,
    useRef,
    useImperativeHandle,
    forwardRef,
    useCallback,
} from "react";

import {
    ReactFlow,
    Background,
    Controls,
    BackgroundVariant,
    useNodesState,
    useEdgesState,
} from "@xyflow/react";

import type {
    Node,
    Edge,
} from "@xyflow/react";

import "@xyflow/react/dist/style.css";

import EnterpriseNode from "./nodes/EnterpriseNode";

import { graphService } from "../../services/graphService";
import { buildGraph } from "../../utils/graphBuilder";
import { layoutGraph } from "../../utils/elkLayout";

import type { GraphResponse } from "../../types/graph";

interface EnterpriseGraphProps {
    artifactId?: number;
    height?: number | string;
    selectedTypes?: Set<string>;
    selectedRelationships?: Set<string>;
}

export interface EnterpriseGraphRef {

    fitView(): void;

    reLayout(): void;

    exportPNG(): Promise<void>;

    exportSVG(): Promise<void>;

    exportJSON(): void;

    exportXML(): void;

}

const nodeTypes = {
    enterprise: EnterpriseNode,
};

const EnterpriseGraph = forwardRef<
    EnterpriseGraphRef,
    EnterpriseGraphProps
>(({
    artifactId,
    height = "100%",
    selectedTypes,
    selectedRelationships,
}, ref) => {

    const [nodes, setNodes, onNodesChange] =
        useNodesState<Node>([]);

    const [edges, setEdges, onEdgesChange] =
        useEdgesState<Edge>([]);

    const [loading, setLoading] =
        useState(true);

    const [reactFlowInstance, setReactFlowInstance] =
        useState<any>(null);

    const graphContainerRef =
        useRef<HTMLDivElement>(null);

    const loadGraph = useCallback(async () => {

        try {

            setLoading(true);

            let graph: GraphResponse;

            if (artifactId) {

                graph =
                    await graphService.getArtifactGraph(
                        artifactId
                    );

            } else {

                graph =
                    await graphService.getEnterpriseGraph();

            }

            const builtGraph = buildGraph(graph, {

                artifactId,

                selectedTypes,

                selectedRelationships,

            });

            const layouted = await layoutGraph(

                builtGraph.nodes,

                builtGraph.edges,
                
                artifactId

            );

            setNodes(layouted.nodes as Node[]);

            setEdges(layouted.edges as Edge[]);

        }
        catch (err) {

            console.error("Graph loading failed", err);

        }
        finally {

            setLoading(false);

        }

    }, [

        artifactId,

        selectedTypes,

        selectedRelationships,

        setNodes,

        setEdges,

    ]);

    useImperativeHandle(
        ref,
        () => ({

            fitView() {

                reactFlowInstance?.fitView({
                    padding: 0.2,
                    duration: 600,
                });

            },

            reLayout() {

                loadGraph();

            },

            async exportPNG() {

                if (!graphContainerRef.current) return;

                const element =
                    graphContainerRef.current.querySelector(
                        ".react-flow"
                    ) as HTMLElement;

                if (!element) return;

                const {
                    exportGraphAsPNG,
                } = await import("../../utils/graphExport");

                await exportGraphAsPNG(element);

            },

            async exportSVG() {

                if (!graphContainerRef.current) return;

                const element =
                    graphContainerRef.current.querySelector(
                        ".react-flow"
                    ) as HTMLElement;

                if (!element) return;

                const {
                    exportGraphAsSVG,
                } = await import("../../utils/graphExport");

                await exportGraphAsSVG(element);

            },

            exportJSON() {

                import("../../utils/graphExport").then(utils => {

                    utils.exportGraphAsJSON(
                        nodes,
                        edges
                    );

                });

            },

            exportXML() {

                const xml = `<?xml version="1.0" encoding="UTF-8"?>
<EnterpriseRepository>

    <Nodes>
${nodes.map(node => `
        <Node
            id="${node.id}"
            type="${(node.data as any).type}"
            label="${(node.data as any).label}"
            x="${node.position.x}"
            y="${node.position.y}"
        />`).join("")}
    </Nodes>

    <Relationships>
${edges.map(edge => `
        <Relationship
            id="${edge.id}"
            source="${edge.source}"
            target="${edge.target}"
            type="${(edge.data as any)?.relationshipType ?? ""}"
        />`).join("")}
    </Relationships>

</EnterpriseRepository>`;

                const blob = new Blob(
                    [xml],
                    {
                        type: "application/xml",
                    }
                );

                const url =
                    URL.createObjectURL(blob);

                const link =
                    document.createElement("a");

                link.href = url;
                link.download =
                    "enterprise-repository.xml";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(url);

            },

        }),
        [
            reactFlowInstance,
            loadGraph,
            nodes,
            edges,
        ]
    );
    useEffect(() => {

        loadGraph();

    }, [loadGraph]);

    if (loading) {

        return (

            <div
                style={{
                    width: "100%",
                    height,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    color: "white",
                    fontSize: 18,
                }}
            >
                Loading Graph...
            </div>

        );

    }

    return (

        <div

            ref={graphContainerRef}

            style={{

                width: "100%",

                height,

            }}

        >

            <ReactFlow

                nodes={nodes}

                edges={edges}

                nodeTypes={nodeTypes}

                onNodesChange={onNodesChange}

                onEdgesChange={onEdgesChange}

                fitView

                fitViewOptions={{

                    padding: 0.2,

                    duration: 600,

                }}

                nodesDraggable

                nodesConnectable

                elementsSelectable

                panOnDrag

                panOnScroll

                zoomOnScroll

                zoomOnPinch

                zoomOnDoubleClick={false}

                proOptions={{

                    hideAttribution: true,

                }}

                defaultEdgeOptions={{

                    animated: false,

                }}

                onInit={setReactFlowInstance}

            >

                <Background

                    variant={BackgroundVariant.Dots}

                    gap={22}

                    size={1}

                />

                <Controls />

            </ReactFlow>

        </div>

    );

});

EnterpriseGraph.displayName = "EnterpriseGraph";

export default EnterpriseGraph;