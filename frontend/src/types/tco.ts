export interface YearAmountRequest {

    financialYear: number;

    amount: number;

}

export interface CostItemRequest {

    costDefinitionId: number;

    yearlyAmounts: YearAmountRequest[];

}

export interface CreateTCOAssessmentRequest {

    applicationId: number;

    assessmentYear: number;

    assessedBy: string;

    currency: string;

    notes: string;

    costItems: CostItemRequest[];

}

export interface CostItemResponse {

    costDefinitionId: number;

    code: string;

    name: string;

    category: string;

    yearlyAmounts: YearAmountRequest[];

}

export interface CategorySummaryResponse {

    category: string;

    total: number;

    score: number;

}

export interface TCOAssessmentResponse {

    id: number;

    applicationId: number;

    assessmentYear: number;

    assessmentDate: string;

    currency: string;

    assessedBy: string;

    status: string;

    notes: string;

    totalCost: number;

    overallScore: number;

    costItems: CostItemResponse[];

    categoryTotals: CategorySummaryResponse[];

}