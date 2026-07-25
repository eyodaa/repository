import api from "../api/axios";

export const graphService = {

    async getEnterpriseGraph() {
        const response = await api.get("/graph");
        return response.data;
    },

    async getArtifactGraph(id: number) {
        const response = await api.get(`/graph/artifact/${id}`);
        return response.data;
    }

};