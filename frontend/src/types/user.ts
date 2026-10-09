export const Role = {
    SYSTEM_ADMIN: "SYSTEM_ADMIN",
    APPLICATION_ADMIN: "APPLICATION_ADMIN",
    TECHNOLOGY_ADMIN: "TECHNOLOGY_ADMIN",
    PROCESS_ADMIN: "PROCESS_ADMIN",
    BUSINESS_ADMIN: "BUSINESS_ADMIN",
} as const;

export type Role = (typeof Role)[keyof typeof Role];

export interface User {
    id: number;
    username: string;
    role: Role;
}

export interface CreateUserRequest {
    username: string;
    password: string;
    role: Role;
}

export interface UpdateUserRequest {
    username: string;
    password?: string;
    role: Role;
}
