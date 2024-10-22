"use client";

import { useState, useEffect } from "react";

export default function Loading() {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length >= 3 ? "" : prevDots + "."));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
      <p className="text-xl neon-text-subtle font-semibold">
        Loading{dots}
      </p>
    </div>
  );
}