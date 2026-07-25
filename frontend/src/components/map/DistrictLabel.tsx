import { Text } from "@react-three/drei";

export default function DistrictLabel({
    text,
    x,
    z,
}: {
    text: string;
    x: number;
    z: number;
}) {
    return (
        <Text
            position={[x, 0.2, z]}
            rotation={[-Math.PI / 2, 0, 0]}
            fontSize={6}
            color="white"
            anchorX="center"
            anchorY="middle"
        >
            {text}
        </Text>
    );
}