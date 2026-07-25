import { Box } from "@react-three/drei";

export interface RoadSegment {

  id: string;

  x: number;

  z: number;

  width: number;

  depth: number;

}

interface Props {

  roads: RoadSegment[];

}

export default function RoadNetwork({

  roads,

}: Props) {

  return (

    <>

      {roads.map((road) => (

        <Box
          key={road.id}
          position={[road.x, 0.02, road.z]}
          args={[road.width, 0.05, road.depth]}
          receiveShadow
        >

          <meshStandardMaterial
            color="#303746"
          />

        </Box>

      ))}

    </>

  );

}