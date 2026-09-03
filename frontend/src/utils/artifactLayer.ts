export function getArtifactLayer(type: string): number {

    switch (type.toUpperCase()) {

        case "CAPABILITY":
            return 0;

        case "PROCESS":
            return 1;

        case "APPLICATION":
            return 2;

        case "TECHNOLOGY":
            return 3;

        default:
            return 4;

    }

}