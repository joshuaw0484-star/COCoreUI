// app/features/garden-plan/components/CropAllocationsCard.tsx
import React, { useState } from "react";
import { Link } from "react-router";
import { type DirectoryPlant, type PlantInstance } from "./PlotCell";

interface CropAllocationsCardProps {
    plantInstances: PlantInstance[];
    registeredPlants: DirectoryPlant[];
    onAddPlant: (plantId: string) => void;
    onRemovePlant: (instanceId: string) => void;
}

export const CropAllocationsCard: React.FC<CropAllocationsCardProps> = ({
    plantInstances,
    registeredPlants,
    onAddPlant,
    onRemovePlant,
}) => {
    const [selectedPlantId, setSelectedPlantId] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedPlantId) return;
        onAddPlant(selectedPlantId);
        setSelectedPlantId("");
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
            <h3 style={{ margin: "0 0 16px 0" }}>🌿 Crop Allocations</h3>
            <form
                onSubmit={handleSubmit}
                style={{ display: "flex", gap: "12px", marginBottom: "20px" }}
            >
                <select
                    value={selectedPlantId}
                    onChange={(e) => setSelectedPlantId(e.target.value)}
                    style={{
                        padding: "10px",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--color-border)",
                        flex: 1,
                    }}
                >
                    <option value="">-- Choose Target Plant Profiles --</option>
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
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    Link Crop
                </button>
            </form>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                }}
            >
                {plantInstances.map((item) => {
                    const record = registeredPlants.find(
                        (p) => p.id === item.plantId,
                    );
                    if (!record) return null;
                    return (
                        <div
                            key={item.instanceId}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "20px",
                                background: "var(--color-bg-app)",
                                padding: "16px",
                                borderRadius: "var(--radius-md)",
                            }}
                        >
                            <img
                                src={record.imageUrl}
                                alt={record.name}
                                style={{
                                    width: "64px",
                                    height: "64px",
                                    objectFit: "cover",
                                    borderRadius: "var(--radius-sm)",
                                }}
                            />
                            <div style={{ flex: 1 }}>
                                <Link
                                    to={`/plants/${record.id}`}
                                    style={{
                                        textDecoration: "none",
                                        color: "var(--color-primary-dark)",
                                        fontWeight: "700",
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
                                onClick={() => onRemovePlant(item.instanceId)}
                                style={{
                                    background: "none",
                                    border: "none",
                                    color: "var(--color-danger)",
                                    cursor: "pointer",
                                    fontWeight: "600",
                                }}
                            >
                                Remove
                            </button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
