import api from "../api/axios";

export const processService = {

    async getAll() {
        const response = await api.get("/business-processes");
        return response.data;
    },

    getById(id: number) {
        return api.get(`/business-processes/${id}`);
    },

    create(data: any) {
        return api.post("/business-processes", data);
    },

    update(id: number, data: any) {
        return api.put(`/business-processes/${id}`, data);
    },

    delete(id: number) {
        return api.delete(`/business-processes/${id}`);
    },

    getRootProcesses() {
        return api.get("/business-processes/root");
    },

    getChildProcesses(id: number) {
        return api.get(`/business-processes/${id}/children`);
    }

};