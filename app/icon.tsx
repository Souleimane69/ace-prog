import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#111318",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 6,
        }}
      >
        <div
          style={{
            fontSize: 22,
            color: "#e63946",
            lineHeight: 1,
          }}
        >
          ♠
        </div>
      </div>
    ),
    { ...size }
  );
}
