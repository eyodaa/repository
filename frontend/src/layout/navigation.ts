import {
    Dashboard,
    Apps,
    Memory,
    AccountTree,
    BusinessCenter,
    Hub,
    Analytics,
    Assessment,
    Settings,
    Timeline,
    DeviceHub,
    Warning,
} from "@mui/icons-material";

export const navigation = [
    {
        title: "Dashboard",
        icon: Dashboard,
    },
    {
        title: "Architecture",
        children: [
            { title: "Applications", icon: Apps, path: "/applications" },
            { title: "Technologies", icon: Memory, path: "/technologies" },
            { title: "Capabilities", icon: BusinessCenter, path: "/capabilities" },
            { title: "Processes", icon: AccountTree, path: "/processes" },
        ],
    },
    {
        title: "Relationships",
        children: [
            { title: "Enterprise Graph", icon: Hub, path: "/graph" },
            { title: "Dependency Tree", icon: DeviceHub },
        ],
    },
    {
        title: "Analytics",
        children: [
            { title: "Application Analysis", icon: Analytics },
            { title: "Capability Maturity", icon: Timeline },
            { title: "Technology Risk", icon: Warning },
        ],
    },
    {
        title: "Reports",
        icon: Assessment,
    },
    {
        title: "Administration",
        icon: Settings,
    },
];