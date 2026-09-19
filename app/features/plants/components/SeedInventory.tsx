// app/features/plants/components/SeedInventory.tsx
import React from "react";

interface SeedPacket {
    id: string;
    plantName: string;
    variety: string;
    packetCount: number;
    expirationYear: number;
    status: "In Stock" | "Low Supply" | "Out of Stock";
}

export const SeedInventory: React.FC = () => {
    const seedVault: SeedPacket[] = [
        {
            id: "pkt-1",
            plantName: "Roma Tomato",
            variety: "San Marzano Heirloom",
            packetCount: 24,
            expirationYear: 2028,
            status: "In Stock",
        },
        {
            id: "pkt-2",
            plantName: "Sweet Basil",
            variety: "Genovese Giant",
            packetCount: 4,
            expirationYear: 2027,
            status: "Low Supply",
        },
        {
            id: "pkt-3",
            plantName: "Bell Pepper",
            variety: "California Wonder",
            packetCount: 0,
            expirationYear: 2025,
            status: "Out of Stock",
        },
    ];

    return (
        <div
            style={{
                background: "white",
                padding: "24px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
            }}
        >
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "16px",
                }}
            >
                <div>
                    <h3 style={{ margin: 0, color: "#1e293b" }}>
                        📦 Seed Packet Storage Bank
                    </h3>
                    <p
                        style={{
                            margin: "4px 0 0 0",
                            color: "#64748b",
                            fontSize: "13px",
                        }}
                    >
                        Future feature block targeting inventory counts matching
                        variant items.
                    </p>
                </div>
                <button
                    style={{
                        padding: "6px 12px",
                        background: "#e2e8f0",
                        color: "#475569",
                        border: "none",
                        borderRadius: "6px",
                        fontSize: "13px",
                        fontWeight: "600",
                        cursor: "not-allowed",
                    }}
                    disabled
                >
                    + Add New Packet Link
                </button>
            </div>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
                }}
            >
                {seedVault.map((packet) => {
                    const badgeColor =
                        packet.status === "In Stock"
                            ? "#dcfce7"
                            : packet.status === "Low Supply"
                              ? "#fef9c3"
                              : "#fee2e2";
                    const textColor =
                        packet.status === "In Stock"
                            ? "#15803d"
                            : packet.status === "Low Supply"
                              ? "#a16207"
                              : "#b91c1c";

                    return (
                        <div
                            key={packet.id}
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                padding: "12px 16px",
                                border: "1px solid #f1f5f9",
                                borderRadius: "6px",
                                background: "#f8fafc",
                            }}
                        >
                            <div>
                                <strong
                                    style={{
                                        color: "#334155",
                                        fontSize: "14px",
                                    }}
                                >
                                    {packet.plantName}
                                </strong>
                                <span
                                    style={{
                                        color: "#64748b",
                                        fontSize: "13px",
                                        marginLeft: "8px",
                                    }}
                                >
                                    ({packet.variety})
                                </span>
                                <div
                                    style={{
                                        fontSize: "11px",
                                        color: "#94a3b8",
                                        marginTop: "2px",
                                    }}
                                >
                                    Expires End of: {packet.expirationYear}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "16px",
                                }}
                            >
                                <div
                                    style={{
                                        fontSize: "13px",
                                        color: "#475569",
                                    }}
                                >
                                    Qty:{" "}
                                    <strong>{packet.packetCount} seeds</strong>
                                </div>
                                <span
                                    style={{
                                        fontSize: "11px",
                                        padding: "4px 8px",
                                        borderRadius: "4px",
                                        background: badgeColor,
                                        color: textColor,
                                        fontWeight: "700",
                                    }}
                                >
                                    {packet.status}
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
