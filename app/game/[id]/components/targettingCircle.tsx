"use client";

import { useState, useEffect, CSSProperties } from "react";
import { type TargetingCircleProps } from "@/app/lib/definitions";


export default function TargettingCircle({
  x,
  y,
  isVisible,
}: TargetingCircleProps) {
  const [boxSize, setBoxSize] = useState({ width: 50, height: 50 });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 480) {
        setBoxSize({ width: 30, height: 30 });
      } else if (window.innerWidth < 768) {
        setBoxSize({ width: 40, height: 40 });
      } else {
        setBoxSize({ width: 50, height: 50 });
      }
    };

    // Set initial size
    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const boxStyle: CSSProperties = {
    display: isVisible ? "block" : "none",
    position: "absolute",
    left: `${x - boxSize.width / 2}px`,
    top: `${y - boxSize.height / 2}px`,
    width: `${boxSize.width}px`,
    height: `${boxSize.height}px`,
    border: "2px solid",
    borderRadius: "50%",
    pointerEvents: "none",
  };

  return <div style={boxStyle} className="neon-text neon-border" />;
}
