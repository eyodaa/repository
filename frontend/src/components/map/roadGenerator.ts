import type { DistrictModel } from "./CityLayout";
import type { RoadSegment } from "./RoadNetwork";

export function generateRoads(
    districts: DistrictModel[]
): RoadSegment[] {

    const roads: RoadSegment[] = [];

    for (let i = 0; i < districts.length - 1; i++) {

        const current = districts[i];
        const next = districts[i + 1];

        roads.push({

            id: `${current.type}-${next.type}`,

            x: (current.centerX + next.centerX) / 2,

            z: current.centerZ,

            width: next.centerX - current.centerX,

            depth: 4,

            highlighted: false,

        });

    }

    return roads;

}