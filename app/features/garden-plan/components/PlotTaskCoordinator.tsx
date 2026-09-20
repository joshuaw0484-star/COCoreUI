// app/features/garden-plan/components/PlotTaskCoordinator.tsx
import React, { useState } from "react";
import { type PlotTask } from "./PlotCell";

interface PlotTaskCoordinatorProps {
    tasks: PlotTask[];
    onAddTask: (description: string) => void;
    onToggleTask: (taskId: string) => void;
}

export const PlotTaskCoordinator: React.FC<PlotTaskCoordinatorProps> = ({
    tasks,
    onAddTask,
    onToggleTask,
}) => {
    const [taskText, setTaskText] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!taskText.trim()) return;
        onAddTask(taskText.trim());
        setTaskText("");
    };

    return (
        <div
            style={{
                background: "var(--color-bg-card)",
                padding: "20px",
                borderRadius: "var(--radius-md)",
                border: "1px solid var(--color-border)",
            }}
        >
            <h3 style={{ margin: "0 0 16px 0" }}>📋 Plot Task Coordinator</h3>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                }}
            >
                <input
                    type="text"
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                    placeholder="Action text..."
                    style={{
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        flex: "2 1 200px",
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
                        fontWeight: "600",
                        cursor: "pointer",
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
                {tasks.map((t) => (
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
                                Status:{" "}
                                {t.isDone
                                    ? "Completed"
                                    : "Active / In Progress"}
                            </div>
                        </div>
                        <input
                            type="checkbox"
                            checked={t.isDone}
                            onChange={() => onToggleTask(t.id)}
                            style={{
                                transform: "scale(1.2)",
                                cursor: "pointer",
                            }}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};
