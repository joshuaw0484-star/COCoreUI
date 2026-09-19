// app/features/plants/components/ImageUploadHandler.tsx
import React, { useState, type ChangeEvent } from "react";
import { api } from "../../../api/client";

interface ImageUploadHandlerProps {
    plantId: string;
    onUploadSuccess: (imageUrl: string) => void;
}

export const ImageUploadHandler: React.FC<ImageUploadHandlerProps> = ({
    plantId,
    onUploadSuccess,
}) => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setError(null);
        const file = e.target.files?.[0];
        if (!file) return;

        // Validate it's an image asset
        if (!file.type.startsWith("image/")) {
            setError("Please select a valid image file.");
            return;
        }

        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Create optimistic local browser preview URL
    };

    const handleUpload = async (): Promise<void> => {
        if (!selectedFile) return;

        setIsUploading(true);
        setError(null);

        // Build standard multipart browser object
        const formData = new FormData();
        formData.append("plantId", plantId);
        formData.append("imageFile", selectedFile); // Must exactly match the IFormFile attribute name in .NET Controller

        try {
            const response = await api.post<{ imageUrl: string }>(
                "/plants/upload-image",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data", // Forces correct boundary calculation headers
                    },
                },
            );
            onUploadSuccess(response.data.imageUrl);
            setSelectedFile(null);
            setPreviewUrl(null);
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                    "Failed to stream asset to server.",
            );
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div
            style={{
                background: "white",
                padding: "20px",
                borderRadius: "8px",
                border: "1px solid #e2e8f0",
            }}
        >
            <h4 style={{ margin: "0 0 12px 0", color: "#334155" }}>
                📸 Upload Plant Snapshot
            </h4>

            {error && (
                <div
                    style={{
                        color: "#ef4444",
                        fontSize: "14px",
                        marginBottom: "8px",
                    }}
                >
                    {error}
                </div>
            )}

            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "12px",
                    alignItems: "center",
                }}
            >
                {previewUrl && (
                    <img
                        src={previewUrl}
                        alt="Preview"
                        style={{
                            width: "100%",
                            maxHeight: "200px",
                            objectFit: "cover",
                            borderRadius: "6px",
                        }}
                    />
                )}

                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    style={{ fontSize: "14px" }}
                />

                {selectedFile && (
                    <button
                        onClick={handleUpload}
                        disabled={isUploading}
                        style={{
                            width: "100%",
                            padding: "10px",
                            background: "#3b82f6",
                            color: "white",
                            border: "none",
                            borderRadius: "6px",
                            cursor: isUploading ? "not-allowed" : "pointer",
                            fontWeight: "600",
                        }}
                    >
                        {isUploading
                            ? "Uploading to Server..."
                            : "Confirm Upload"}
                    </button>
                )}
            </div>
        </div>
    );
};
