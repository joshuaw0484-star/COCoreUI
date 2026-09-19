// app/features/garden-plan/components/CanvasGrid.tsx (Part 1)
import React, { useState } from "react";
import { Link } from "react-router";
import {
    PlotCell,
    type GridPlotCell,
    type PlotTask,
    type SoilTreatment,
} from "./PlotCell";

export interface DirectoryPlant {
    id: string;
    name: string;
    shortDescription: string;
    imageUrl: string;
}

interface CanvasGridProps {
    registeredPlants: DirectoryPlant[];
}
// app/features/garden-plan/components/CanvasGrid.tsx (Part 2)
export const CanvasGrid: React.FC<CanvasGridProps> = ({ registeredPlants }) => {
    // Fully customizable runtime dynamic array container
    const [grid, setGrid] = useState<GridPlotCell[]>([
        {
            id: "bed-1",
            name: "Raised Bed 1",
            plantIds: [],
            tasks: [],
            treatments: [],
        },
        {
            id: "bed-2",
            name: "Raised Bed 2",
            plantIds: [],
            tasks: [],
            treatments: [],
        },
    ]);

    const [selectedCellId, setSelectedCellId] = useState<string | null>(null);
    const [selectedPlantId, setSelectedPlantId] = useState<string>("");

    // Local Element Creation Inputs States
    const [taskText, setTaskText] = useState("");
    const [treatmentType, setTreatmentType] = useState("Fertilizer");
    const [treatmentSource, setTreatmentSource] = useState("");
    const [treatmentQty, setTreatmentQty] = useState("");

    const activeSelectedCell =
        grid.find((c) => c.id === selectedCellId) || null;
    // app/features/garden-plan/components/CanvasGrid.tsx (Part 3)
    // ➕ Append an entirely custom new garden cell on the fly
    const handleAddNewBed = () => {
        const nextNumber = grid.length + 1;
        const newCell: GridPlotCell = {
            id: `bed-${Date.now()}`,
            name: `Raised Bed ${nextNumber}`,
            plantIds: [],
            tasks: [],
            treatments: [],
        };
        setGrid([...grid, newCell]);
        setSelectedCellId(newCell.id); // Auto-focus newly instantiated inspector workspace panels
    };

    // ❌ Wipe out an entire crop cell container completely
    const handleDeleteCellComplete = (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Shield baseline propagation from selecting dead cell references
        if (selectedCellId === id) setSelectedCellId(null);
        setGrid(grid.filter((c) => c.id !== id));
    };
    // app/features/garden-plan/components/CanvasGrid.tsx (Part 4)
    const handleAddPlantRelation = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCellId || !selectedPlantId) return;

        setGrid(
            grid.map((c) => {
                if (c.id === selectedCellId) {
                    if (c.plantIds.includes(selectedPlantId)) return c;
                    return { ...c, plantIds: [...c.plantIds, selectedPlantId] };
                }
                return c;
            }),
        );
        setSelectedPlantId("");
    };

    const handleRemovePlantRelation = (plantId: string) => {
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? {
                          ...c,
                          plantIds: c.plantIds.filter((id) => id !== plantId),
                      }
                    : c,
            ),
        );
    };
    // app/features/garden-plan/components/CanvasGrid.tsx (Part 5)
    const handleAddTaskToCell = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCellId || !taskText.trim()) return;

        const newTask: PlotTask = {
            id: `tsk-${Date.now()}`,
            description: taskText.trim(),
            isDone: false,
        };
        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? { ...c, tasks: [...c.tasks, newTask] }
                    : c,
            ),
        );
        setTaskText("");
    };

    const handleToggleTaskStatus = (taskId: string) => {
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
    // app/features/garden-plan/components/CanvasGrid.tsx (Part 6)
    const handleAddSoilTreatment = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCellId || !treatmentSource || !treatmentQty) return;

        const newTreatment: SoilTreatment = {
            id: `trt-${Date.now()}`,
            type: treatmentType,
            source: treatmentSource,
            quantity: treatmentQty,
            date: new Date().toISOString().split("T")[0],
        };

        setGrid(
            grid.map((c) =>
                c.id === selectedCellId
                    ? { ...c, treatments: [newTreatment, ...c.treatments] }
                    : c,
            ),
        );
        setTreatmentSource("");
        setTreatmentQty("");
    };

    const getPlantRecordById = (id: string) =>
        registeredPlants.find((p) => p.id === id);
    const getPlantNameById = (id: string) =>
        getPlantRecordById(id)?.name || "Unknown Crop";
    // app/features/garden-plan/components/CanvasGrid.tsx (Part 7 - Snippet 1)
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                gap: "24px",
                width: "100%",
            }}
        >
            {/* 🗺️ Top Block Section: Responsive Dynamic Grid Canvas */}
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
                    }}
                >
                    <div>
                        <h3
                            style={{
                                margin: 0,
                                color: "var(--color-text-main)",
                            }}
                        >
                            🗺️ Dynamic Garden Grid Matrix
                        </h3>
                        <p
                            style={{
                                margin: "4px 0 0 0",
                                color: "var(--color-text-muted)",
                                fontSize: "14px",
                            }}
                        >
                            Add, customize, or delete plant bed compartments on
                            the fly.
                        </p>
                    </div>
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
                        ➕ Add New Bed
                    </button>
                </div>

                <div
                    style={{
                        display: "grid",
                        gridTemplateColumns:
                            "repeat(auto-fill, minmax(140px, 1fr))",
                        gap: "16px",
                    }}
                >
                    {grid.map((cell) => (
                        <PlotCell
                            key={cell.id}
                            cell={cell}
                            isSelected={selectedCellId === cell.id}
                            onClick={() => setSelectedCellId(cell.id)}
                            onDeleteCell={handleDeleteCellComplete}
                            getPlantNameById={getPlantNameById}
                        />
                    ))}
                </div>
            </div>
            {/* 🛠️ Bottom Block Section: Expanded Vertical Card Inspector Panel */}
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
                        💡 Select any bed unit square inside your main layout
                        array above to load its tracking logs, treatment
                        ledgers, and checklist items.
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
                                color: "var(--color-text-main)",
                                borderBottom: "2px solid var(--color-border)",
                                paddingBottom: "12px",
                            }}
                        >
                            🛠️ Inspector Workspace: {activeSelectedCell.name}
                        </h2>
                        {/* CARD BLOCK 1: CROP ALLOCATIONS (Full Length Landscape Cards) */}
                        <div>
                            <h3
                                style={{
                                    margin: "0 0 16px 0",
                                    color: "var(--color-text-main)",
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "8px",
                                }}
                            >
                                🌿 Crop Allocations
                            </h3>
                            <form
                                onSubmit={handleAddPlantRelation}
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginBottom: "20px",
                                    maxWidth: "500px",
                                }}
                            >
                                <select
                                    value={selectedPlantId}
                                    onChange={(e) =>
                                        setSelectedPlantId(e.target.value)
                                    }
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        flex: 1,
                                    }}
                                >
                                    <option value="">
                                        -- Select Registered Crop From Inventory
                                        --
                                    </option>
                                    {registeredPlants.map((p) => (
                                        <option key={p.id} value={p.id}>
                                            {p.name}
                                        </option>
                                    ))}
                                </select>
                                <button
                                    type="submit"
                                    disabled={!selectedPlantId}
                                    style={{
                                        padding: "10px 20px",
                                        background: "var(--color-primary)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "var(--radius-sm)",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Link to Bed
                                </button>
                            </form>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                {activeSelectedCell.plantIds.map((id) => {
                                    const record = getPlantRecordById(id);
                                    if (!record) return null;
                                    return (
                                        <div
                                            key={id}
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: "20px",
                                                background:
                                                    "var(--color-bg-app)",
                                                padding: "16px",
                                                borderRadius:
                                                    "var(--radius-md)",
                                                border: "1px solid var(--color-border)",
                                            }}
                                        >
                                            <img
                                                src={record.imageUrl}
                                                alt={record.name}
                                                style={{
                                                    width: "64px",
                                                    height: "64px",
                                                    objectFit: "cover",
                                                    borderRadius:
                                                        "var(--radius-sm)",
                                                    border: "1px solid var(--color-border)",
                                                }}
                                            />
                                            <div style={{ flex: 1 }}>
                                                <Link
                                                    to={`/plants/${record.id}`}
                                                    style={{
                                                        textDecoration: "none",
                                                        color: "var(--color-primary-dark)",
                                                        fontWeight: "700",
                                                        fontSize: "16px",
                                                    }}
                                                >
                                                    {record.name} ↗
                                                </Link>
                                                <p
                                                    style={{
                                                        margin: "4px 0 0 0",
                                                        fontSize: "13px",
                                                        color: "var(--color-text-muted)",
                                                    }}
                                                >
                                                    {record.shortDescription}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() =>
                                                    handleRemovePlantRelation(
                                                        id,
                                                    )
                                                }
                                                style={{
                                                    background: "none",
                                                    border: "none",
                                                    color: "var(--color-danger)",
                                                    cursor: "pointer",
                                                    fontWeight: "600",
                                                    fontSize: "14px",
                                                    padding: "8px",
                                                }}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        {/* CARD BLOCK 2: PLOT TASK COORDINATOR (Deep Rich Status Cards) */}
                        <div>
                            <h3
                                style={{
                                    margin: "0 0 16px 0",
                                    color: "var(--color-text-main)",
                                }}
                            >
                                📋 Plot Task Coordinator
                            </h3>
                            <form
                                onSubmit={handleAddTaskToCell}
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginBottom: "20px",
                                    background: "var(--color-bg-app)",
                                    padding: "16px",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--color-border)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <input
                                    type="text"
                                    value={taskText}
                                    onChange={(e) =>
                                        setTaskText(e.target.value)
                                    }
                                    placeholder="Task Title/Action item..."
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        flex: "2 1 200px",
                                    }}
                                />
                                <input
                                    type="date"
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        flex: "1 1 130px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        padding: "10px 20px",
                                        background: "var(--color-secondary)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "var(--radius-sm)",
                                        cursor: "pointer",
                                        fontWeight: "600",
                                    }}
                                >
                                    Add Task
                                </button>
                            </form>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "12px",
                                }}
                            >
                                {activeSelectedCell.tasks.map((t) => (
                                    <div
                                        key={t.id}
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            background: "var(--color-bg-card)",
                                            padding: "16px",
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--color-border)",
                                            borderLeft: t.isDone
                                                ? "4px solid var(--color-success)"
                                                : "4px solid var(--color-warning)",
                                        }}
                                    >
                                        <div style={{ flex: 1 }}>
                                            <strong
                                                style={{
                                                    color: "var(--color-text-main)",
                                                    fontSize: "15px",
                                                    textDecoration: t.isDone
                                                        ? "line-through"
                                                        : "none",
                                                }}
                                            >
                                                {t.description}
                                            </strong>
                                            <div
                                                style={{
                                                    fontSize: "12px",
                                                    color: "var(--color-text-muted)",
                                                    marginTop: "4px",
                                                }}
                                            >
                                                📅 Target Deadline: Pending |
                                                Status:{" "}
                                                <span
                                                    style={{
                                                        fontWeight: "700",
                                                    }}
                                                >
                                                    {t.isDone
                                                        ? "Completed"
                                                        : "Not Started"}
                                                </span>
                                            </div>
                                        </div>
                                        <input
                                            type="checkbox"
                                            checked={t.isDone}
                                            onChange={() =>
                                                handleToggleTaskStatus(t.id)
                                            }
                                            style={{
                                                transform: "scale(1.2)",
                                                cursor: "pointer",
                                            }}
                                        />
                                    </div>
                                ))}
                            </div>
                        </div>
                        {/* CARD BLOCK 3: SOIL AMENDMENTS LEDGER (Mirrors Seasonal Treatment Feed) */}
                        <div>
                            <h3
                                style={{
                                    margin: "0 0 16px 0",
                                    color: "var(--color-text-main)",
                                }}
                            >
                                🧪 Soil Amendments Ledger
                            </h3>
                            <form
                                onSubmit={handleAddSoilTreatment}
                                style={{
                                    display: "flex",
                                    gap: "12px",
                                    marginBottom: "20px",
                                    background: "var(--color-bg-app)",
                                    padding: "16px",
                                    borderRadius: "var(--radius-md)",
                                    border: "1px solid var(--color-border)",
                                    flexWrap: "wrap",
                                }}
                            >
                                <select
                                    value={treatmentType}
                                    onChange={(e) =>
                                        setTreatmentType(e.target.value)
                                    }
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        minWidth: "140px",
                                    }}
                                >
                                    <option value="Fertilizer">
                                        Fertilizer
                                    </option>
                                    <option value="Homemade Compost">
                                        Homemade Compost
                                    </option>
                                    <option value="Mulch">Mulch</option>
                                </select>
                                <input
                                    type="text"
                                    value={treatmentSource}
                                    onChange={(e) =>
                                        setTreatmentSource(e.target.value)
                                    }
                                    placeholder="Brand / Amendment Source..."
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        flex: 1,
                                    }}
                                />
                                <input
                                    type="text"
                                    value={treatmentQty}
                                    onChange={(e) =>
                                        setTreatmentQty(e.target.value)
                                    }
                                    placeholder="Quantity Used (e.g. 5 lbs)"
                                    style={{
                                        padding: "10px",
                                        borderRadius: "var(--radius-sm)",
                                        border: "1px solid var(--color-border)",
                                        width: "160px",
                                    }}
                                />
                                <button
                                    type="submit"
                                    style={{
                                        padding: "10px 20px",
                                        background: "var(--color-success)",
                                        color: "white",
                                        border: "none",
                                        borderRadius: "var(--radius-sm)",
                                        fontWeight: "600",
                                        cursor: "pointer",
                                    }}
                                >
                                    Record Treatment
                                </button>
                            </form>

                            <div
                                style={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "10px",
                                }}
                            >
                                {activeSelectedCell.treatments.map((trt) => (
                                    <div
                                        key={trt.id}
                                        style={{
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            padding: "14px 20px",
                                            background: "var(--color-bg-app)",
                                            borderRadius: "var(--radius-md)",
                                            border: "1px solid var(--color-border)",
                                        }}
                                    >
                                        <div>
                                            <span
                                                style={{
                                                    fontSize: "11px",
                                                    fontWeight: "700",
                                                    textTransform: "uppercase",
                                                    padding: "2px 6px",
                                                    borderRadius: "4px",
                                                    background:
                                                        "var(--color-bg-card)",
                                                    color:
                                                        trt.type ===
                                                        "Fertilizer"
                                                            ? "#8b5cf6"
                                                            : "#b45309",
                                                    border: "1px solid var(--color-border)",
                                                }}
                                            >
                                                {trt.type}
                                            </span>
                                            <h4
                                                style={{
                                                    margin: "8px 0 2px 0",
                                                    fontSize: "15px",
                                                }}
                                            >
                                                {trt.source}
                                            </h4>
                                        </div>
                                        <div style={{ textAlign: "right" }}>
                                            <strong
                                                style={{
                                                    color: "var(--color-text-body)",
                                                    fontSize: "14px",
                                                }}
                                            >
                                                {trt.quantity}
                                            </strong>
                                            <div
                                                style={{
                                                    fontSize: "11px",
                                                    color: "var(--color-text-muted)",
                                                    marginTop: "2px",
                                                }}
                                            >
                                                Logged: {trt.date}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
