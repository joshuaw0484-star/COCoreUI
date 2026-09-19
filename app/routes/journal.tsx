// app/routes/journal.tsx
import React, { useState } from "react";
import { JournalEntryForm } from "../features/journal/components/JournalEntryForm";
import {
    JournalTimeline,
    type HistoricJournalEntry,
} from "../features/journal/components/JournalTimeline";
import {
    JournalImageGallery,
    type JournalImage,
} from "../features/journal/components/JournalImageGallery";

export default function JournalPage() {
    const dummyPlants = [
        { id: "p-1", name: "Roma Tomato" },
        { id: "p-2", name: "Genovese Basil" },
        { id: "p-3", name: "California Pepper" },
    ];

    // Mock historical log lists mapped from .NET Web APIs
    const [historicEntries] = useState<HistoricJournalEntry[]>([
        {
            id: "ent-1",
            title: "First Sprout Sighted",
            content:
                "The ## Roma Tomatoes have officially cracked soil matrix layers indoors! \n\n* Total germination count: 12/12\n* Watering status: Light bottom misting.",
            loggedAt: "2026-09-15T08:30",
            weatherSnapshot: "Overcast, 58°F",
            linkedPlantNames: ["Roma Tomato"],
            isMarkdown: true,
        },
        {
            id: "ent-2",
            title: "Pruning Routine Done",
            content:
                "Pinched the terminal buds off the sweet basil plants today to encourage a bushier branch configuration layer profile.",
            loggedAt: "2026-09-18T14:15",
            weatherSnapshot: "Sunny, 72°F",
            linkedPlantNames: ["Genovese Basil"],
            isMarkdown: false,
        },
    ]);

    const [galleryImages] = useState<JournalImage[]>([
        {
            id: "img-1",
            url: "https://unsplash.com",
            caption: "Cotyledons fully standing up",
            plantName: "Roma Tomato",
            uploadedAt: "2026-09-15",
        },
        {
            id: "img-2",
            url: "https://unsplash.com",
            caption: "First true leaves showing node definition",
            plantName: "Genovese Basil",
            uploadedAt: "2026-09-18",
        },
    ]);

    return (
        <div
            style={{
                display: "grid",
                gridTemplateColumns: "1fr 400px",
                gap: "24px",
                alignItems: "start",
            }}
        >
            {/* Primary Column Workspace (Left Side) */}
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                }}
            >
                <div>
                    <h1 style={{ margin: "0 0 4px 0", color: "#0f172a" }}>
                        Garden Notebook & Diary
                    </h1>
                    <p style={{ margin: 0, color: "#64748b" }}>
                        Log observations, link layout components, and evaluate
                        seasonal charts.
                    </p>
                </div>

                <JournalEntryForm
                    activeGardenPlanId="plan-2026-autumn"
                    availablePlants={dummyPlants}
                    currentWeatherSummary="Clear Sky, 70°F"
                />

                <JournalTimeline entries={historicEntries} />
            </div>

            {/* Auxiliary Column Workspace Panels (Right Side) */}
            <aside
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    marginTop: "68px",
                }}
            >
                <JournalImageGallery images={galleryImages} />
            </aside>
        </div>
    );
}
