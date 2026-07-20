export interface Capability {

    id: number;

    code: string;

    name: string;

    description: string;

    parentId: string | null;

    maturityLevel: number | null;

    targetMaturity: number | null;

    artifactType: string;

}