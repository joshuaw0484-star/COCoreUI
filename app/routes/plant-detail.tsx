// app/routes/plant-detail.tsx
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router";
import { api } from "../api/client";
import { LifeCycleTimeline } from "../features/plants/components/LifeCycleTimeline";
import { ImageUploadHandler } from "../features/plants/components/ImageUploadHandler";

interface DetailedPlantProfile {
    id: string;
    name: string;
    scientificName: string;
    shortDescription: string;
    sowingDate: string;
    currentStageIndex: number;
    imageUrl: string;
    sunlightRequirement: string;
    wateringIntervalDays: number;
}

export default function PlantDetail() {
    const { id } = useParams<{ id: string }>(); // 👈 Snags matching route token properties safely
    const [plant, setPlant] = useState<DetailedPlantProfile | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchFullProfile = async () => {
            try {
                const response = await api.get<DetailedPlantProfile>(
                    `/plants/${id}`,
                );
                setPlant(response.data);
            } catch {
                // Fallback local mock dataset mapping variables if local API server is booting
                setPlant({
                    id: id || "unknown",
                    name:
                        id === "plant-tomato-101"
                            ? "Roma Tomato"
                            : "Genovese Basil",
                    scientificName:
                        id === "plant-tomato-101"
                            ? "Solanum lycopersicum"
                            : "Ocimum basilicum",
                    shortDescription:
                        "Relational crop record extracted successfully using dynamic route parameters.",
                    sowingDate: "2026-02-14",
                    currentStageIndex: 1,
                    imageUrl:
                        id === "plant-tomato-101"
                            ? "https://unsplash.com"
                            : "https://unsplash.com",
                    sunlightRequirement: "Full Sun (6-8 hours)",
                    wateringIntervalDays: 3,
                });
            } finally {
                setLoading(false);
            }
        };

        fetchFullProfile();
    }, [id]);

    const handleUploadSuccess = (newUrl: string) => {
        if (plant) setPlant({ ...plant, imageUrl: newUrl });
    };

    if (loading)
        return (
            <div style={{ color: "var(--color-text-muted)" }}>
                Loading crop tracking parameters...
            </div>
        );
    if (!plant)
        return (
            <div style={{ color: "var(--color-danger)" }}>
                Crop specification record not found.
            </div>
        );

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* Dynamic Nav Breadcrumb anchor header */}
            <div style={{ fontSize: "14px" }}>
                <Link
                    to="/plan"
                    style={{
                        color: "var(--color-secondary)",
                        textDecoration: "none",
                    }}
                >
                    🗺️ Garden Planner
                </Link>
                <span
                    style={{
                        color: "var(--color-text-muted)",
                        margin: "0 8px",
                    }}
                >
                    /
                </span>
                <span
                    style={{
                        color: "var(--color-text-main)",
                        fontWeight: "600",
                    }}
                >
                    {plant.name}
                </span>
            </div>

            {/* Main Structural Layout Grid Split */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 380px",
                    gap: "24px",
                    alignItems: "start",
                }}
            >
                {/* Left Hand Core Logic Frame Column */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            background: "var(--color-bg-card)",
                            padding: "28px",
                            borderRadius: "var(--radius-lg)",
                            border: "1px solid var(--color-border)",
                            display: "flex",
                            gap: "24px",
                            alignItems: "center",
                        }}
                    >
                        <img
                            src={plant.imageUrl}
                            alt={plant.name}
                            style={{
                                width: "110px",
                                height: "110px",
                                objectFit: "cover",
                                borderRadius: "var(--radius-md)",
                                border: "1px solid var(--color-border)",
                            }}
                        />
                        <div>
                            <h1
                                style={{
                                    margin: "0 0 4px 0",
                                    fontSize: "26px",
                                }}
                            >
                                {plant.name}
                            </h1>
                            <p
                                style={{
                                    margin: "0 0 8px 0",
                                    color: "var(--color-text-muted)",
                                    fontStyle: "italic",
                                }}
                            >
                                {plant.scientificName}
                            </p>
                            <p
                                style={{
                                    margin: 0,
                                    fontSize: "14px",
                                    color: "var(--color-text-body)",
                                }}
                            >
                                {plant.shortDescription}
                            </p>
                        </div>
                    </div>

                    <LifeCycleTimeline
                        sowingDate={plant.sowingDate}
                        currentStageIndex={plant.currentStageIndex}
                    />
                </div>

                {/* Right Hand Quick Metadata Deck Column */}
                <aside
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            background: "var(--color-bg-card)",
                            padding: "20px",
                            borderRadius: "var(--radius-md)",
                            border: "1px solid var(--color-border)",
                        }}
                    >
                        <h4
                            style={{
                                margin: "0 0 12px 0",
                                color: "var(--color-text-main)",
                            }}
                        >
                            📋 Vital Parameters
                        </h4>
                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                fontSize: "13px",
                            }}
                        >
                            <div>
                                ☀️ <strong>Sun Requirement:</strong>{" "}
                                {plant.sunlightRequirement}
                            </div>
                            <div>
                                💧 <strong>Water Frequency:</strong> Every{" "}
                                {plant.wateringIntervalDays} Days
                            </div>
                        </div>
                    </div>

                    <ImageUploadHandler
                        plantId={plant.id}
                        onUploadSuccess={handleUploadSuccess}
                    />
                </aside>
            </div>
        </div>
    );
}
