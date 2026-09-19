// Page: Overview hub screen matrix
// app/routes/dashboard.tsx
import React from "react";
import { useWeather } from "../context/WeatherContext";

export default function Dashboard() {
    const { forecast, isLoading, error } = useWeather();

    return (
        <div>
            <h1 style={{ margin: "0 0 8px 0", color: "#0f172a" }}>
                Welcome Back, Gardener
            </h1>
            <p style={{ margin: "0 0 32px 0", color: "#64748b" }}>
                Here is what is happening across your plots today.
            </p>

            {/* Grid Layout Hub Matrix */}
            <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr",
                    gap: "24px",
                }}
            >
                {/* Left Column Workspace Frame */}
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "24px",
                    }}
                >
                    <div
                        style={{
                            background: "white",
                            padding: "24px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>
                            📋 Task Checklist Queue
                        </h3>
                        <p style={{ color: "#64748b" }}>
                            No urgent chores generated. Check weather alerts
                            before watering.
                        </p>
                    </div>
                </div>

                {/* Right Column Weather Column Viewport */}
                <div>
                    <div
                        style={{
                            background: "white",
                            padding: "24px",
                            borderRadius: "8px",
                            border: "1px solid #e2e8f0",
                        }}
                    >
                        <h3 style={{ margin: "0 0 16px 0", color: "#1e293b" }}>
                            🌤️ 3-Day Microclimate Outlook
                        </h3>

                        {isLoading && (
                            <p style={{ color: "#64748b" }}>
                                Syncing .NET parameters...
                            </p>
                        )}
                        {error && <p style={{ color: "#ef4444" }}>{error}</p>}

                        <div
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "12px",
                            }}
                        >
                            {forecast?.map((day, index) => (
                                <div
                                    key={index}
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "center",
                                        padding: "12px",
                                        background: "#f8fafc",
                                        borderRadius: "6px",
                                        border: "1px solid #f1f5f9",
                                    }}
                                >
                                    <div>
                                        <strong
                                            style={{
                                                display: "block",
                                                color: "#334155",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {day.date}
                                        </strong>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                            }}
                                        >
                                            {day.conditionSummary}
                                        </span>
                                    </div>
                                    <div style={{ textAlign: "right" }}>
                                        <span
                                            style={{
                                                fontWeight: "600",
                                                color: "#1e293b",
                                                fontSize: "14px",
                                            }}
                                        >
                                            {day.temperatureHigh}°F
                                        </span>
                                        <span
                                            style={{
                                                display: "block",
                                                fontSize: "11px",
                                                color: "#3b82f6",
                                            }}
                                        >
                                            💧 {day.precipitationChance}%
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
