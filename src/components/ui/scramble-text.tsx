"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";
import { sound } from "@/lib/sound";

const CHARS = "ABCDEFGHJKLMNOPQRSTUVWXYZ0123456789_#*/[]!@";

interface ScrambleTextProps {
  text: string;
  className?: string;
  as?: ElementType;
  triggerOnHover?: boolean;
  children?: ReactNode;
}

export default function ScrambleText({
  text,
  className = "",
  as: Component = "span",
  triggerOnHover = true,
}: ScrambleTextProps) {
  const [displayText, setDisplayText] = useState(text);
  const [prevText, setPrevText] = useState(text);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const isScramblingRef = useRef(false);

  // Sync state during render when text prop changes
  if (text !== prevText) {
    setPrevText(text);
    setDisplayText(text);
  }

  const startScramble = () => {
    if (isScramblingRef.current) return;
    isScramblingRef.current = true;
    sound.playTick();

    let iteration = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setDisplayText(
        text
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < iteration) {
              return text[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (iteration >= text.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        isScramblingRef.current = false;
        setDisplayText(text);
      }

      iteration += 1 / 2;
    }, 28);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const Tag = Component;

  return (
    <Tag
      className={`inline-block ${className}`}
      onMouseEnter={triggerOnHover ? startScramble : undefined}
    >
      {displayText}
    </Tag>
  );
}
