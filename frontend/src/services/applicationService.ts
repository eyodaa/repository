import api from "../api/axios";

export const applicationService = {

    async getAll() {
        const response = await api.get("/applications");
        return response.data;
    },

    getById(id: number) {
        return api.get(`/applications/${id}`);
    },

    create(data: any) {
        return api.post("/applications", data);
    },

    update(id: number, data: any) {
        return api.put(`/applications/${id}`, data);
    },

    delete(id: number) {
        return api.delete(`/applications/${id}`);
    },

    createAssessment(data: any) {
        return api.post("/application-assessments", data);
    },

    getAnalysis(applicationId: number | string) {
        return api.get(`/application-analysis/${applicationId}`);
    },

};