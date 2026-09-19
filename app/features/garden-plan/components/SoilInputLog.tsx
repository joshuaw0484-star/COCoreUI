// Fertilizer and compost logging inputs
// app/features/garden-plan/components/SoilInputLog.tsx
import React, { useState } from "react";

interface SoilInputItem {
    id: string;
    inputType:
        | "Fertilizer"
        | "Homemade Compost"
        | "Mulch"
        | "Organic Amendment";
    brandOrSource: string;
    quantity: string;
    applicationDate: string;
}

export const SoilInputLog: React.FC = () => {
    const [inputs, setInputs] = useState<SoilInputItem[]>([
        {
            id: "log-1",
            inputType: "Homemade Compost",
            brandOrSource: "Backyard Bin A",
            quantity: "2 Wheelbarrows",
            applicationDate: "2026-03-01",
        },
        {
            id: "log-2",
            inputType: "Fertilizer",
            brandOrSource: "Organic Tomato Tone (4-4-6)",
            quantity: "3 Cups",
            applicationDate: "2026-03-15",
        },
    ]);

    const [inputType, setInputType] =
        useState<SoilInputItem["inputType"]>("Fertilizer");
    const [source, setSource] = useState("");
    const [qty, setQty] = useState("");

    const handleAddInput = (e: React.FormEvent): void => {
        e.preventDefault();
        if (!source || !qty) return;

        const newItem: SoilInputItem = {
            id: `log-${Date.now()}`,
            inputType,
            brandOrSource: source,
            quantity: qty,
            applicationDate: new Map()
                .set("now", new Date().toISOString().split("T")[0])
                .get("now"),
        };

        setInputs([newItem, ...inputs]);
        setSource("");
        setQty("");
    };

    return (
        <div
            style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "24px",
            }}
        >
            {/* Entry Capture Panel */}
            <form
                onSubmit={handleAddInput}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <h3 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>
                    🧪 Log Soil Amendment
                </h3>

                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#475569",
                            marginBottom: "4px",
                        }}
                    >
                        Input Type
                    </label>
                    <select
                        value={inputType}
                        onChange={(e) => setInputType(e.target.value as any)}
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                        }}
                    >
                        <option value="Fertilizer">Fertilizer</option>
                        <option value="Homemade Compost">
                            Homemade Compost
                        </option>
                        <option value="Mulch">Mulch</option>
                        <option value="Organic Amendment">
                            Organic Amendment
                        </option>
                    </select>
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#475569",
                            marginBottom: "4px",
                        }}
                    >
                        Brand / Source
                    </label>
                    <input
                        type="text"
                        value={source}
                        onChange={(e) => setSource(e.target.value)}
                        placeholder="e.g., Organic Bone Meal, Local Compost Yard"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            color: "#475569",
                            marginBottom: "4px",
                        }}
                    >
                        Quantity
                    </label>
                    <input
                        type="text"
                        value={qty}
                        onChange={(e) => setQty(e.target.value)}
                        placeholder="e.g., 5 lbs, 2 inches"
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: "10px",
                        background: "#10b981",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                        marginTop: "8px",
                    }}
                >
                    Record Treatment
                </button>
            </form>

            {/* Historical Ledger Cards */}
            <div>
                <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>
                    📜 Seasonal Treatment Feed
                </h3>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "12px",
                        maxHeight: "280px",
                        overflowY: "auto",
                    }}
                >
                    {inputs.map((item) => (
                        <div
                            key={item.id}
                            style={{
                                padding: "12px",
                                border: "1px solid #f1f5f9",
                                background: "#f8fafc",
                                borderRadius: "6px",
                            }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    fontSize: "12px",
                                    color: "#64748b",
                                    marginBottom: "4px",
                                }}
                            >
                                <span
                                    style={{
                                        fontWeight: "700",
                                        color:
                                            item.inputType === "Fertilizer"
                                                ? "#8b5cf6"
                                                : "#b45309",
                                    }}
                                >
                                    {item.inputType}
                                </span>
                                <span>{item.applicationDate}</span>
                            </div>
                            <strong
                                style={{ color: "#334155", fontSize: "14px" }}
                            >
                                {item.brandOrSource}
                            </strong>
                            <div
                                style={{
                                    fontSize: "13px",
                                    color: "#475569",
                                    marginTop: "2px",
                                }}
                            >
                                Applied: {item.quantity}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
