import { useEffect, useState } from "react";

import { capabilityNodeService } from "../services/capabilityNodeService";

export function useCapabilityNodes() {

    const [nodes, setNodes] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        loadNodes();

    }, []);

    async function loadNodes() {

        try {

            setLoading(true);

            const data =
                await capabilityNodeService.getRoots();

            setNodes(data);

            setError("");

        }

        catch (err) {

            console.error(err);

            setError("Unable to load capability nodes.");

        }

        finally {

            setLoading(false);

        }

    }

    return {

        nodes,

        loading,

        error,

        refresh: loadNodes,

    };

}