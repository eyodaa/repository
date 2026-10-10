import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useImpactAnalysis } from "../../hooks/useImpactAnalysis";
import ImpactGraph from "../../components/graph/ImpactGraph";

export default function ImpactAnalysisPage() {

    const { id } = useParams();

    const {
        graph,
        loading,
        error,
        loadImpactGraph
    } = useImpactAnalysis();

    useEffect(() => {

        if (id) {
            loadImpactGraph(Number(id));
        }

    }, [id]);

    if (loading) {
        return <div>Loading impact analysis...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    if (!graph) {
        return <div>No Data</div>;
    }

    return (
        <ImpactGraph graph={graph} />
    );
}