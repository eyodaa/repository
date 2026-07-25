import { Ring } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

export default function SelectionRing({

    x,

    z,

}: {

    x: number;

    z: number;

}) {

    const ring = useRef<any>(null);

    useFrame((state) => {

        if (!ring.current) return;

        const s = 1 + Math.sin(state.clock.elapsedTime * 4) * 0.15;

        ring.current.scale.set(s, s, s);

    });

    return (

        <Ring

            ref={ring}

            position={[x, 0.05, z]}

            rotation={[-Math.PI / 2, 0, 0]}

            args={[3, 5, 48]}

        >

            <meshBasicMaterial

                color="#00e5ff"

                transparent

                opacity={0.9}

            />

        </Ring>

    );

}