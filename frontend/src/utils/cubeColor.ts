export function getCubeColor(disposition: string): string {
    switch (disposition) {
        case "REWARD":
            return "#22C55E";

        case "REFRESH":
            return "#38BDF8";

        case "REMEDIATE":
            return "#F59E0B";

        case "REPLACE":
            return "#EF4444";

        case "RETIRE":
            return "#475569";

        default:
            return "#6366F1";
    }
}