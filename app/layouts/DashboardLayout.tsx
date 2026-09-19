// Persistent Sidebar template frame + Top weather alert banner
// app/layouts/DashboardLayout.tsx
import React from "react";
import { Link, Navigate, Outlet, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useWeather } from "../context/WeatherContext";
import { NotificationTray } from "~/features/weather/components/NotificationTray";

export const DashboardLayout: React.FC = () => {
    const { isAuthenticated, logout } = useAuth();
    const { frostData, isLoading } = useWeather();
    const navigate = useNavigate();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    const handleLogout = (): void => {
        logout();
        navigate("/login");
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                fontFamily: "sans-serif",
                overflow: "hidden",
            }}
        >
            {/* Sidebar Navigation Drawer */}
            <aside
                style={{
                    width: "240px",
                    background: "#1e293b",
                    color: "#f8fafc",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    flexShrink: 0,
                }}
            >
                <h2 style={{ margin: 0, color: "#4ade80", fontSize: "22px" }}>
                    🌱 GardenLog
                </h2>
                <nav
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "16px",
                        marginTop: "40px",
                    }}
                >
                    <Link
                        to="/"
                        style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        📊 Dashboard
                    </Link>
                    <Link
                        to="/plan"
                        style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        🗺️ Garden Plan
                    </Link>
                    <Link
                        to="/plants"
                        style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        🌿 Plants Inventory
                    </Link>
                    <Link
                        to="/inventory"
                        style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        📦 Seed Vault
                    </Link>
                    <Link
                        to="/journal"
                        style={{
                            color: "#cbd5e1",
                            textDecoration: "none",
                            fontWeight: "500",
                        }}
                    >
                        📓 Garden Journal
                    </Link>
                </nav>
                <button
                    onClick={handleLogout}
                    style={{
                        marginTop: "auto",
                        background: "#ef4444",
                        color: "white",
                        border: "none",
                        padding: "10px 16px",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontWeight: "600",
                    }}
                >
                    Sign Out
                </button>
            </aside>

            {/* Main Framework Viewport Workspace */}
            <div
                style={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    background: "#f1f5f9",
                }}
            >
                {/* Environmental Metadata Top Bar */}
                <header
                    style={{
                        background: "#ffffff",
                        padding: "16px 32px",
                        borderBottom: "1px solid #e2e8f0",
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        height: "64px",
                        boxSizing: "border-box",
                    }}
                >
                    <span style={{ fontWeight: "600", color: "#334155" }}>
                        Active Cycle: Current Season
                    </span>

                    {isLoading ? (
                        <span style={{ fontSize: "14px", color: "#64748b" }}>
                            Syncing climate parameters...
                        </span>
                    ) : (
                        frostData && (
                            <div
                                style={{
                                    color: "#ea580c",
                                    background: "#ffedd5",
                                    padding: "6px 12px",
                                    borderRadius: "6px",
                                    fontSize: "14px",
                                    fontWeight: "600",
                                }}
                            >
                                ❄️ Expected Last Frost:{" "}
                                {frostData.lastFrostDate}
                            </div>
                        )
                    )}
                </header>
                <NotificationTray />
                {/* Dynamic Nested Page Content Destination */}
                <main
                    style={{
                        flex: 1,
                        padding: "32px",
                        overflowY: "auto",
                        boxSizing: "border-box",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};
