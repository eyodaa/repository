import api from "../api/axios";

export const capabilityService = {

    async getAll() {
        const response = await api.get("/capabilities");
        return response.data;
    },

    getById(id: number) {
        return api.get(`/capabilities/${id}`);
    },

    create(data: any) {
        return api.post("/capabilities", data);
    },

    update(id: number, data: any) {
        return api.put(`/capabilities/${id}`, data);
    },

    delete(id: number) {
        return api.delete(`/capabilities/${id}`);
    }

};