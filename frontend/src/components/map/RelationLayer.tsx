import AnimatedRelation from "./AnimatedRelation";

import type { RelationshipResponse } from "../../types/relationship";
import type { BuildingModel } from "./types";

interface Props {

    relations: RelationshipResponse[];

    buildings: BuildingModel[];

}

export default function RelationLayer({

    relations,

    buildings,

}: Props) {

    function building(id: number) {

        return buildings.find(b => b.id === id);

    }

    return (

        <>

            {relations.map(relation => {

                const source = building(
                    relation.sourceArtifact.id
                );

                const target = building(
                    relation.targetArtifact.id
                );

                if (!source || !target) return null;

                const path: [number, number, number][] = [

                    [source.x, 0.3, source.z],

                    [source.x, 0.3, 0],

                    [target.x, 0.3, 0],

                    [target.x, 0.3, target.z],

                ];

                return (

                    <AnimatedRelation
                        key={relation.id}
                        points={path}
                    />

                );

            })}

        </>

    );

}