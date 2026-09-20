// app/features/garden-plan/components/SoilAmendmentsLedger.tsx
import React, { useState } from "react";
import { type SoilTreatment } from "./PlotCell";

interface SoilAmendmentsLedgerProps {
    treatments: SoilTreatment[];
    onLogTreatment: (type: string, source: string, quantity: string) => void;
}

export const SoilAmendmentsLedger: React.FC<SoilAmendmentsLedgerProps> = ({
    treatments,
    onLogTreatment,
}) => {
    const [type, setType] = useState("Fertilizer");
    const [source, setSource] = useState("");
    const [qty, setQty] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!source || !qty) return;
        onLogTreatment(type, source, qty);
        setSource("");
        setQty("");
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
            <h3 style={{ margin: "0 0 16px 0" }}>🧪 Soil Amendments Ledger</h3>
            <form
                onSubmit={handleSubmit}
                style={{
                    display: "flex",
                    gap: "12px",
                    marginBottom: "20px",
                    flexWrap: "wrap",
                }}
            >
                <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                    }}
                >
                    <option value="Fertilizer">Fertilizer</option>
                    <option value="Homemade Compost">Homemade Compost</option>
                    <option value="Mulch">Mulch</option>
                </select>
                <input
                    type="text"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                    placeholder="Source / Brand..."
                    style={{
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        flex: 1,
                    }}
                />
                <input
                    type="text"
                    value={qty}
                    onChange={(e) => setQty(e.target.value)}
                    placeholder="Qty (e.g. 2 lbs)"
                    style={{
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        width: "150px",
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
                    Record
                </button>
            </form>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {treatments.map((trt) => (
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
                                    padding: "2px 6px",
                                    borderRadius: "4px",
                                    background: "var(--color-bg-card)",
                                    color:
                                        trt.type === "Fertilizer"
                                            ? "#8b5cf6"
                                            : "#b45309",
                                }}
                            >
                                {trt.type}
                            </span>
                            <h4
                                style={{
                                    margin: "8px 0 0 0",
                                    fontSize: "15px",
                                }}
                            >
                                {trt.source}
                            </h4>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <strong>{trt.quantity}</strong>
                            <div
                                style={{
                                    fontSize: "11px",
                                    color: "var(--color-text-muted)",
                                    marginTop: "2px",
                                }}
                            >
                                {trt.date}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
