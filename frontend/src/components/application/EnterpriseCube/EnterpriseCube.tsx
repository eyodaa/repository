import SmallCube from "./SmallCube";

interface Props {
    pattern: string;
}

const positions = [

    [-0.5, 0.5, 0.5],
    [0.5, 0.5, 0.5],

    [-0.5, -0.5, 0.5],
    [0.5, -0.5, 0.5],

    [-0.5, 0.5, -0.5],
    [0.5, 0.5, -0.5],

    [-0.5, -0.5, -0.5],
    [0.5, -0.5, -0.5],

] as const;

export default function EnterpriseCube({
    pattern,
}: Props) {

    const colors = getColors(pattern);

    return (

        <group>

            {positions.map((p, index) => (

                <SmallCube
                    key={index}
                    position={[...p]}
                    color={colors[index]}
                />

            ))}

        </group>

    );

}

function getColors(pattern: string) {

    switch (pattern) {

        case "PPPP":

            return [
                "#22C55E",
                "#22C55E",
                "#22C55E",
                "#22C55E",
                "#22C55E",
                "#22C55E",
                "#22C55E",
                "#22C55E",
            ];

        case "FPFF":

            return [
                "#2563EB",
                "#22C55E",
                "#2563EB",
                "#2563EB",
                "#2563EB",
                "#2563EB",
                "#2563EB",
                "#2563EB",
            ];

        case "FFFF":

            return [
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
                "#EF4444",
            ];

        default:

            return [
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
                "#1E40AF",
            ];
    }

}