// app/routes/inventory.tsx
import React from "react";
import { SeedInventory } from "../features/plants/components/SeedInventory";

export default function Inventory() {
    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                    Seed & Variety Catalog
                </h1>
                <p style={{ margin: 0, color: "#64748b" }}>
                    Manage your seed vaults, quantities on hand, and upcoming
                    packaging milestones.
                </p>
            </div>

            <SeedInventory />
        </div>
    );
}
