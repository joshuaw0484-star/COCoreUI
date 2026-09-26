// app/features/garden-plan/components/CanvasGrid.tsx
import React, { useEffect, useState } from "react";
import { PlotCell, type GridPlotCell } from "./PlotCell";
import { CropAllocationsCard } from "./CropAllocationsCard";
import { PlotTaskCoordinator } from "./PlotTaskCoordinator";
import { SoilAmendmentsLedger } from "./SoilAmendmentsLedger";
import { planService } from "~/api/planService";

export interface DirectoryPlant {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
}

interface CanvasGridProps {
    registeredPlants: DirectoryPlant[];
    activeGardenPlanId: string;
}

export const CanvasGrid: React.FC<CanvasGridProps> = ({
    registeredPlants,
    activeGardenPlanId,
}) => {
    const [grid, setGrid] = useState<GridPlotCell[]>([]);

    const [activeFilterTab, setActiveFilterTab] = useState<
        "Outdoor Bed" | "Seed Tray"
    >("Outdoor Bed");
    const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // 📡 Lifecycle Hook: Run layout data fetch routines every time the season/year changes
    useEffect(() => {
        const hydrateCanvasData = async () => {
            setIsLoading(true);
            try {
                const structuralData =
                    await planService.getContainersByPlanId(activeGardenPlanId);
                setGrid(structuralData);
            } catch (err) {
                console.error(
                    "Failed to sync canvas configuration matrix with .NET API.",
                    err,
                );
            } finally {
                setIsLoading(false);
            }
        };

        hydrateCanvasData();
    }, [activeGardenPlanId]);

    const activeSelectedCell =
        grid.find((c) => c.id === selectedCellId) || null;
    const visibleContainers = grid.filter(
        (c) => c.containerType === activeFilterTab,
    );

    // Helper utility to pass state packets to our SyncState API interceptor script
    const persistStateUpdateToServer = async (
        updatedGridState: GridPlotCell[],
        targetId: string,
    ) => {
        const updatedCell = updatedGridState.find((c) => c.id === targetId);
        if (!updatedCell) return;

        try {
            await planService.syncContainerState(targetId, {
                plantIds: (updatedCell.plantInstances || []).map(
                    (p) => p.plantId,
                ),
                tasks: updatedCell.tasks.map((t) => ({
                    description: t.description,
                    isDone: t.isDone,
                })),
                treatments: updatedCell.treatments.map((trt) => ({
                    type: trt.type,
                    source: trt.source,
                    quantity: trt.quantity,
                })),
            });
        } catch (err) {
            alert(
                "Failed to synchronize state with server database variables.",
            );
        }
    };

    // --- ACTIONS LAYER ---
    const handleAddNewBed = async () => {
        const nextNumber =
            grid.filter((c) => c.containerType === "Outdoor Bed").length + 1;
        const placeholderName = `Raised Bed ${nextNumber}`;

        try {
            // 1. Post creation packet straight to .NET /api/endpoints/gardencontainers/create
            const newBackendId = await planService.createContainer({
                gardenPlanId: activeGardenPlanId,
                name: placeholderName,
                containerType: 1, // Enum matching OutdoorBed
            });

            const newBed: GridPlotCell = {
                id: newBackendId,
                name: placeholderName,
                containerType: "Outdoor Bed",
                plantInstances: [],
                tasks: [],
                treatments: [],
            };
            setGrid([...grid, newBed]);
            setSelectedCellId(newBackendId);
        } catch {
            alert("Could not append new bed row to database.");
        }
    };

    const handleAddNewSeedTray = async () => {
        const nextNumber =
            grid.filter((c) => c.containerType === "Seed Tray").length + 1;
        const placeholderName = `Seed Tray ${nextNumber}`;

        try {
            const newBackendId = await planService.createContainer({
                gardenPlanId: activeGardenPlanId,
                name: placeholderName,
                containerType: 2, // Enum matching SeedTray
            });

            const newTray: GridPlotCell = {
                id: newBackendId,
                name: placeholderName,
                containerType: "Seed Tray",
                plantInstances: [],
                tasks: [],
                treatments: [],
            };
            setGrid([...grid, newTray]);
            setSelectedCellId(newBackendId);
        } catch {
            alert("Could not append new seed tray to database.");
        }
    };

    const handleDeleteCellComplete = async (
        id: string,
        e: React.MouseEvent,
    ) => {
        e.stopPropagation();
        if (
            !confirm(
                "Are you sure you want to permanently drop this bed container profile?",
            )
        )
            return;

        try {
            // Fires straight to your new Cascade Delete class endpoint
            await planService.deleteContainer(id);
            if (selectedCellId === id) setSelectedCellId(null);
            setGrid(grid.filter((c) => c.id !== id));
        } catch {
            alert(
                "Failed to safely prune target container profile from SQL server database.",
            );
        }
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
