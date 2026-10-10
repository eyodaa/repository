import { Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

interface Props {

    points: [number, number, number][];

}

export default function AnimatedRelation({

    points,

}: Props) {

    const line = useRef<any>(null);

    const material = useMemo(() => {

        return new THREE.LineDashedMaterial({

            color: "#00f7ff",

            linewidth: 2,

            dashSize: 3,

            gapSize: 1,

        });

    }, []);

    useFrame((_, delta) => {

        if (!material) return;

        (material as any).dashOffset -= delta * 5;

    });

    return (

        <Line
            ref={line}
            points={points}
            dashed
            material={material as any}
        />

    );

}