import api from "../api/axios";
import type { Artifact } from "../types/artifact";

export const artifactService = {

    async getAll(): Promise<Artifact[]> {

        const response = await api.get("/artifacts");

        return response.data;

    },

    async getById(id: number): Promise<Artifact> {

        const response = await api.get(`/artifacts/${id}`);

        return response.data;

    }

};