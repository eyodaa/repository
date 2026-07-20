import { Canvas } from "@react-three/fiber";
import {
    OrbitControls,
    Environment,
    ContactShadows,
} from "@react-three/drei";

import EnterpriseCube from "./EnterpriseCube";

interface Props {
    pattern: string;
}

export default function ApplicationCube({
    pattern,
}: Props) {
    return (
        <Canvas
            shadows
            camera={{
                position: [6, 5, 8],
                fov: 35,
            }}
        >
            {/* Soft ambient light */}
            <ambientLight intensity={0.7} />

            {/* Main light */}
            <directionalLight
                position={[6, 8, 5]}
                intensity={2.5}
                castShadow
                shadow-mapSize-width={2048}
                shadow-mapSize-height={2048}
            />

            {/* Fill light */}
            <pointLight
                position={[-6, -2, 6]}
                intensity={0.8}
            />

            {/* Rim light */}
            <pointLight
                position={[6, 5, -6]}
                intensity={0.8}
            />

            {/* HDR lighting */}
            <Environment preset="city" />

            {/* Bigger cube */}
            <EnterpriseCube
                pattern={pattern}

            />

            {/* Ground shadow */}
            <ContactShadows
                position={[0, -2.4, 0]}
                opacity={0.45}
                blur={2}
                far={6}
                resolution={1024}
            />

            <OrbitControls
                autoRotate
                autoRotateSpeed={0.8}
                enableZoom={false}
                enablePan={false}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 2}
            />
        </Canvas>
    );
}