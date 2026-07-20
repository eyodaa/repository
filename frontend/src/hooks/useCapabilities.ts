import { useEffect, useState } from "react";

import { capabilityService } from "../services/capabilityService";

import type { Capability } from "../types/capability";
import { useMemo } from "react";
export function useCapabilities() {

    const [capabilities, setCapabilities] =
        useState<Capability[]>([]);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");

    async function loadCapabilities() {

        setLoading(true);

        try {

            const data =
                await capabilityService.getAll();

            setCapabilities(data);

            setError("");

        } catch (err) {

            console.error(err);

            setError("Unable to load capabilities.");

        } finally {

            setLoading(false);

        }

    }

    useEffect(() => {

        loadCapabilities();

    }, []);
    const capabilityMap = useMemo(() => {

        const map = new Map<string, Capability>();

        capabilities.forEach(capability => {

            map.set(capability.code, capability);

        });

        return map;

    }, [capabilities]);

    return {

        capabilities,

        capabilityMap,

        loading,

        error,

        refresh: loadCapabilities,

    };
}