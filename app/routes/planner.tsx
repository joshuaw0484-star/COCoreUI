// app/routes/planner.tsx
import React from "react";
import {
    CanvasGrid,
    type DirectoryPlant,
} from "../features/garden-plan/components/CanvasGrid";
import { SoilInputLog } from "../features/garden-plan/components/SoilInputLog";

export default function Planner() {
    const livePlantDatabase: DirectoryPlant[] = [
        {
            id: "plant-tomato-101",
            name: "Roma Tomato",
            shortDescription:
                "Excellent plum shape tomato variety. Heavy yielding paste plant option.",
            imageUrl: "https://unsplash.com",
        },
        {
            id: "plant-basil-202",
            name: "Genovese Basil",
            shortDescription:
                "Large aromatic foliage structure. Classic companion plant choice for nightshades.",
            imageUrl: "https://unsplash.com",
        },
        {
            id: "plant-pepper-303",
            name: "Bell Pepper",
            shortDescription:
                "Sweet variety turning from emerald green to deep red. High sun requirement profile.",
            imageUrl: "https://unsplash.com",
        },
    ];

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                    Garden Layout Planner
                </h1>
                <p style={{ margin: 0, color: "#64748b" }}>
                    Map out your physical beds and trace historical inputs for
                    the active cycle.
                </p>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                <CanvasGrid registeredPlants={livePlantDatabase} />
                <SoilInputLog />
            </div>
        </div>
    );
}
