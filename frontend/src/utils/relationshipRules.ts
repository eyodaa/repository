export interface RelationshipRule {

    type: string;

    direction: "DOWN" | "RIGHT" | "LEFT" | "SAME";

    levelChange: number;

    priority: number;

    color: string;

    hierarchy: boolean;

}

export const RELATIONSHIP_RULES: Record<string, RelationshipRule> = {

    ENABLES: {
        type: "ENABLES",
        direction: "DOWN",
        levelChange: 1,
        priority: 100,
        color: "#10b981",
        hierarchy: true,
    },

    ENABLED_BY: {
        type: "ENABLED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 100,
        color: "#10b981",
        hierarchy: true,
    },

    REALIZES: {
        type: "REALIZES",
        direction: "DOWN",
        levelChange: 1,
        priority: 95,
        color: "#3b82f6",
        hierarchy: true,
    },

    REALIZED_BY: {
        type: "REALIZED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 95,
        color: "#3b82f6",
        hierarchy: true,
    },

    IMPLEMENTS: {
        type: "IMPLEMENTS",
        direction: "DOWN",
        levelChange: 1,
        priority: 90,
        color: "#6366f1",
        hierarchy: true,
    },

    IMPLEMENTED_BY: {
        type: "IMPLEMENTED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 90,
        color: "#6366f1",
        hierarchy: true,
    },

    USES: {
        type: "USES",
        direction: "DOWN",
        levelChange: 1,
        priority: 80,
        color: "#0ea5e9",
        hierarchy: true,
    },

    USED_BY: {
        type: "USED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 80,
        color: "#0ea5e9",
        hierarchy: true,
    },

    HOSTS: {
        type: "HOSTS",
        direction: "DOWN",
        levelChange: 1,
        priority: 70,
        color: "#8b5cf6",
        hierarchy: true,
    },

    HOSTED_ON: {
        type: "HOSTED_ON",
        direction: "DOWN",
        levelChange: -1,
        priority: 70,
        color: "#8b5cf6",
        hierarchy: true,
    },

    SUPPORTS: {
        type: "SUPPORTS",
        direction: "SAME",
        levelChange: 0,
        priority: 60,
        color: "#64748b",
        hierarchy: false,
    },

    SUPPORTED_BY: {
        type: "SUPPORTED_BY",
        direction: "SAME",
        levelChange: 0,
        priority: 60,
        color: "#64748b",
        hierarchy: false,
    },

    DEPENDS_ON: {
        type: "DEPENDS_ON",
        direction: "RIGHT",
        levelChange: 0,
        priority: 50,
        color: "#f59e0b",
        hierarchy: false,
    },

    REQUIRED_BY: {
        type: "REQUIRED_BY",
        direction: "LEFT",
        levelChange: 0,
        priority: 50,
        color: "#f59e0b",
        hierarchy: false,
    },

    CONNECTS_TO: {
        type: "CONNECTS_TO",
        direction: "SAME",
        levelChange: 0,
        priority: 40,
        color: "#ec4899",
        hierarchy: false,
    },

    CONSUMES: {
        type: "CONSUMES",
        direction: "RIGHT",
        levelChange: 0,
        priority: 35,
        color: "#14b8a6",
        hierarchy: false,
    },

    PROVIDED_BY: {
        type: "PROVIDED_BY",
        direction: "LEFT",
        levelChange: 0,
        priority: 35,
        color: "#14b8a6",
        hierarchy: false,
    },

    MANAGES: {
        type: "MANAGES",
        direction: "DOWN",
        levelChange: 1,
        priority: 65,
        color: "#ef4444",
        hierarchy: true,
    },

    MANAGED_BY: {
        type: "MANAGED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 65,
        color: "#ef4444",
        hierarchy: true,
    },

    OWNS: {
        type: "OWNS",
        direction: "DOWN",
        levelChange: 1,
        priority: 65,
        color: "#84cc16",
        hierarchy: true,
    },

    OWNED_BY: {
        type: "OWNED_BY",
        direction: "DOWN",
        levelChange: -1,
        priority: 65,
        color: "#84cc16",
        hierarchy: true,
    },

    BELONGS_TO: {
        type: "BELONGS_TO",
        direction: "DOWN",
        levelChange: -1,
        priority: 70,
        color: "#06b6d4",
        hierarchy: true,
    },

    CONTAINS: {
        type: "CONTAINS",
        direction: "DOWN",
        levelChange: 1,
        priority: 70,
        color: "#06b6d4",
        hierarchy: true,
    },

    ASSOCIATED_WITH: {
        type: "ASSOCIATED_WITH",
        direction: "SAME",
        levelChange: 0,
        priority: 20,
        color: "#94a3b8",
        hierarchy: false,
    },

};

export function getRelationshipRule(type: string): RelationshipRule {

    return RELATIONSHIP_RULES[type] ?? {

        type,

        direction: "SAME",

        levelChange: 0,

        priority: 1,

        color: "#94a3b8",

        hierarchy: false,

    };

}