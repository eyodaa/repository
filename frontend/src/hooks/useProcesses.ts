import { useEffect, useState } from "react";
import { processService } from "../services/processService";
import type { BusinessProcess } from "../types/process";

export function useProcesses() {

    const [processes, setProcesses] = useState<BusinessProcess[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refresh = async () => {

        try {

            setLoading(true);
            setError(null);

            const data = await processService.getAll();

            setProcesses(data);

        } catch (err: any) {

            console.error(err);

            setError(
                err?.response?.data?.message ??
                err?.message ??
                "Failed to load business processes."
            );

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {
        refresh();
    }, []);

    return {
        processes,
        loading,
        error,
        refresh
    };
}