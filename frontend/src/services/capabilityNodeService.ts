import api from "../api/axios";

export const capabilityNodeService = {

    async getTree() {

        const response = await api.get("/nodes/tree");

        return response.data;

    },

    async getRoots() {

        const response = await api.get("/nodes/roots");

        return response.data;

    },

    async getChildren(parentId: number) {

        const response = await api.get(`/nodes/children/${parentId}`);

        return response.data;

    },

    async getById(id: number) {

        const response = await api.get(`/nodes/${id}`);

        return response.data;

    },

    async getByCode(code: string) {

        const response = await api.get(`/nodes/code/${code}`);

        return response.data;

    },

    async create(node: any) {

        const response = await api.post("/nodes", node);

        return response.data;

    },

    async update(id: number, node: any) {

        const response = await api.put(`/nodes/${id}`, node);

        return response.data;

    },

    async delete(id: number) {

        const response = await api.delete(`/nodes/${id}`);

        return response.data;

    },

    async calculateMaturity() {

        const response = await api.post(`/nodes/calculate-maturity`);

        return response.data;

    }

};