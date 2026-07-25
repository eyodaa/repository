import { Text } from "@react-three/drei";

interface Props {
    x: number;
    y: number;
    z: number;
    text: string;
}

export default function BuildingLabel({
    x,
    y,
    z,
    text,
}: Props) {

    return (

        <Text
            position={[x, y, z]}
            fontSize={3}
            color="white"
            anchorX="center"
        >
            {text}
        </Text>

    );

}