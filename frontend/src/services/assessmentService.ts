import api from "../api/axios";

export const assessmentService = {

    getAll() {
        return api.get("/application-assessments");
    },

    getById(id: number) {
        return api.get(`/application-assessments/${id}`);
    },

    getByApplication(applicationId: number) {
        return api.get(
            `/application-assessments/application/${applicationId}`
        );
    },

    create(data: any) {
        return api.post(
            "/application-assessments",
            data
        );
    },

    update(id: number, data: any) {
        return api.put(
            `/application-assessments/${id}`,
            data
        );
    },


    delete(id: number) {
        return api.delete(
            `/application-assessments/${id}`
        );
    },

};