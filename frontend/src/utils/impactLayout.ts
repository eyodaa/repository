import type { Node } from "@xyflow/react";

const LEVEL_HEIGHT = 220;
const NODE_WIDTH = 260;
const HORIZONTAL_GAP = 80;

export function impactLayout(nodes: Node[]): Node[] {

    const levelMap = new Map<number, Node[]>();

    // Group nodes by level
    nodes.forEach(node => {

        const level = (node.data as any).level ?? 0;

        if (!levelMap.has(level)) {
            levelMap.set(level, []);
        }

        levelMap.get(level)!.push(node);

    });

    const layouted: Node[] = [];

    const levels = [...levelMap.keys()].sort((a, b) => a - b);

    levels.forEach(level => {

        const row = levelMap.get(level)!;

        const totalWidth =
            row.length * NODE_WIDTH +
            (row.length - 1) * HORIZONTAL_GAP;

        let startX = -totalWidth / 2;

        row.forEach(node => {

            layouted.push({

                ...node,

                position: {
                    x: startX,
                    y: level * LEVEL_HEIGHT
                }

            });

            startX += NODE_WIDTH + HORIZONTAL_GAP;

        });

    });

    return layouted;
}