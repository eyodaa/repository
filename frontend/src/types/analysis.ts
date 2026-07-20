export interface ApplicationAnalysisResponse {
    applicationId: number;
    applicationName: string;
    organizationalValue: number;
    technicalHealth: number;
    endUserPerspective: number;
    licenseCost: number;
    maintenanceCost: number;
    indirectCost: number;
    otherCost: number;
    totalCostOwnership: number;
    organizationalPass: boolean;
    technicalPass: boolean;
    endUserPass: boolean;
    totalCostOwnershipPass: boolean;
    pattern: string;
    disposition: string;
    priority: string;
}
