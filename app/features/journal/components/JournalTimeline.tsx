// app/features/journal/components/JournalTimeline.tsx
import React from "react";
import ReactMarkdown from "react-markdown";

export interface HistoricJournalEntry {
    id: string;
    title: string;
    content: string;
    loggedAt: string;
    weatherSnapshot: string;
    linkedPlantNames: string[];
    isMarkdown: boolean;
}

interface JournalTimelineProps {
    entries: HistoricJournalEntry[];
}

export const JournalTimeline: React.FC<JournalTimelineProps> = ({
    entries,
}) => {
    return (
        <div
            style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
            }}
        >
            <h3 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>
                📜 Past Observations Newsfeed
            </h3>
            <p
                style={{
                    margin: "0 0 24px 0",
                    color: "#64748b",
                    fontSize: "14px",
                }}
            >
                Chronological timeline tracking historical growth data.
            </p>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    position: "relative",
                    maxHeight: "600px",
                    overflowY: "auto",
                    paddingRight: "8px",
                }}
            >
                {entries.length === 0 ? (
                    <p
                        style={{
                            color: "#94a3b8",
                            fontSize: "14px",
                            textAlign: "center",
                            margin: "20px 0",
                        }}
                    >
                        No journal logs committed yet.
                    </p>
                ) : (
                    entries.map((entry, idx) => (
                        <div
                            key={entry.id}
                            style={{
                                display: "flex",
                                gap: "16px",
                                position: "relative",
                            }}
                        >
                            {/* Vertical line graphic decoration */}
                            {idx !== entries.length - 1 && (
                                <div
                                    style={{
                                        position: "absolute",
                                        left: "11px",
                                        top: "24px",
                                        bottom: "-32px",
                                        width: "2px",
                                        background: "#cbd5e1",
                                    }}
                                />
                            )}

                            {/* Timeline dot element */}
                            <div
                                style={{
                                    width: "24px",
                                    height: "24px",
                                    borderRadius: "50%",
                                    background: "#3b82f6",
                                    border: "4px solid #fff",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
                                    zIndex: 2,
                                }}
                            />

                            {/* Entry Content Card Block */}
                            <div
                                style={{
                                    flex: 1,
                                    background: "#f8fafc",
                                    padding: "16px",
                                    borderRadius: "8px",
                                    border: "1px solid #f1f5f9",
                                }}
                            >
                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                        flexWrap: "wrap",
                                        gap: "8px",
                                        marginBottom: "8px",
                                    }}
                                >
                                    <div>
                                        <h4
                                            style={{
                                                margin: 0,
                                                color: "#1e293b",
                                                fontSize: "16px",
                                            }}
                                        >
                                            {entry.title}
                                        </h4>
                                        <span
                                            style={{
                                                fontSize: "12px",
                                                color: "#64748b",
                                            }}
                                        >
                                            {new Date(
                                                entry.loggedAt,
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                    <span
                                        style={{
                                            fontSize: "12px",
                                            background: "#e2e8f0",
                                            color: "#475569",
                                            padding: "4px 8px",
                                            borderRadius: "4px",
                                            fontWeight: "500",
                                        }}
                                    >
                                        🌤️ {entry.weatherSnapshot}
                                    </span>
                                </div>

                                {/* Main Body Parse Field */}
                                <div
                                    style={{
                                        fontSize: "14px",
                                        color: "#334155",
                                        lineHeight: "1.6",
                                        margin: "12px 0",
                                    }}
                                >
                                    {entry.isMarkdown ? (
                                        <ReactMarkdown>
                                            {entry.content}
                                        </ReactMarkdown>
                                    ) : (
                                        <p
                                            style={{
                                                whiteSpace: "pre-wrap",
                                                margin: 0,
                                            }}
                                        >
                                            {entry.content}
                                        </p>
                                    )}
                                </div>

                                {/* Render Relational Tags */}
                                {entry.linkedPlantNames.length > 0 && (
                                    <div
                                        style={{
                                            display: "flex",
                                            flexWrap: "wrap",
                                            gap: "6px",
                                            borderTop: "1px solid #e2e8f0",
                                            paddingTop: "10px",
                                            marginTop: "10px",
                                        }}
                                    >
                                        {entry.linkedPlantNames.map(
                                            (name, i) => (
                                                <span
                                                    key={i}
                                                    style={{
                                                        fontSize: "11px",
                                                        background: "#dcfce7",
                                                        color: "#166534",
                                                        padding: "2px 8px",
                                                        borderRadius: "12px",
                                                        fontWeight: "600",
                                                    }}
                                                >
                                                    🌿 {name}
                                                </span>
                                            ),
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
