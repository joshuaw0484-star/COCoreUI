// app/routes/planner.tsx
import React from "react";
import { CanvasGrid } from "../features/garden-plan/components/CanvasGrid";
import { SoilInputLog } from "../features/garden-plan/components/SoilInputLog";

export default function Planner() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Page Header */}
            <div>
                <h1 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                    Garden Layout Planner
                </h1>
                <p style={{ margin: 0, color: "#64748b" }}>
                    Map out your physical beds and trace historical chemical
                    inputs for the active cycle.
                </p>
            </div>

            {/* Main Structural Viewport */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                {/* Render your interactive layout grid mapping tool */}
                <CanvasGrid />

                {/* 🧪 Mount the Soil Amendment component directly below the grid */}
                <SoilInputLog />
            </div>
        </div>
    );
}
