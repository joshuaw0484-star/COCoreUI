// Page: Active seed and plant library listings
// app/routes/plants.tsx
import React, { useState } from "react";
import { LifeCycleTimeline } from "../features/plants/components/LifeCycleTimeline";
import { ImageUploadHandler } from "../features/plants/components/ImageUploadHandler";
import { PestTracker } from "../features/plants/components/PestTracker";

export default function Plants() {
    // Mock data representing a selected plant from your .NET API
    const [plant, setPlant] = useState({
        id: "tomato-roma-101",
        name: "Roma Tomato",
        scientificName: "Solanum lycopersicum",
        sowingDate: "Feb 14, 2026",
        currentStageIndex: 1, // Currently in Hardening Off phase
        imageUrl: "https://unsplash.com",
    });

    const handleUploadSuccess = (newImageUrl: string) => {
        setPlant((prev) => ({
            ...prev,
            imageUrl: newImageUrl,
        }));
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
            {/* 1. Profile Hero Section */}
            <div
                style={{
                    background: "white",
                    padding: "24px",
                    borderRadius: "8px",
                    border: "1px solid #e2e8f0",
                    display: "flex",
                    gap: "24px",
                    alignItems: "center",
                }}
            >
                <img
                    src={plant.imageUrl}
                    alt={plant.name}
                    style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "8px",
                        border: "1px solid #cbd5e1",
                    }}
                />
                <div>
                    <h1 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                        {plant.name}
                    </h1>
                    <p
                        style={{
                            margin: "0 0 12px 0",
                            color: "#64748b",
                            fontStyle: "italic",
                        }}
                    >
                        {plant.scientificName}
                    </p>
                    <span
                        style={{
                            padding: "4px 12px",
                            background: "#dbeafe",
                            color: "#1e40af",
                            borderRadius: "12px",
                            fontSize: "12px",
                            fontWeight: "600",
                        }}
                    >
                        ID: {plant.id}
                    </span>
                </div>
            </div>

            {/* 2. Main Workspace Layout Grid */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 380px",
                    gap: "24px",
                    alignItems: "start",
                }}
            >
                {/* Left Column: Primary Growth Tracking */}
                <section
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <LifeCycleTimeline
                        sowingDate={plant.sowingDate}
                        currentStageIndex={plant.currentStageIndex}
                    />

                    <PestTracker />
                </section>

                {/* Right Column: Asset Controls & Management Panel */}
                <aside
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <ImageUploadHandler
                        plantId={plant.id}
                        onUploadSuccess={handleUploadSuccess}
                    />

                    <div
                        style={{
                            background: "white",
                            padding: "24px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <h4 style={{ margin: "0 0 12px 0", color: "#334155" }}>
                            📝 Plant Directory Helper
                        </h4>
                        <p
                            style={{
                                margin: 0,
                                color: "#64748b",
                                fontSize: "14px",
                                lineHeight: "1.5",
                            }}
                        >
                            The elements displayed here represent active links
                            to your **.NET SQL schema**. Uploading a picture
                            drops a file directly into your multi-part content
                            controllers.
                        </p>
                    </div>
                </aside>
            </div>
        </div>
    );
}
