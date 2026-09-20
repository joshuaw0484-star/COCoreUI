// app/features/garden-plan/components/CanvasGrid.tsx
import React, { useState } from "react";
import { PlotCell, type GridPlotCell } from "./PlotCell";
import { CropAllocationsCard } from "./CropAllocationsCard";
import { PlotTaskCoordinator } from "./PlotTaskCoordinator";
import { SoilAmendmentsLedger } from "./SoilAmendmentsLedger";

export interface DirectoryPlant {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
}

interface CanvasGridProps {
    registeredPlants: DirectoryPlant[];
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({ registeredPlants }) => {
    const [grid, setGrid] = useState<GridPlotCell[]>([
        {
            id: "bed-1",
            name: "Raised Bed 1",
            containerType: "Outdoor Bed",
            plantInstances: [],
            tasks: [],
            treatments: [],
        },
        {
            id: "bed-2",
            name: "Raised Bed 2",
            containerType: "Outdoor Bed",
            plantInstances: [],
            tasks: [],
            treatments: [],
        },
    ]);

    const [activeFilterTab, setActiveFilterTab] = useState<
        "Outdoor Bed" | "Seed Tray"
    >("Outdoor Bed");
    const [selectedCellId, setSelectedCellId] = useState<string | null>(null);

    const activeSelectedCell =
        grid.find((c) => c.id === selectedCellId) || null;
    const visibleContainers = grid.filter(
        (c) => c.containerType === activeFilterTab,
    );

    // --- ACTIONS LAYER ---
    const handleAddNewBed = () => {
        const nextNumber =
            grid.filter((c) => c.containerType === "Outdoor Bed").length + 1;
        setGrid([
            ...grid,
            {
                id: `bed-${Date.now()}`,
                name: `Raised Bed ${nextNumber}`,
                containerType: "Outdoor Bed",
                plantInstances: [],
                tasks: [],
                treatments: [],
            },
        ]);
    };

    const handleAddNewSeedTray = () => {
        const nextNumber =
            grid.filter((c) => c.containerType === "Seed Tray").length + 1;
        setGrid([
            ...grid,
            {
                id: `tray-${Date.now()}`,
                name: `Seed Tray ${nextNumber}`,
                containerType: "Seed Tray",
                plantInstances: [],
                tasks: [],
                treatments: [],
            },
        ]);
    };

    const handleDeleteCellComplete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        if (selectedCellId === id) setSelectedCellId(null);
        setGrid(grid.filter((c) => c.id !== id));
    };

