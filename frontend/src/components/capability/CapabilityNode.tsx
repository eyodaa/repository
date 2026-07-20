import {
    TreeItem,
} from "@mui/x-tree-view/TreeItem";

import type {
    CapabilityNode as Node,
} from "./CapabilityTree";

interface Props {

    node: Node;

    onSelect: (code: string) => void;

}

export default function CapabilityNode({

    node,

    onSelect,

}: Props) {

    return (

        <TreeItem

            itemId={node.code}

            label={node.name}

            onClick={() =>
                onSelect(node.code)
            }

        >

            {node.children.map(child => (

                <CapabilityNode

                    key={child.code}

                    node={child}

                    onSelect={onSelect}

                />

            ))}

        </TreeItem>

    );

}