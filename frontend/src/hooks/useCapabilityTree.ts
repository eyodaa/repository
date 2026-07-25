import { useEffect, useState } from "react";

import { capabilityNodeService } from "../services/capabilityNodeService";

import type { CapabilityTreeNode } from "../types/capabilityTree";

export function useCapabilityTree() {

    const [tree, setTree] =
        useState<CapabilityTreeNode[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        loadTree();

    }, []);

    async function loadTree() {

        try {

            setLoading(true);

            const data =
                await capabilityNodeService.getTree();

            setTree(data);

            setError("");

        }

        catch (e) {

            console.error(e);

            setError("Unable to load capability hierarchy.");

        }

        finally {

            setLoading(false);

        }

    }

    return {

        tree,

        loading,

        error,

    };

}