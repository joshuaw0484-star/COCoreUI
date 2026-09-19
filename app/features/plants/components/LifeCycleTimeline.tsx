// Visual growth phase stepper tracker
// app/features/plants/components/LifeCycleTimeline.tsx
import React from "react";

interface LifecycleStage {
    label: string;
    description: string;
    isCompleted: boolean;
    isActive: boolean;
}

interface LifeCycleTimelineProps {
    sowingDate: string;
    currentStageIndex: number; // 0: Sown Indoor, 1: Hardening Off, 2: Outdoor Transplant, 3: Harvesting
}

export const LifeCycleTimeline: React.FC<LifeCycleTimelineProps> = ({
    sowingDate,
    currentStageIndex,
}) => {
    const steps: LifecycleStage[] = [
        {
            label: "🌱 Sown Indoor",
            description: `Started on ${sowingDate}`,
            isCompleted: currentStageIndex > 0,
            isActive: currentStageIndex === 0,
        },
        {
            label: "🌬️ Hardening Off",
            description: "Adapting to elements outdoors",
            isCompleted: currentStageIndex > 1,
            isActive: currentStageIndex === 1,
        },
        {
            label: "🏡 Transplanted",
            description: "Moved to physical garden bed",
            isCompleted: currentStageIndex > 2,
            isActive: currentStageIndex === 2,
        },
        {
            label: "🍅 Harvest Window",
            description: "Ready for picking",
            isCompleted: currentStageIndex > 3,
            isActive: currentStageIndex === 3,
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
            <h3 style={{ margin: "0 0 20px 0", color: "#1e293b" }}>
                📈 Active Growth Phase Tracker
            </h3>

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "24px",
                    position: "relative",
                }}
            >
                {steps.map((step, idx) => (
                    <div
                        key={idx}
                        style={{
                            display: "flex",
                            gap: "16px",
                            position: "relative",
                        }}
                    >
                        {/* Structural vertical tracking link bar graphics */}
                        {idx !== steps.length - 1 && (
                            <div
                                style={{
                                    position: "absolute",
                                    left: "11px",
                                    top: "24px",
                                    bottom: "-24px",
                                    width: "2px",
                                    background: step.isCompleted
                                        ? "#22c55e"
                                        : "#e2e8f0",
                                    zIndex: 1,
                                }}
                            />
                        )}

                        {/* Stepper Bullet Indicator Node */}
                        <div
                            style={{
                                width: "24px",
                                height: "24px",
                                borderRadius: "50%",
                                background: step.isCompleted
                                    ? "#22c55e"
                                    : step.isActive
                                      ? "#3b82f6"
                                      : "#ffffff",
                                border: step.isActive
                                    ? "3px solid #3b82f6"
                                    : "2px solid #cbd5e1",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                color: step.isCompleted
                                    ? "white"
                                    : step.isActive
                                      ? "white"
                                      : "#94a3b8",
                                fontSize: "12px",
                                fontWeight: "bold",
                                zIndex: 2,
                                boxSizing: "border-box",
                            }}
                        >
                            {step.isCompleted ? "✓" : idx + 1}
                        </div>

                        {/* Stage Text Labels */}
                        <div>
                            <h4
                                style={{
                                    margin: 0,
                                    color: step.isActive
                                        ? "#1e3a8a"
                                        : "#334155",
                                    fontSize: "15px",
                                    fontWeight: "600",
                                }}
                            >
                                {step.label}{" "}
                                {step.isActive && "🚀 (Current Stage)"}
                            </h4>
                            <p
                                style={{
                                    margin: "4px 0 0 0",
                                    fontSize: "13px",
                                    color: "#64748b",
                                }}
                            >
                                {step.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
