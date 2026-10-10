export interface AuditLog {
    id: number;
    username: string;
    action: string;
    entityType: string;
    entityId: number | null;
    details: string;
    ipAddress: string;
    timestamp: string;
}
