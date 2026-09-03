export type ProcessCategory =
    | "CORE"
    | "SUPPORT"
    | "MANAGEMENT";

export type ProcessStatus =
    | "DRAFT"
    | "ACTIVE"
    | "INACTIVE"
    | "RETIRED";

export type ProcessCriticality =
    | "LOW"
    | "MEDIUM"
    | "HIGH"
    | "CRITICAL";

export type AutomationLevel =
    | "MANUAL"
    | "SEMI_AUTOMATED"
    | "AUTOMATED";

export type ProcessLevel =
    | "LEVEL_1"
    | "LEVEL_2"
    | "LEVEL_3"
    | "LEVEL_4";

export interface ChildProcess {

    id: number;

    code: string;

    name: string;
}

export interface BusinessProcess {

    id?: number;

    code: string;

    name: string;

    description: string;

    processCode: string;

    processOwner: string;

    businessUnit: string;

    category: ProcessCategory;

    status: ProcessStatus;

    criticality: ProcessCriticality;

    automationLevel: AutomationLevel;

    processLevel: ProcessLevel;

    version: string;

    reviewDate?: string;

    documentation?: string;

    parentProcessId?: number | null;

    parentProcessName?: string | null;

    childProcesses: ChildProcess[];
}