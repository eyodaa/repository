import { useEffect, useState } from "react";
import { technologyService } from "../services/technologyService";

export function useTechnologies() {

    const [technologies, setTechnologies] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadTechnologies() {

        setLoading(true);

        try {

            const data = await technologyService.getAll();

            setTechnologies(data);
            setError("");

        } catch {

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