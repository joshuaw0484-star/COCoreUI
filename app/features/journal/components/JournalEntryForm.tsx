// app/features/journal/components/JournalEntryForm.tsx
import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import { api } from "../../../api/client";

interface TaggedPlant {
    id: string;
    name: string;
}

interface JournalEntryFormProps {
    activeGardenPlanId: string;
    availablePlants: TaggedPlant[];
    currentWeatherSummary: string; // From your WeatherContext data stream
}

export const JournalEntryForm: React.FC<JournalEntryFormProps> = ({
    activeGardenPlanId,
    availablePlants,
    currentWeatherSummary,
}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [entryDateTime, setEntryDateTime] = useState(() =>
        new Date().toISOString().slice(0, 16),
    );
    const [selectedPlantIds, setSelectedPlantIds] = useState<string[]>([]);
    const [editorMode, setEditorMode] = useState<"normal" | "markdown">(
        "normal",
    );
    const [isSaving, setIsSaving] = useState(false);

    const togglePlantTag = (id: string) => {
        setSelectedPlantIds((prev) =>
            prev.includes(id)
                ? prev.filter((pId) => pId !== id)
                : [...prev, id],
        );
    };

    const handleSaveEntry = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            // Maps exactly to your backend relation constraints
            await api.post("/journal/entries", {
                gardenPlanId: activeGardenPlanId,
                title,
                content,
                loggedAt: entryDateTime,
                weatherSnapshot: currentWeatherSummary,
                linkedPlantIds: selectedPlantIds,
            });

            setTitle("");
            setContent("");
            setSelectedPlantIds([]);
            alert("Journal entry recorded successfully!");
        } catch (err) {
            console.error("Failed to commit diary entry.", err);
        } finally {
            setIsSaving(false);
        }
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
            {/* Input Form Fields Layer */}
            <form
                onSubmit={handleSaveEntry}
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                }}
            >
                <h3 style={{ margin: 0, color: "#1e293b" }}>
                    📝 Create Relational Log
                </h3>

                <div style={{ fontSize: "12px", color: "#64748b" }}>
                    Bound to Plan ID: <strong>{activeGardenPlanId}</strong> |
                    Climate Snapshot: <strong>{currentWeatherSummary}</strong>
                </div>

                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "4px",
                        }}
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
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
                            marginBottom: "4px",
                        }}
                    >
                        Timestamp
                    </label>
                    <input
                        type="datetime-local"
                        value={entryDateTime}
                        onChange={(e) => setEntryDateTime(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                {/* Link Resource Mappings */}
                <div>
                    <label
                        style={{
                            display: "block",
                            fontSize: "13px",
                            fontWeight: "600",
                            marginBottom: "6px",
                        }}
                    >
                        Tag Active Crops
                    </label>
                    <div
                        style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                        }}
                    >
                        {availablePlants.map((plant) => {
                            const isSelected = selectedPlantIds.includes(
                                plant.id,
                            );
                            return (
                                <button
                                    type="button"
                                    key={plant.id}
                                    onClick={() => togglePlantTag(plant.id)}
                                    style={{
                                        padding: "4px 10px",
                                        borderRadius: "12px",
                                        border: "1px solid",
                                        fontSize: "12px",
                                        cursor: "pointer",
                                        background: isSelected
                                            ? "#dbeafe"
                                            : "#f1f5f9",
                                        color: isSelected
                                            ? "#1e40af"
                                            : "#475569",
                                        borderColor: isSelected
                                            ? "#bfdbfe"
                                            : "#cbd5e1",
                                    }}
                                >
                                    {plant.name}
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Dynamic Workspace Modes Selector */}
                <div>
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            marginBottom: "4px",
                        }}
                    >
                        <label style={{ fontSize: "13px", fontWeight: "600" }}>
                            Log Text Details
                        </label>
                        <div
                            style={{
                                fontSize: "12px",
                                border: "1px solid #cbd5e1",
                                borderRadius: "4px",
                                overflow: "hidden",
                            }}
                        >
                            <button
                                type="button"
                                onClick={() => setEditorMode("normal")}
                                style={{
                                    padding: "2px 8px",
                                    border: "none",
                                    cursor: "pointer",
                                    background:
                                        editorMode === "normal"
                                            ? "#e2e8f0"
                                            : "white",
                                }}
                            >
                                Normal
                            </button>
                            <button
                                type="button"
                                onClick={() => setEditorMode("markdown")}
                                style={{
                                    padding: "2px 8px",
                                    border: "none",
                                    cursor: "pointer",
                                    background:
                                        editorMode === "markdown"
                                            ? "#e2e8f0"
                                            : "white",
                                }}
                            >
                                Markdown
                            </button>
                        </div>
                    </div>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={6}
                        placeholder={
                            editorMode === "markdown"
                                ? "Use standard ## headers, * lists, or **bolding** text..."
                                : "Write a normal text summary..."
                        }
                        style={{
                            width: "100%",
                            padding: "8px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            fontFamily: "inherit",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSaving}
                    style={{
                        padding: "10px",
                        background: "#3b82f6",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: "pointer",
                    }}
                >
                    {isSaving ? "Saving Entry..." : "Save Journal Log"}
                </button>
            </form>

            {/* Real-time Render Preview Frame */}
            <div
                style={{
                    background: "#f8fafc",
                    padding: "20px",
                    borderRadius: "6px",
                    border: "1px solid #e2e8f0",
                    overflowY: "auto",
                }}
            >
                <h4
                    style={{
                        margin: "0 0 12px 0",
                        color: "#475569",
                        fontSize: "12px",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                    }}
                >
                    Live Output Render Preview
                </h4>
                <h2 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>
                    {title || "Untitled Entry"}
                </h2>

                <div
                    style={{
                        fontSize: "14px",
                        color: "#334155",
                        lineHeight: "1.6",
                    }}
                >
                    {editorMode === "markdown" ? (
                        <ReactMarkdown>
                            {content || "*No content entered yet.*"}
                        </ReactMarkdown>
                    ) : (
                        <p style={{ whiteSpace: "pre-wrap" }}>
                            {content || "No content entered yet."}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};
