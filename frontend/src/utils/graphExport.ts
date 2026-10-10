import { toPng, toSvg } from "html-to-image";
import { saveAs } from "file-saver";

import type { Node, Edge } from "@xyflow/react";

export async function exportGraphAsPNG(element: HTMLElement) {

    const dataUrl = await toPng(element, {
        pixelRatio: 2,
        cacheBust: true,
        backgroundColor: "#0f172a",
    });

    saveAs(dataUrl, "enterprise-graph.png");
}

export async function exportGraphAsSVG(element: HTMLElement) {

    const dataUrl = await toSvg(element, {
        cacheBust: true,
        backgroundColor: "#0f172a",
    });

    saveAs(dataUrl, "enterprise-graph.svg");
}

export function exportGraphAsJSON(
    nodes: Node[],
    edges: Edge[]
) {

    const json = JSON.stringify(
        {
            nodes,
            edges,
        },
        null,
        2
    );

    const blob = new Blob(
        [json],
        {
            type: "application/json",
        }
    );

    saveAs(blob, "enterprise-graph.json");
}