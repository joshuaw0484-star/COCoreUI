// app/routes/tasks.tsx (Updated Four-Scope Task Board)
import React, { useEffect, useState } from "react";
import { api } from "../api/client";

interface ScopeAwareTodo {
    id: string;
    title: string;
    isCompleted: boolean;
    gardenPlanId?: string | null;
    gardenContainerId?: string | null;
    gardenContainerName?: string | null;
    plantId?: string | null;
    plantCommonName?: string | null; // e.g., "Roma Tomato" or "Sweet Basil"
}

export default function GlobalTaskManager() {
    const [tasks, setTasks] = useState<ScopeAwareTodo[]>([]);
    // Extended state manager options to track the 4 unique scopes
    const [activeScopeTab, setActiveScopeTab] = useState<
        "seasonal" | "containers" | "plants" | "general"
    >("seasonal");

    useEffect(() => {
        api.get<ScopeAwareTodo[]>("/todo-items")
            .then((res) => setTasks(res.data))
            .catch(() => {
                // Mock tracking state list including our new crop-scoped items
                setTasks([
                    {
                        id: "t1",
                        title: "Hardening off tomato plugs before last frost",
                        isCompleted: false,
                        gardenPlanId: "plan-2026",
                        gardenContainerId: null,
                    },
                    {
                        id: "t2",
                        title: "Apply nitrogen fertilizer top-dress",
                        isCompleted: false,
                        gardenPlanId: "plan-2026",
                        gardenContainerId: "bed-1",
                        gardenContainerName: "Raised Bed 1",
                    },
                    {
                        id: "t3",
                        title: "Prune lower vine suckers to maximize fruit production",
                        isCompleted: false,
                        gardenPlanId: null,
                        gardenContainerId: null,
                        plantId: "p-101",
                        plantCommonName: "Roma Tomato",
                    },
                    {
                        id: "t4",
                        title: "Clean and oil hand trowels",
                        isCompleted: true,
                        gardenPlanId: null,
                        gardenContainerId: null,
                    },
                ]);
            });
    }, []);

    const handleToggleChore = async (id: string, currentStatus: boolean) => {
        await api.put(`/todo-items/${id}/status`, {
            isCompleted: !currentStatus,
        });
        setTasks((prev) =>
            prev.map((t) =>
                t.id === id ? { ...t, isCompleted: !currentStatus } : t,
            ),
        );
    };

    // 🔍 Scope filter separation logic tree
    const filteredTasks = tasks.filter((t) => {
        if (activeScopeTab === "seasonal")
            return t.gardenPlanId && !t.gardenContainerId && !t.plantId;
        if (activeScopeTab === "containers") return !!t.gardenContainerId;
        if (activeScopeTab === "plants") return !!t.plantId; // 👈 Targets plant-specific tasks
        return !t.gardenPlanId && !t.gardenContainerId && !t.plantId;
    });

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            <div>
                <h1 style={{ margin: "0 0 4px 0" }}>
                    📋 Operational Task Coordinator
                </h1>
                <p style={{ margin: 0, color: "var(--color-text-muted)" }}>
                    Manage overarching seasonal goals alongside local container
                    and specific plant tasks.
                </p>
            </div>

            {/* Scope Selector Navigation Tabs */}
            <div
                style={{
                    display: "flex",
                    background: "var(--color-bg-app)",
                    padding: "4px",
                    borderRadius: "var(--radius-md)",
                    maxWidth: "600px",
                }}
            >
                <button
                    onClick={() => setActiveScopeTab("seasonal")}
                    style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontWeight: "600",
                        background:
                            activeScopeTab === "seasonal"
                                ? "var(--color-bg-card)"
                                : "transparent",
                    }}
                >
                    🍂 Seasonal
                </button>
                <button
                    onClick={() => setActiveScopeTab("containers")}
                    style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontWeight: "600",
                        background:
                            activeScopeTab === "containers"
                                ? "var(--color-bg-card)"
                                : "transparent",
                    }}
                >
                    📦 Beds & Trays
                </button>
                <button
                    onClick={() => setActiveScopeTab("plants")}
                    style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontWeight: "600",
                        background:
                            activeScopeTab === "plants"
                                ? "var(--color-bg-card)"
                                : "transparent",
                    }}
                >
                    🌿 Crops/Plants
                </button>
                <button
                    onClick={() => setActiveScopeTab("general")}
                    style={{
                        flex: 1,
                        padding: "8px",
                        border: "none",
                        borderRadius: "var(--radius-sm)",
                        cursor: "pointer",
                        fontWeight: "600",
                        background:
                            activeScopeTab === "general"
                                ? "var(--color-bg-card)"
                                : "transparent",
                    }}
                >
                    🛠️ General
                </button>
            </div>

            {/* List Output Frame */}
            <div
                style={{
                    background: "var(--color-bg-card)",
                    padding: "24px",
                    borderRadius: "var(--radius-lg)",
                    border: "1px solid var(--color-border)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {filteredTasks.length === 0 ? (
                    <p
                        style={{
                            color: "var(--color-text-muted)",
                            fontStyle: "italic",
                            margin: 0,
                        }}
                    >
                        No active tasks listed within this scope view.
                    </p>
                ) : (
                    filteredTasks.map((todo) => (
                        <div
                            key={todo.id}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "16px",
                                padding: "14px",
                                background: "var(--color-bg-app)",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--color-border)",
                            }}
                        >
                            <input
                                type="checkbox"
                                checked={todo.isCompleted}
                                onChange={() =>
                                    handleToggleChore(todo.id, todo.isCompleted)
                                }
                                style={{
                                    transform: "scale(1.2)",
                                    cursor: "pointer",
                                }}
                            />
                            <div>
                                <span
                                    style={{
                                        fontSize: "15px",
                                        fontWeight: "600",
                                        textDecoration: todo.isCompleted
                                            ? "line-through"
                                            : "none",
                                        color: "var(--color-text-main)",
                                    }}
                                >
                                    {todo.title}
                                </span>
                                {todo.gardenContainerName && (
                                    <span
                                        style={{
                                            display: "block",
                                            fontSize: "11px",
                                            color: "var(--color-text-muted)",
                                            marginTop: "2px",
                                        }}
                                    >
                                        📍 Assigned to Area:{" "}
                                        {todo.gardenContainerName}
                                    </span>
                                )}
                                {todo.plantCommonName && (
                                    <span
                                        style={{
                                            display: "block",
                                            fontSize: "11px",
                                            color: "var(--color-primary-dark)",
                                            fontWeight: "600",
                                            marginTop: "2px",
                                        }}
                                    >
                                        🌿 Target Plant: {todo.plantCommonName}
                                    </span>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
