
"use client";

import * as React from "react";
import { useEffect, useState, createContext, useContext } from "react";

type Direction = "ltr" | "rtl";

type DirectionContextType = {
  direction: Direction;
  setDirection: (direction: Direction) => void;
};

const DirectionContext = createContext<DirectionContextType | undefined>(undefined);

export function DirectionProvider({ children }: { children: React.ReactNode }) {
  const [direction, setDirectionState] = useState<Direction>("ltr");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const storedDirection = (localStorage.getItem("direction") as Direction) || "ltr";
    setDirectionState(storedDirection);
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.dir = direction;
      localStorage.setItem("direction", direction);
    }
  }, [direction, mounted]);

  const value = {
    direction,
    setDirection: (newDirection: Direction) => {
      setDirectionState(newDirection);
    },
  };

  return (
    <DirectionContext.Provider value={value}>
      {children}
    </DirectionContext.Provider>
  );
}

export function useDirection() {
  const context = useContext(DirectionContext);
  if (context === undefined) {
    throw new Error("useDirection must be used within a DirectionProvider");
  }
  return context;
}
