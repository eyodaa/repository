import api from "../api/axios";
import type { ApplicationAnalysisResponse } from "../types/analysis";

export const analysisService = {
    async getAnalysisByApplicationId(applicationId: number): Promise<ApplicationAnalysisResponse> {
        const response = await api.get<ApplicationAnalysisResponse>(`/application-analysis/${applicationId}`);
        return response.data;
    },
};