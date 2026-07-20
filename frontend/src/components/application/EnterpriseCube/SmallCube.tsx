import { Mesh } from "three";

interface Props {
    position: [number, number, number];
    color: string;
}

export default function SmallCube({
    position,
    color,
}: Props) {

    return (

        <mesh position={position} castShadow receiveShadow>

            <boxGeometry args={[0.95, 0.95, 0.95]} />

            <meshStandardMaterial
                color={color}
                roughness={0.3}
                metalness={0.15}
            />

        </mesh>

    );

}