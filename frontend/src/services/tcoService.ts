import api from "../api/axios";

import type {
    CreateTCOAssessmentRequest,
    TCOAssessmentResponse
} from "../types/tco";

export const tcoService = {

    createAssessment(request: CreateTCOAssessmentRequest) {
        return api.post<TCOAssessmentResponse>(
            "/tco/assessments",
            request
        );
    },

    updateAssessment(
        id: number,
        request: CreateTCOAssessmentRequest
    ) {
        return api.put<TCOAssessmentResponse>(
            `/tco/assessments/${id}`,
            request
        );
    },

    getAssessment(id: number) {
        return api.get<TCOAssessmentResponse>(
            `/tco/assessments/${id}`
        );
    },

    getAssessmentByYear(
        applicationId: number,
        year: number
    ) {
        return api.get<TCOAssessmentResponse>(
            `/tco/assessments/application/${applicationId}/year/${year}`
        );
    },

    getApplicationAssessments(applicationId: number) {
        return api.get<TCOAssessmentResponse[]>(
            `/tco/assessments/application/${applicationId}`
        );
    },

    calculateAssessment(id: number) {
        return api.post(
            `/tco/assessments/${id}/calculate`
        );
    },

    deleteAssessment(id: number) {
        return api.delete(
            `/tco/assessments/${id}`
        );
    }

};