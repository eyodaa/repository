import { Text } from "@react-three/drei";

interface CubeFaceProps {
    position: [number, number, number];
    rotation: [number, number, number];
    title: string;
    color: string;
    active?: boolean;
}

export default function CubeFace({

    position,
    rotation,
    title,
    color,
    active = false,

}: CubeFaceProps) {

    return (

        <group
            position={position}
            rotation={rotation}
        >

            <mesh>

                <planeGeometry args={[0.9, 0.9]} />

                <meshStandardMaterial
                    color={color}
                    emissive={active ? color : "#000000"}
                    emissiveIntensity={active ? 1.5 : 0}
                />

            </mesh>

            <Text

                position={[0, 0, 0.02]}

                fontSize={0.12}

                color="white"

                anchorX="center"

                anchorY="middle"

            >

                {title}

            </Text>

        </group>

    );

}