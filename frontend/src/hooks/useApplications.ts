import { useEffect, useState } from "react";

import type { Application } from "../types/application";

import { applicationService } from "../services/applicationService";

export function useApplications() {

    const [applications, setApplications] =
        useState<Application[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const data =
                await applicationService.getAll();

            setApplications(data);

        }

        catch {

            setError("Unable to load applications.");

        }

        finally {

            setLoading(false);

        }

    }

    return {

        applications,

        loading,

        error,

        reload: load,

    };

}