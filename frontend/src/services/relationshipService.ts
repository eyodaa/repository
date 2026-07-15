import api from "../api/axios";
import type { RelationshipResponse } from "../types/relationship";

export const relationshipService = {
    async getAll(): Promise<RelationshipResponse[]> {
        const response = await api.get<RelationshipResponse[]>("/relationships");
        return response.data;
    },

    async getById(id: number): Promise<RelationshipResponse> {
        const response = await api.get<RelationshipResponse>(`/relationships/${id}`);
        return response.data;
    },
};
