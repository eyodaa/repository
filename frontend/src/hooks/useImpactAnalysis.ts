import { useCallback, useState } from "react";
import { impactAnalysisService } from "../services/impactService";

export function useImpactAnalysis() {

    const [graph, setGraph] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadImpactGraph = useCallback(async (artifactId: number) => {

        try {

            setLoading(true);
            setError("");

            const data = await impactAnalysisService.getImpactGraph(artifactId);

            setGraph(data);

        } catch (err: any) {

            setError(err.message ?? "Unable to load impact graph");

        } finally {

            setLoading(false);

        }

    }, []);

    return {
        graph,
        loading,
        error,
        loadImpactGraph
    };
}