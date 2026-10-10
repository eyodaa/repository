import { useEffect, useState } from "react";

import Ground from "./Ground";
import Building from "./Building";
import Road from "./Road";
import RoadNetwork, { type RoadSegment } from "./RoadNetwork";
import DistrictLabel from "./DistrictLabel";
import BuildingLabel from "./BuildingLabel";
import RelationLayer from "./RelationLayer";
import SelectionRing from "./SelectionRing";

import { graphService } from "../../services/graphService";
import { relationshipService } from "../../services/relationshipService";
import { layoutCity } from "./CityLayout";

import type { GraphResponse } from "../../types/graph";
import type { RelationshipResponse } from "../../types/relationship";
import type { BuildingModel } from "./types";
import type { DistrictModel } from "./CityLayout";

interface Props {

    selected: BuildingModel | null;

    onBuildingsLoaded: (buildings: BuildingModel[]) => void;

}

export default function EnterpriseScene({

    selected,

    onBuildingsLoaded,

}: Props) {

    const [buildings, setBuildings] =
        useState<BuildingModel[]>([]);

    const [districts, setDistricts] =
        useState<DistrictModel[]>([]);

    const [selectedBuilding, setSelectedBuilding] =
        useState<number | null>(null);

    const [highlightedBuildings, setHighlightedBuildings] =
        useState<number[]>([]);

    const [relations, setRelations] =
        useState<RelationshipResponse[]>([]);

    useEffect(() => {

        load();

    }, []);

    useEffect(() => {

        if (selected) {

            selectBuilding(selected.id);

        }

    }, [selected]);

    async function load() {

        try {

            const graph: GraphResponse =
                await graphService.getEnterpriseGraph();

            const city = layoutCity(graph.nodes || []);

            setBuildings(city.buildings);

            setDistricts(city.districts);

            onBuildingsLoaded(city.buildings);

        } catch (error) {

            console.error(error);

        }

    }

    async function selectBuilding(id: number) {

        setSelectedBuilding(id);

        try {

            const result =
                await relationshipService.getByArtifactId(id);

            setRelations(result);

            const ids = new Set<number>();

            ids.add(id);

            result.forEach(r => {

                ids.add(r.sourceArtifact.id);

                ids.add(r.targetArtifact.id);

            });

            setHighlightedBuildings([...ids]);

        } catch (error) {

            console.error(error);

        }

    }

    const roads: RoadSegment[] = [

        {
            id: "road-app-cap",
            x: 90,
            z: 0,
            width: 110,
            depth: 4,
        },

        {
            id: "road-cap-tech",
            x: 270,
            z: 0,
            width: 110,
            depth: 4,
        },

        {
            id: "road-tech-proc",
            x: 450,
            z: 0,
            width: 110,
            depth: 4,
        },

    ];

    const focusedBuilding =
        buildings.find(b => b.id === selectedBuilding);

    return (

        <>

            <Ground />

            <RoadNetwork
                roads={roads}
            />

            <RelationLayer
                buildings={buildings}
                relations={relations}
            />

            {districts.map((district) => (

                <Road
                    key={district.type}
                    x={district.centerX}
                    z={district.centerZ}
                    width={district.width}
                    depth={district.depth}
                />

            ))}

            {districts.map((district) => (

                <DistrictLabel
                    key={district.label}
                    text={district.label}
                    x={district.centerX}
                    z={district.centerZ - district.depth / 2 - 10}
                />

            ))}

            {buildings.map((building) => (

                <Building
                    key={building.id}
                    id={building.id}
                    name={building.name}
                    x={building.x}
                    z={building.z}
                    height={building.height}
                    color={building.color}
                    selected={highlightedBuildings.includes(building.id)}
                    focused={selectedBuilding === building.id}
                    dimmed={
                        highlightedBuildings.length > 0 &&
                        !highlightedBuildings.includes(building.id)
                    }
                    onClick={selectBuilding}
                />

            ))}

            {focusedBuilding && (

                <SelectionRing
                    x={focusedBuilding.x}
                    z={focusedBuilding.z}
                />

            )}

            {focusedBuilding && (

                <BuildingLabel
                    x={focusedBuilding.x}
                    y={focusedBuilding.height + 6}
                    z={focusedBuilding.z}
                    text={focusedBuilding.name}
                />

            )}

        </>

    );

}