export interface ApplicationAnalysisResponse {
    applicationId: number;
    applicationName: string;
    organizationalValue: number;
    technicalHealth: number;
    endUserPerspective: number;
    totalCostOwnership: number;
    organizationalPass: boolean;
    technicalPass: boolean;
    endUserPass: boolean;
    tcoPass: boolean;
    pattern: string;
    disposition: string;
    priority: string;
}
