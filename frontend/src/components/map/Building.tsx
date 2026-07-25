interface Props {

    id: number;

    name: string;

    x: number;

    z: number;

    height: number;

    color: string;

    selected?: boolean;

    focused?: boolean;

    dimmed?: boolean;

    onClick?: (id: number) => void;

}

export default function Building({

    id,

    name,

    x,

    z,

    height,

    color,

    selected = false,

    focused = false,

    dimmed = false,

    onClick,

}: Props) {

    return (

        <mesh
            position={[x, height / 2, z]}
            scale={focused ? 1.15 : 1}
            castShadow
            receiveShadow
            onClick={() => onClick?.(id)}
        >

            <boxGeometry
                args={[4, height, 4]}
            />

            <meshStandardMaterial

                color={
                    focused
                        ? "#ffd54f"
                        : selected
                            ? "#00e5ff"
                            : color
                }

                emissive={
                    focused
                        ? "#ffcc00"
                        : selected
                            ? "#00bfff"
                            : "#000000"
                }

                emissiveIntensity={
                    focused
                        ? 4
                        : selected
                            ? 2
                            : 0
                }

                transparent

                opacity={dimmed ? 0.15 : 1}

                metalness={0.35}

                roughness={0.35}

            />

        </mesh>

    );

}