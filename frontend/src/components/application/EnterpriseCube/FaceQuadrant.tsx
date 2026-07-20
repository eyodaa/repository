import { Text } from "@react-three/drei";

interface FaceQuadrantProps {

    position: [number, number, number];

    label: string;

    color: string;

    active?: boolean;

}

export default function FaceQuadrant({

    position,
    label,
    color,
    active = false,

}: FaceQuadrantProps) {

    return (

        <group position={position}>

            {/* panel */}

            <mesh>

                <planeGeometry args={[1.85, 1.85]} />

                <meshStandardMaterial

                    color={color}

                    emissive={active ? color : "#000000"}

                    emissiveIntensity={active ? 0.35 : 0}

                />

            </mesh>

            {/* label */}

            <Text

                position={[0, 0, 0.02]}

                fontSize={0.22}

                color="white"

                anchorX="center"

                anchorY="middle"

                maxWidth={1.6}

            >

                {label}

            </Text>

        </group>

    );

}