import { useEffect, useState } from "react";

import {
    relationshipService,
} from "../services/relationshipService";

import type {
    RelationshipResponse,
} from "../types/relationship";

export function useRelationships() {

    const [relationships, setRelationships] =
        useState<RelationshipResponse[]>([]);

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
                await relationshipService.getAll();

            setRelationships(data);

            setError("");

        } catch {

            setError(
                "Unable to load relationships."
            );

        } finally {

            setLoading(false);

        }

    }

    return {

        relationships,

        loading,

        error,

        reload: load,

    };

}