// app/routes.ts
import {
    type RouteConfig,
    index,
    layout,
    route,
} from "@react-router/dev/routes";

export default [
    // Public Entry Route
    route("login", "routes/login.tsx"),

    // Protected Routes Grouped Under a Shared UI Frame Layout
    layout("layouts/DashboardLayout.tsx", [
        index("routes/dashboard.tsx"),
        route("plan", "routes/planner.tsx"),
        route("plants", "routes/plants.tsx"),
        route("inventory", "routes/inventory.tsx"),
        route("journal", "routes/journal.tsx"),
    ]),
] satisfies RouteConfig;
