import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#18150f",
          color: "#f5f1e7",
          fontSize: 18,
          fontStyle: "italic",
          fontFamily: "Georgia, serif",
        }}
      >
        DR
      </div>
    ),
    { ...size }
  );
}
