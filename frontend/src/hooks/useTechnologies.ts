import { useEffect, useState } from "react";

import { technologyService } from "../services/technologyService";

import type { Technology } from "../types/technology";

export function useTechnologies() {

    const [technologies, setTechnologies] =
        useState<Technology[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    async function loadTechnologies() {

        setLoading(true);

        try {

            const data =
                await technologyService.getAll();

            setTechnologies(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to load technologies.");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadTechnologies();

    }, []);

    return {

        technologies,

        loading,

        error,

        refresh: loadTechnologies,

    };

}