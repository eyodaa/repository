export default function Road({
    x,
    z,
    width,
    depth,
}: {
    x: number;
    z: number;
    width: number;
    depth: number;
}) {
    return (
        <mesh
            receiveShadow
            position={[x, 0.01, z]}
        >
            <boxGeometry args={[width, 0.02, depth]} />

            <meshStandardMaterial color="#303742" />
        </mesh>
    );
}