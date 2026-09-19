// Page: Login entry container shell
// app/routes/login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { api } from "../api/client";

interface LoginResponse {
    token: string;
}

export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (
        e: React.FormEvent<HTMLFormElement>,
    ): Promise<void> => {
        e.preventDefault();
        setError(null);
        setSubmitting(true);

        try {
            // Direct POST payload matching your standard .NET Auth Identity structures
            const response = await api.post<LoginResponse>("/auth/login", {
                email,
                password,
            });
            login(response.data.token);
            navigate("/", { replace: true });
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Invalid credentials. Please verify data inputs.",
            );
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div
            style={{
                display: "flex",
                height: "100vh",
                alignItems: "center",
                justifyContent: "center",
                background: "#f1f5f9",
            }}
        >
            <form
                onSubmit={handleSubmit}
                style={{
                    background: "#ffffff",
                    padding: "40px",
                    borderRadius: "8px",
                    boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                    width: "100%",
                    maxWidth: "400px",
                }}
            >
                <h2
                    style={{
                        margin: "0 0 24px 0",
                        color: "#1e293b",
                        textAlign: "center",
                    }}
                >
                    🌱 GardenLog Login
                </h2>

                {error && (
                    <div
                        style={{
                            background: "#fee2e2",
                            color: "#991b1b",
                            padding: "12px",
                            borderRadius: "6px",
                            marginBottom: "16px",
                            fontSize: "14px",
                        }}
                    >
                        {error}
                    </div>
                )}

                <div style={{ marginBottom: "16px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#475569",
                        }}
                    >
                        Email Address
                    </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <div style={{ marginBottom: "24px" }}>
                    <label
                        style={{
                            display: "block",
                            marginBottom: "6px",
                            fontSize: "14px",
                            fontWeight: "600",
                            color: "#475569",
                        }}
                    >
                        Password
                    </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{
                            width: "100%",
                            padding: "10px",
                            borderRadius: "6px",
                            border: "1px solid #cbd5e1",
                            boxSizing: "border-box",
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={submitting}
                    style={{
                        width: "100%",
                        padding: "12px",
                        background: "#22c55e",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        fontWeight: "600",
                        cursor: submitting ? "not-allowed" : "pointer",
                    }}
                >
                    {submitting ? "Signing In..." : "Sign In"}
                </button>
            </form>
        </div>
    );
}
