import type { GraphNode } from "../../types/graph";
import type { BuildingModel } from "./types";

const BUILDING_SPACING = 10;

const DISTRICTS = {
    APPLICATION: { x: 0, z: 0 },
    CAPABILITY: { x: 180, z: 0 },
    TECHNOLOGY: { x: 360, z: 0 },
    PROCESS: { x: 540, z: 0 },
};

export interface DistrictModel {
    type: string;
    color: string;
    centerX: number;
    centerZ: number;
    width: number;
    depth: number;
    label: string;
}

export interface CityModel {
    buildings: BuildingModel[];
    districts: DistrictModel[];
}

export function layoutCity(nodes: GraphNode[]): CityModel {

    const buildings: BuildingModel[] = [];
    const districts: DistrictModel[] = [];

    createDistrict(
        nodes.filter(n => n.type === "APPLICATION"),
        DISTRICTS.APPLICATION,
        "#4f8cff",
        "APPLICATIONS",
        "APPLICATION",
        buildings,
        districts
    );

    createDistrict(
        nodes.filter(n => n.type === "CAPABILITY"),
        DISTRICTS.CAPABILITY,
        "#8b5cf6",
        "CAPABILITIES",
        "CAPABILITY",
        buildings,
        districts
    );

    createDistrict(
        nodes.filter(n => n.type === "TECHNOLOGY"),
        DISTRICTS.TECHNOLOGY,
        "#10b981",
        "TECHNOLOGIES",
        "TECHNOLOGY",
        buildings,
        districts
    );

    createDistrict(
        nodes.filter(n => n.type === "PROCESS"),
        DISTRICTS.PROCESS,
        "#f59e0b",
        "PROCESSES",
        "PROCESS",
        buildings,
        districts
    );

    return {
        buildings,
        districts,
    };
}

function createDistrict(
    nodes: GraphNode[],
    center: { x: number; z: number },
    color: string,
    label: string,
    type: string,
    buildings: BuildingModel[],
    districts: DistrictModel[]
) {

    if (nodes.length === 0) return;

    const columns = Math.ceil(Math.sqrt(nodes.length));
    const rows = Math.ceil(nodes.length / columns);

    const width = Math.max(90, columns * BUILDING_SPACING + 30);
    const depth = Math.max(90, rows * BUILDING_SPACING + 30);

    districts.push({
        type,
        color,
        label,
        centerX: center.x,
        centerZ: center.z,
        width,
        depth,
    });

    const startX = center.x - ((columns - 1) * BUILDING_SPACING) / 2;
    const startZ = center.z - ((rows - 1) * BUILDING_SPACING) / 2;

    nodes.forEach((node, index) => {

        const row = Math.floor(index / columns);
        const column = index % columns;

        buildings.push({
            id: node.id,
            name: node.label,
            type: node.type,
            x: startX + column * BUILDING_SPACING,
            z: startZ + row * BUILDING_SPACING,
            height: buildingHeight(node.type),
            color,
        });

    });

}

function buildingHeight(type: string): number {

    switch (type) {

        case "APPLICATION":
            return 12 + Math.random() * 6;

        case "CAPABILITY":
            return 18 + Math.random() * 6;

        case "TECHNOLOGY":
            return 6 + Math.random() * 3;

        case "PROCESS":
            return 8 + Math.random() * 4;

        default:
            return 8;

    }

}