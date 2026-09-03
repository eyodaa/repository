import { useEffect, useState } from "react";
import { analysisService } from "../services/analysisService";
import type { ApplicationAnalysisResponse } from "../types/analysis";

export function useAnalysis(applicationId: number) {

    const [analysis, setAnalysis] =
        useState<ApplicationAnalysisResponse | null>(null);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {
        load();
    }, [applicationId]);

    async function load() {

        try {

            const data =
                await analysisService.getAnalysisByApplicationId(applicationId);

            setAnalysis(data);

        } finally {

            setLoading(false);

        }

    }

    return {
        analysis,
        loading,
        reload: load,
    };

}