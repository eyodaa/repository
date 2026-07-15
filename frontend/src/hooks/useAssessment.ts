import { useEffect, useState } from "react";
import { assessmentService } from "../services/assessmentService";

export function useAssessment(applicationId: number) {

    const [assessment, setAssessment] = useState<any>(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        load();

    }, [applicationId]);

    async function load() {

        try {

            const response =
                await assessmentService.getByApplication(applicationId);

            setAssessment(response.data);

        } catch {

            setAssessment(null);

        } finally {

            setLoading(false);

        }

    }

    return {

        assessment,

        loading,

        error,

        reload: load,

    };

}