import * as THREE from "three";

export interface CubeCell {
    position: [number, number, number];
    color: string;
}

export const cubeConfig: Record<string, CubeCell[]> = {

    PPPP: [
        { position: [0, 0, 0], color: "#22C55E" },
    ],

    PPPF: [
        { position: [0, 0, 0], color: "#22C55E" },
        { position: [1.1, 0, 0], color: "#3B82F6" },
    ],

    PPFP: [
        { position: [0, 0, 0], color: "#22C55E" },
        { position: [0, -1.1, 0], color: "#F59E0B" },
    ],

    PPFF: [
        { position: [0, 0, 0], color: "#22C55E" },
        { position: [1.1, -1.1, 0], color: "#EF4444" },
    ],

    PFPP: [
        { position: [0, 0, 0], color: "#8B5CF6" },
    ],

    PFPF: [
        { position: [0, 0, 0], color: "#8B5CF6" },
        { position: [1.1, 0, 0], color: "#3B82F6" },
    ],

    PFFP: [
        { position: [0, 0, 0], color: "#F59E0B" },
    ],

    PFFF: [
        { position: [0, 0, 0], color: "#EF4444" },
    ],

    FPPP: [
        { position: [0, 0, 0], color: "#0EA5E9" },
    ],

    FPPF: [
        { position: [0, 0, 0], color: "#0EA5E9" },
    ],

    FPFP: [
        { position: [0, 0, 0], color: "#0EA5E9" },
    ],

    FPFF: [
        { position: [0, 0, 0], color: "#0EA5E9" },
    ],

    FFPP: [
        { position: [0, 0, 0], color: "#EF4444" },
    ],

    FFPF: [
        { position: [0, 0, 0], color: "#EF4444" },
    ],

    FFFP: [
        { position: [0, 0, 0], color: "#EF4444" },
    ],

    FFFF: [
        { position: [0, 0, 0], color: "#EF4444" },
    ],

};