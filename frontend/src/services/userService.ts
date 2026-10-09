import api from "../api/axios";

import type { CreateUserRequest, UpdateUserRequest } from "../types/user";

export const userService = {
    async getAllUsers() {
        const response = await api.get("/users");
        return response.data;
    },

    async createUser(request: CreateUserRequest) {
        const response = await api.post("/users", request);
        return response.data;
    },

    async updateUser(id: number, request: UpdateUserRequest) {
        const response = await api.put(`/users/${id}`, request);
        return response.data;
    },

    async deleteUser(id: number) {
        const response = await api.delete(`/users/${id}`);
        return response.data;
    },
};
