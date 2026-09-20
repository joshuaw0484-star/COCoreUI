// app/features/garden-plan/components/PlotCell.tsx
import React, { useState } from "react";

export interface PlotTask {
    id: string;
    description: string;
    isDone: boolean;
}

export interface SoilTreatment {
    id: string;
    type: string;
    source: string;
    quantity: string;
    date: string;
}

// 🌿 New instance object matching your duplicate crop workflow
export interface PlantInstance {
    instanceId: string;
    plantId: string;
}

export interface GridPlotCell {
    id: string;
    name: string;
    containerType: "Outdoor Bed" | "Seed Tray";
    plantInstances: PlantInstance[]; // 👈 Updated from plantIds: string[]
    tasks: PlotTask[];
    treatments: SoilTreatment[];
}

interface PlotCellProps {
    cell: GridPlotCell;
    isSelected: boolean;
    onClick: () => void;
    onDeleteCell: (id: string, e: React.MouseEvent) => void;
    getPlantNameById: (id: string) => string;
}

export interface DirectoryPlant {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
}

export const PlotCell: React.FC<PlotCellProps> = ({
    cell,
    isSelected,
    onClick,
    onDeleteCell,
    getPlantNameById,
}) => {
    const [hoveredInstanceId, setHoveredInstanceId] = useState<string | null>(
        null,
    );
    const instances = cell.plantInstances || [];
    const hasPlants = instances.length > 0;

    return (
        <div
            onClick={onClick}
            style={{
                aspectRatio: "1",
                background: hasPlants
                    ? "var(--color-success-light)"
                    : "var(--color-bg-card)",
                border: isSelected
                    ? "3px solid var(--color-secondary)"
                    : "1px solid var(--color-border)",
                borderRadius: "var(--radius-lg)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                transition: "var(--transition-smooth)",
                padding: "12px",
                boxSizing: "border-box",
                position: "relative",
            }}
        >
            {/* Top Bar: Name & Delete Button */}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "100%",
                    alignItems: "center",
                }}
            >
                <span
                    style={{
                        fontSize: "11px",
                        fontWeight: "700",
                        color: "var(--color-text-muted)",
                    }}
                >
                    {cell.name}
                </span>
                <button
                    onClick={(e) => onDeleteCell(cell.id, e)}
                    style={{
                        background: "none",
                        border: "none",
                        color: "var(--color-text-muted)",
                        cursor: "pointer",
                        fontSize: "11px",
                        padding: 0,
                    }}
                >
                    ✕
                </button>
            </div>

            {/* Middle Workspace: Displays Multiple Icons (Even for Duplicates!) */}
            <div
                style={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "6px",
                    justifyContent: "center",
                    width: "100%",
                    margin: "8px 0",
                }}
            >
                {hasPlants ? (
                    instances.map((item) => (
                        <div
                            key={item.instanceId} // 👈 Tracks by the unique allocation ID token string
                            onMouseEnter={() =>
                                setHoveredInstanceId(item.instanceId)
                            }
                            onMouseLeave={() => setHoveredInstanceId(null)}
                            style={{
                                fontSize: "18px",
                                position: "relative",
                                cursor: "help",
                            }}
                        >
                            🌿
                            {/* Tooltip Popup matched to the absolute instanceId */}
                            {hoveredInstanceId === item.instanceId && (
                                <div
                                    style={{
                                        position: "absolute",
                                        bottom: "130%",
                                        left: "50%",
                                        transform: "translateX(-50%)",
                                        background: "var(--color-text-main)",
                                        color: "white",
                                        padding: "4px 8px",
                                        borderRadius: "var(--radius-sm)",
                                        fontSize: "11px",
                                        whiteSpace: "nowrap",
                                        fontWeight: "600",
                                        zIndex: 999,
                                        boxShadow: "0 2px 4px rgba(0,0,0,0.15)",
                                        pointerEvents: "none",
                                    }}
                                >
                                    {getPlantNameById(item.plantId)}
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <span
                        style={{
                            fontSize: "12px",
                            color: "var(--color-text-muted)",
                            fontStyle: "italic",
                        }}
                    >
                        Empty Fallow
                    </span>
                )}
            </div>

            {/* Bottom Information Badges */}
            <div
                style={{
                    display: "flex",
                    gap: "8px",
                    fontSize: "10px",
                    width: "100%",
                    justifyContent: "flex-start",
                    color: "var(--color-text-muted)",
                }}
            >
                {cell.tasks?.length > 0 && (
                    <span>
                        📋 {cell.tasks.filter((t) => !t.isDone).length} tasks
                    </span>
                )}
                {cell.treatments?.length > 0 && (
                    <span>🧪 {cell.treatments.length} logs</span>
                )}
            </div>
        </div>
    );
};
