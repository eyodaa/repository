import { useEffect, useState } from "react";

import { artifactService } from "../services/artifactService";

import type { Artifact } from "../types/artifact";

export function useArtifacts() {

    const [artifacts, setArtifacts] = useState<Artifact[]>([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");

    useEffect(() => {

        load();

    }, []);

    async function load() {

        try {

            const data = await artifactService.getAll();

            setArtifacts(data);

        }

        catch {

            setError("Unable to load artifacts.");

        }

        finally {

            setLoading(false);

        }

    }

    return {

        artifacts,

        loading,

        error,

        reload: load,

    };

}