export interface ApplicationAssessmentRequest {
    applicationId: number;

    // Organizational Value
    increaseValue: number;
    reachConsumers: number;
    reduceCosts: number;
    enhanceServices: number;
    governanceCompliance: number;

    // Technical Health
    securityCompliance: number;
    businessContinuity: number;
    maintainability: number;
    adaptability: number;
    interoperability: number;

    // End User Perspective
    dataQuality: number;
    effectiveness: number;
    usability: number;
    satisfaction: number;

    // Cost
    totalCostOwnership: number;
}