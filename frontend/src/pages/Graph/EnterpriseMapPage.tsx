import { useState } from "react";

import { Box } from "@mui/material";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

import EnterpriseScene from "../../components/map/EnterpriseScene";
import SearchPanel from "../../components/map/SearchPanel";

import type { BuildingModel } from "../../components/map/types";

export default function EnterpriseMapPage() {

    const [buildings, setBuildings] =
        useState<BuildingModel[]>([]);

    const [selected, setSelected] =
        useState<BuildingModel | null>(null);

    return (

        <Box
            sx={{
                width: "100%",
                height: "calc(100vh - 64px)",
                position: "relative",
                overflow: "hidden",
            }}
        >

            <SearchPanel
                buildings={buildings}
                onSelect={setSelected}
            />

            <Canvas
                shadows
                camera={{
                    position: [120, 80, 120],
                    fov: 45,
                }}
            >

                <color
                    attach="background"
                    args={["#0b1220"]}
                />

                <ambientLight intensity={1.2} />

                <directionalLight
                    castShadow
                    intensity={2}
                    position={[50, 80, 50]}
                    shadow-mapSize-width={2048}
                    shadow-mapSize-height={2048}
                />

                <EnterpriseScene
                    selected={selected}
                    onBuildingsLoaded={setBuildings}
                />

                <OrbitControls
                    makeDefault
                    target={[180, 0, 40]}
                    minDistance={30}
                    maxDistance={500}
                    maxPolarAngle={Math.PI / 2.1}
                />

            </Canvas>

        </Box>

    );

}