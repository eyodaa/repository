import type { Capability } from "../../types/capability";

export interface CapabilityNode
    extends Capability {

    children: CapabilityNode[];

}

export function buildCapabilityTree(
    capabilities: Capability[]
): CapabilityNode[] {

    const map = new Map<string, CapabilityNode>();

    capabilities.forEach(capability => {

        map.set(capability.code, {

            ...capability,

            children: [],

        });

    });

    const roots: CapabilityNode[] = [];

    map.forEach(node => {

        if (
            node.parentId &&
            map.has(node.parentId)
        ) {

            map.get(node.parentId)!
                .children
                .push(node);

        } else {

            roots.push(node);

        }

    });

    return roots;

}