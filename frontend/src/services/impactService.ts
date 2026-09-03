import api from "../api/axios";

export const impactAnalysisService = {

    async getImpactGraph(id: number) {
        const response = await api.get(`/graph/${id}/impact`);
        return response.data;
    }

}; 