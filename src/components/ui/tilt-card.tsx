"use client";

import { useRef, type MouseEvent, type ReactNode } from "react";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  tiltStrength?: number;
  glareEffect?: boolean;
  spotlightColor?: string;
  onClick?: () => void;
}

export default function TiltCard({
  children,
  className = "",
  tiltStrength = 16,
  glareEffect = true,
  spotlightColor = "rgba(255, 107, 61, 0.16)",
  onClick,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Calculate rotation angles
    const rotX = -((y - centerY) / centerY) * tiltStrength;
    const rotY = ((x - centerX) / centerX) * tiltStrength;

    // Direct GPU transform update with 0.08s snappy interpolation
    card.style.transition = "transform 0.08s ease-out";
    card.style.transform = `perspective(1000px) rotateX(${rotX.toFixed(2)}deg) rotateY(${rotY.toFixed(2)}deg) scale3d(1.025, 1.025, 1.025)`;

    if (glareEffect && glareRef.current) {
      glareRef.current.style.opacity = "1";
      glareRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${spotlightColor}, transparent 65%)`;
    }
  };

  const handleMouseEnter = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transition = "transform 0.08s ease-out";
    if (glareEffect && glareRef.current) {
      glareRef.current.style.opacity = "1";
    }
  };

  const handleMouseLeave = () => {
    const card = cardRef.current;
    if (!card) return;

    // Smooth return to resting position
    card.style.transition = "transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)";
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";

    if (glareEffect && glareRef.current) {
      glareRef.current.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        transformStyle: "preserve-3d",
        transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)",
      }}
      className={`relative will-change-transform ${className}`}
    >
      {glareEffect && (
        <div
          ref={glareRef}
          aria-hidden="true"
          className="pointer-events-none absolute -inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-200"
        />
      )}
      {children}
    </div>
  );
}
