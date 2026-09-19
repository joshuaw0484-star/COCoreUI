// app/features/journal/components/JournalImageGallery.jsx
import React from "react";

export interface JournalImage {
  id: string;
  url: string;
  caption: string;
  plantName: string;
  uploadedAt: string;
}

interface JournalImageGalleryProps {
  images: JournalImage[];
}

export const JournalImageGallery: React.FC<JournalImageGalleryProps> = ({ images }) => {
  return (
    <div style={{ background: "white", padding: "24px", borderRadius: "8px", border: "1px solid #e2e8f0" }}>
      <h3 style={{ margin: "0 0 4px 0", color: "#1e293b" }}>📸 Crop Snapshot Gallery</h3>
      <p style={{ margin: "0 0 20px 0", color: "#64748b", fontSize: "14px" }}>Visual log records pulled from active multi-part database snapshots.</p>

      {images.length === 0 ? (
        <p style={{ color: "#94a3b8", fontSize: "14px", textAlign: "center", margin: "20px 0" }}>No garden photographs loaded yet.</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "16px" }}>
          {images.map((img) => (
            <div key={img.id} style={{ border: "1px solid #e2e8f0", borderRadius: "8px", overflow: "hidden", background: "#f8fafc", transition: "transform 0.2s", cursor: "zoom-in" }}>
              <img src={img.url} alt={img.caption} style={{ width: "100%", height: "120px", objectFit: "cover", display: "block" }} />
              <div style={{ padding: "10px" }}>
                <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "#166534", marginBottom: "2px" }}>
                  🌿 {img.plantName}
                </span>
                <p style={{ margin: 0, fontSize: "12px", color: "#334155", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }} title={img.caption}>
                  {img.caption}
                </p>
                <span style={{ fontSize: "10px", color: "#94a3b8", display: "block", marginTop: "4px" }}>
                  {new Date(img.uploadedAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
