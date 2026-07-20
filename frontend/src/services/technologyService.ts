import api from "../api/axios";

export const technologyService = {

    async getAll() {
        const response = await api.get("/technologies");
        return response.data;
    },

    getById(id: number) {
        return api.get(`/technologies/${id}`);
    },

    create(data: any) {
        return api.post("/technologies", data);
    },

    update(id: number, data: any) {
        return api.put(`/technologies/${id}`, data);
    },

    delete(id: number) {
        return api.delete(`/technologies/${id}`);
    }

};