    const handleAddPlant = (plantId: string) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          plantInstances: [
                              ...(c.plantInstances || []),
                              {
                                  instanceId: `allocated-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
                                  plantId,
                              },
                          ],
                      }
                    : c,
            ),
        );
    };

    const handleRemovePlant = (instanceId: string) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          plantInstances: (c.plantInstances || []).filter(
                              (item) => item.instanceId !== instanceId,
                          ),
                      }
                    : c,
            ),
        );
    };

    const handleAddTask = (description: string) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          tasks: [
                              ...c.tasks,
                              {
                                  id: `tsk-${Date.now()}`,
                                  description,
                                  isDone: false,
                              },
                          ],
                      }
                    : c,
            ),
        );
    };

    const handleToggleTask = (taskId: string) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          tasks: c.tasks.map((t) =>
                              t.id === taskId ? { ...t, isDone: !t.isDone } : t,
                          ),
                      }
                    : c,
            ),
        );
    };

    const handleLogTreatment = (
        type: string,
        source: string,
        quantity: string,
    ) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          treatments: [
                              {
                                  id: `trt-${Date.now()}`,
                                  type,
                                  source,
                                  quantity,
                                  date: new Date().toISOString().split("T")[0],
                              },
                              ...c.treatments,
                          ],
                      }
                    : c,
            ),
        );
    };

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
            }}
        >
            {/* Matrix Controls Block */}
            <div
                style={{
                    background: "var(--color-bg-card)",
                    padding: "24px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: "20px",
                        flexWrap: "wrap",
                        gap: "12px",
                    }}
                >
                    <div
                        style={{
                            display: "flex",
                            background: "var(--color-bg-app)",
                            padding: "4px",
                            borderRadius: "var(--radius-md)",
                        }}
                    >
                        <button
                            onClick={() => {
                                setActiveFilterTab("Outdoor Bed");
                                setSelectedCellId(null);
                            }}
                            style={{
                                padding: "6px 16px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                background:
                                    activeFilterTab === "Outdoor Bed"
                                        ? "var(--color-bg-card)"
                                        : "transparent",
                            }}
                        >
                            🏡 Outdoor Beds
                        </button>
                        <button
                            onClick={() => {
                                setActiveFilterTab("Seed Tray");
                                setSelectedCellId(null);
                            }}
                            style={{
                                padding: "6px 16px",
                                border: "none",
                                cursor: "pointer",
                                fontWeight: "600",
                                background:
                                    activeFilterTab === "Seed Tray"
                                        ? "var(--color-bg-card)"
                                        : "transparent",
                            }}
                        >
                            🌱 Seed Trays
                        </button>
                    </div>
                    <div style={{ display: "flex", gap: "10px" }}>
                        {activeFilterTab === "Outdoor Bed" && (
                            <button
                                onClick={handleAddNewBed}
                                style={{
                                    padding: "8px 16px",
                                    background: "var(--color-secondary)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                ➕ Add Bed
                            </button>
                        )}
                        {activeFilterTab === "Seed Tray" && (
                            <button
                                onClick={handleAddNewSeedTray}
                                style={{
                                    padding: "8px 16px",
                                    background: "var(--color-primary)",
                                    color: "white",
                                    border: "none",
                                    borderRadius: "var(--radius-sm)",
                                    fontWeight: "600",
                                    cursor: "pointer",
                                }}
                            >
                                🌱 Add Tray
                            </button>
                        )}
                    </div>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {visibleContainers.map((cell) => (
                        <PlotCell
                            key={cell.id}
                            cell={cell}
                            isSelected={selectedCellId === cell.id}
                            onClick={() => setSelectedCellId(cell.id)}
                            onDeleteCell={handleDeleteCellComplete}
                            getPlantNameById={(id) =>
                                registeredPlants.find((p) => p.id === id)
                                    ?.name || "Unknown"
                            }
                        />
                    ))}
                </div>
            </div>

            {/* Inspector Container Block */}
            <div>
                {!activeSelectedCell ? (
                    <div
                        style={{
                            padding: "32px",
                            textAlign: "center",
                            color: "var(--color-text-muted)",
                            border: "2px dashed var(--color-border)",
                            borderRadius: "var(--radius-lg)",
                            background: "var(--color-bg-card)",
                        }}
                    >
                        💡 Select any unit square above to load tracking
                        parameters.
                    </div>
                ) : (
                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "32px",
                            background: "var(--color-bg-card)",
                            padding: "24px",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <h2
                            style={{
                                margin: 0,
                                borderBottom: "2px solid var(--color-border)",
                                paddingBottom: "12px",
                            }}
                        >
                            🛠️ Inspector: {activeSelectedCell.name}
                        </h2>
                        <CropAllocationsCard
                            plantInstances={
                                activeSelectedCell.plantInstances || []
                            }
                            registeredPlants={registeredPlants}
                            onAddPlant={handleAddPlant}
                            onRemovePlant={handleRemovePlant}
                        />
                        <PlotTaskCoordinator
                            tasks={activeSelectedCell.tasks}
                            onAddTask={handleAddTask}
                            onToggleTask={handleToggleTask}
                        />
                        <SoilAmendmentsLedger
                            treatments={activeSelectedCell.treatments}
                            onLogTreatment={handleLogTreatment}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
