import api from "../api/axios";
import type {
    RelationshipResponse,
    CreateRelationshipRequest,
} from "../types/relationship";

export const relationshipService = {

    async getAll(): Promise<RelationshipResponse[]> {
        const response = await api.get("/relationships");
        return response.data;
    },

    async getById(id: number): Promise<RelationshipResponse> {
        const response = await api.get(`/relationships/${id}`);
        return response.data;
    },

    async getByArtifactId(
        artifactId: number
    ): Promise<RelationshipResponse[]> {

        const response = await api.get(
            `/relationships/artifact/${artifactId}`
        );

        return response.data;
    },

    async create(
        data: CreateRelationshipRequest
    ): Promise<RelationshipResponse> {

        const response = await api.post(
            "/relationships",
            data
        );

        return response.data;
    },

    async delete(id: number) {
        await api.delete(`/relationships/${id}`);
    },
};