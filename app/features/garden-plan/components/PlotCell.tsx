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

export interface GridPlotCell {
    id: string; // Distinct ID string instead of fixed coordinates
    name: string; // e.g., "Raised Bed Alpha" or "Plot 1"
    plantIds: string[];
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

export const PlotCell: React.FC<PlotCellProps> = ({
    cell,
    isSelected,
    onClick,
    onDeleteCell,
    getPlantNameById,
}) => {
    const [hoveredPlantId, setHoveredPlantId] = useState<string | null>(null);
    const hasPlants = cell.plantIds.length > 0;

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
            {/* Small top banner with plot name and an independent delete clicker button */}
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
                    title="Delete this entire garden bed"
                >
                    ✕
                </button>
            </div>

            {/* Middle Workspace Icons Section */}
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
                    cell.plantIds.map((id, index) => (
                        <div
                            key={`${id}-${index}`}
                            onMouseEnter={() => setHoveredPlantId(id)}
                            onMouseLeave={() => setHoveredPlantId(null)}
                            style={{
                                fontSize: "18px",
                                position: "relative",
                                cursor: "help",
                            }}
                        >
                            🌿
                            {hoveredPlantId === id && (
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
                                        zIndex: 999,
                                    }}
                                >
                                    {getPlantNameById(id)}
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

            {/* Bottom mini-badges indicators block */}
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
                {cell.tasks.length > 0 && (
                    <span>
                        📋 {cell.tasks.filter((t) => !t.isDone).length} tasks
                    </span>
                )}
                {cell.treatments.length > 0 && (
                    <span>🧪 {cell.treatments.length} logs</span>
                )}
            </div>
        </div>
    );
};
