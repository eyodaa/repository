export interface Artifact {

    id: number;

    code: string;

    name: string;

    description: string;

    artifactType:
    | "APPLICATION"
    | "TECHNOLOGY"
    | "CAPABILITY"
    | "PROCESS";
}