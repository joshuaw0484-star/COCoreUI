// GardenPlan, BedPlacement, and GardenInput interfaces
// app/features/garden-plan/types.ts

import type { PlotTask, SoilTreatment } from "./components/PlotCell";

export type ContainerType = "Outdoor Bed" | "Seed Tray";

export interface GridPlotCell {
    id: string;
    name: string; // e.g., "Raised Bed 1" or "72-Cell Starter Tray A"
    containerType: ContainerType; // 👈 Tells the layout engine how to draw the container
    plantIds: string[];
    tasks: PlotTask[];
    treatments: SoilTreatment[];

    // Optional matrix specs specifically for drawing seedling plug trays
    gridRows?: number; // e.g., 6 rows
    gridCols?: number; // e.g., 12 columns
    plantInstances?: {
        instanceId: string;
        plantId: string;
    }[];
}
