// Interactive bed layout grid canvas
// app/features/garden-plan/components/CanvasGrid.tsx
import React, { useState } from "react";

interface GridPlotCell {
    row: number;
    col: number;
    plantName: string | null;
}

export const CanvasGrid: React.FC = () => {
    // Generate a standard 4x4 sample gardening layout matrix frame
    const [grid, setGrid] = useState<GridPlotCell[]>(() => {
        const cells: GridPlotCell[] = [];
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                cells.push({
                    row: r,
                    col: c,
                    plantName: r === 0 && c === 1 ? "Tomato" : null,
                });
            }
        }
        return cells;
    });

    const [selectedCell, setSelectedCell] = useState<GridPlotCell | null>(null);

    const handleCellClick = (cell: GridPlotCell): void => {
        setSelectedCell(cell);
    };

    return (
        <div
            style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
            }}
        >
            <h3 style={{ margin: "0 0 8px 0", color: "#1e293b" }}>
                🗺️ Interactive Bed Visualizer Grid
            </h3>
            <p
                style={{
                    margin: "0 0 24px 0",
                    color: "#64748b",
                    fontSize: "14px",
                }}
            >
                Select a plot unit square to assign crops or track localized
                seasonal configurations.
            </p>

            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(4, 1fr)",
                    gap: "12px",
                    maxWidth: "400px",
                    margin: "0 auto",
                }}
            >
                {grid.map((cell, idx) => (
                    <div
                        key={idx}
                        onClick={() => handleCellClick(cell)}
                        style={{
                            aspectRatio: "1",
                            background: cell.plantName ? "#bbf7d0" : "#f8fafc",
                            border:
                                selectedCell?.row === cell.row &&
                                selectedCell?.col === cell.col
                                    ? "3px solid #22c55e"
                                    : "1px solid #cbd5e1",
                            borderRadius: "6px",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            cursor: "pointer",
                            transition: "all 0.2s ease-in-out",
                            fontSize: "12px",
                            fontWeight: "600",
                            color: "#1e293b",
                        }}
                    >
                        {cell.plantName
                            ? `🌿 ${cell.plantName}`
                            : `(${cell.row}, ${cell.col})`}
                    </div>
                ))}
            </div>

            {selectedCell && (
                <div
                    style={{
                        marginTop: "24px",
                        padding: "16px",
                        background: "#f8fafc",
                        borderRadius: "6px",
                        border: "1px solid #e2e8f0",
                    }}
                >
                    <h4 style={{ margin: "0 0 6px 0", color: "#334155" }}>
                        Active Cell Diagnostics
                    </h4>
                    <p
                        style={{
                            margin: 0,
                            fontSize: "14px",
                            color: "#64748b",
                        }}
                    >
                        Coordinates: Row {selectedCell.row + 1}, Column{" "}
                        {selectedCell.col + 1} <br />
                        Occupant Resource:{" "}
                        <strong style={{ color: "#16a34a" }}>
                            {selectedCell.plantName || "Empty Plot Fallow"}
                        </strong>
                    </p>
                </div>
            )}
        </div>
    );
};
