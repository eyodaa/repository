import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";

import type { BuildingModel } from "./types";

interface Props {

    target: BuildingModel | null;

    buildings: BuildingModel[];

    highlightedIds: number[];

}

export default function CameraController({

    target,

    buildings,

    highlightedIds,

}: Props) {

    const { camera } = useThree();

    const destination =
        useRef(camera.position.clone());

    const lookAt =
        useRef(new Vector3());

    useEffect(() => {

        if (!target) {

            destination.current.set(
                120,
                120,
                120
            );

            lookAt.current.set(
                180,
                0,
                0
            );

            return;

        }

        const visible = buildings.filter(b =>
            highlightedIds.includes(b.id)
        );

        if (visible.length === 0) return;

        let minX = Infinity;
        let maxX = -Infinity;

        let minZ = Infinity;
        let maxZ = -Infinity;

        visible.forEach(b => {

            minX = Math.min(minX, b.x);
            maxX = Math.max(maxX, b.x);

            minZ = Math.min(minZ, b.z);
            maxZ = Math.max(maxZ, b.z);

        });

        const centerX = (minX + maxX) / 2;
        const centerZ = (minZ + maxZ) / 2;

        const span =
            Math.max(
                maxX - minX,
                maxZ - minZ,
                80
            );

        destination.current.set(

            centerX + span * 0.8,

            span * 0.9,

            centerZ + span * 0.8

        );

        lookAt.current.set(

            centerX,

            0,

            centerZ

        );

    }, [target, buildings, highlightedIds]);

    useFrame(() => {

        camera.position.lerp(
            destination.current,
            0.05
        );

        camera.lookAt(
            lookAt.current
        );

    });

    return null;

}