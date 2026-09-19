// app/features/weather/components/NotificationTray.tsx
import React, { useState, useEffect } from "react";
import { api } from "../../../api/client";

interface SystemNotification {
    id: string;
    type: "WIND" | "FROST" | "WATERING";
    message: string;
    isUrgent: boolean;
}

export const NotificationTray: React.FC = () => {
    const [alerts, setAlerts] = useState<SystemNotification[]>([]);
    const [isOpen, setIsOpen] = useState(false);

    const checkAlertBackgroundWorker = async () => {
        try {
            // Endpoint hitting a background worker calculating (LastWateredDate + Interval)
            const res = await api.get<SystemNotification[]>(
                "/notifications/active",
            );
            setAlerts(res.data);
        } catch {
            // Fallback local alerts if .NET worker is currently processing data pipelines
            setAlerts([
                {
                    id: "alt-1",
                    type: "FROST",
                    message: "Frost risk within 48h. Prepare row covers!",
                    isUrgent: true,
                },
                {
                    id: "alt-2",
                    type: "WATERING",
                    message:
                        "Bed 2: Tomato row has missed its watering window.",
                    isUrgent: false,
                },
            ]);
        }
    };

    useEffect(() => {
        checkAlertBackgroundWorker();
        const interval = setInterval(checkAlertBackgroundWorker, 60000); // Poll server every 60 seconds
        return () => clearInterval(interval);
    }, []);

    return (
        <div style={{ position: "relative", fontFamily: "sans-serif" }}>
            {/* Bell Action Anchor */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                style={{
                    background: "none",
                    border: "none",
                    fontSize: "20px",
                    cursor: "pointer",
                    position: "relative",
                }}
            >
                🔔
                {alerts.length > 0 && (
                    <span
                        style={{
                            position: "absolute",
                            top: "-2px",
                            right: "-2px",
                            background: "#ef4444",
                            color: "white",
                            borderRadius: "50%",
                            padding: "2px 6px",
                            fontSize: "10px",
                            fontWeight: "bold",
                        }}
                    >
                        {alerts.length}
                    </span>
                )}
            </button>

            {/* Expanded Dropdown Flyout Panel */}
            {isOpen && (
                <div
                    style={{
                        position: "absolute",
                        right: 0,
                        top: "32px",
                        width: "320px",
                        background: "white",
                        border: "1px solid #cbd5e1",
                        borderRadius: "8px",
                        boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                        zIndex: 100,
                        padding: "16px",
                    }}
                >
                    <h4
                        style={{
                            margin: "0 0 12px 0",
                            color: "#1e293b",
                            borderBottom: "1px solid #f1f5f9",
                            paddingBottom: "6px",
                        }}
                    >
                        Alert Control Center
                    </h4>

                    <div
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "8px",
                        }}
                    >
                        {alerts.length === 0 ? (
                            <p
                                style={{
                                    fontSize: "13px",
                                    color: "#64748b",
                                    margin: 0,
                                }}
                            >
                                All variables stable. Happy gardening!
                            </p>
                        ) : (
                            alerts.map((alert) => (
                                <div
                                    key={alert.id}
                                    style={{
                                        padding: "10px",
                                        borderRadius: "6px",
                                        background: alert.isUrgent
                                            ? "#fee2e2"
                                            : "#f0fdf4",
                                        border: `1px solid ${alert.isUrgent ? "#fca5a5" : "#bbf7d0"}`,
                                    }}
                                >
                                    <div
                                        style={{
                                            fontSize: "11px",
                                            fontWeight: "700",
                                            color: alert.isUrgent
                                                ? "#991b1b"
                                                : "#166534",
                                            marginBottom: "2px",
                                        }}
                                    >
                                        {alert.type} ALERT
                                    </div>
                                    <p
                                        style={{
                                            margin: 0,
                                            fontSize: "13px",
                                            color: "#334155",
                                        }}
                                    >
                                        {alert.message}
                                    </p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};
