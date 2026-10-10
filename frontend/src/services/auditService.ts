import api from "../api/axios";

export const auditService = {
    async getAllLogs() {
        const response = await api.get("/audit-logs");
        return response.data;
    },

    async getLogsByUsername(username: string) {
        const response = await api.get(`/audit-logs/user/${username}`);
        return response.data;
    },

    async getLogsByEntityType(entityType: string) {
        const response = await api.get(`/audit-logs/entity/${entityType}`);
        return response.data;
    },

    async getLogsByAction(action: string) {
        const response = await api.get(`/audit-logs/action/${action}`);
        return response.data;
    },

    async getLogsByDateRange(start: string, end: string) {
        const response = await api.get("/audit-logs/date-range", {
            params: { start, end },
        });
        return response.data;
    },
};
