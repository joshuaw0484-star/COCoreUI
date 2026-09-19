// app/features/plants/components/PestTracker.tsx
import React, { useState } from "react";

interface InsectProfile {
    id: string;
    name: string;
    isBeneficial: boolean;
    targetImpact: string;
}

export const PestTracker: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"pests" | "beneficials">(
        "pests",
    );

    // Sample static profiles mapping data structures from your .NET models
    const insectDatabase: InsectProfile[] = [
        {
            id: "1",
            name: "Aphids",
            isBeneficial: false,
            targetImpact: "Sucks sap, leaves residue, slows growth",
        },
        {
            id: "2",
            name: "Spider Mites",
            isBeneficial: false,
            targetImpact: "Webbing on leaves, light mottling",
        },
        {
            id: "3",
            name: "Ladybugs",
            isBeneficial: true,
            targetImpact: "Eats aphids and minor scale insects",
        },
        {
            id: "4",
            name: "Honeybees",
            isBeneficial: true,
            targetImpact: "Cross-pollination across flower stages",
        },
    ];

    const filteredInsects = insectDatabase.filter((item) =>
        activeTab === "pests" ? !item.isBeneficial : item.isBeneficial,
    );

    return (
        <div
            style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
            }}
        >
            <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>
                🐞 Insect & Pest Directory
            </h3>

            {/* Segmented Controller Tab Toggles */}
            <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
                <button
                    onClick={() => setActiveTab("pests")}
                    style={{
                        flex: 1,
                        padding: "8px 12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        cursor: "pointer",
                        background:
                            activeTab === "pests" ? "#fee2e2" : "#f8fafc",
                        color: activeTab === "pests" ? "#991b1b" : "#475569",
                        fontWeight: "600",
                        borderColor:
                            activeTab === "pests" ? "#fca5a5" : "#cbd5e1",
                    }}
                >
                    ⚠️ Pests / Threats
                </button>
                <button
                    onClick={() => setActiveTab("beneficials")}
                    style={{
                        flex: 1,
                        padding: "8px 12px",
                        border: "1px solid #cbd5e1",
                        borderRadius: "6px",
                        cursor: "pointer",
                        background:
                            activeTab === "beneficials" ? "#dcfce7" : "#f8fafc",
                        color:
                            activeTab === "beneficials" ? "#166534" : "#475569",
                        fontWeight: "600",
                        borderColor:
                            activeTab === "beneficials" ? "#86efac" : "#cbd5e1",
                    }}
                >
                    ✅ Beneficial Helpers
                </button>
            </div>

            {/* Render Dynamic Listing Cards */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {filteredInsects.map((insect) => (
                    <div
                        key={insect.id}
                        style={{
                            padding: "14px",
                            border: "1px solid #f1f5f9",
                            borderRadius: "6px",
                            background: "#f8fafc",
                        }}
                    >
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                marginBottom: "4px",
                            }}
                        >
                            <strong style={{ color: "#334155" }}>
                                {insect.name}
                            </strong>
                            <span
                                style={{
                                    fontSize: "11px",
                                    padding: "2px 8px",
                                    borderRadius: "12px",
                                    background: insect.isBeneficial
                                        ? "#bbf7d0"
                                        : "#fecaca",
                                    color: insect.isBeneficial
                                        ? "#15803d"
                                        : "#b91c1c",
                                    fontWeight: "bold",
                                }}
                            >
                                {insect.isBeneficial
                                    ? "Beneficial"
                                    : "Pest Threat"}
                            </span>
                        </div>
                        <p
                            style={{
                                margin: 0,
                                fontSize: "13px",
                                color: "#64748b",
                            }}
                        >
                            {insect.targetImpact}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};
