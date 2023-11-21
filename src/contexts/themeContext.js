"use client";

import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [mode, setMode] = useState("dark");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setMode(savedTheme);
    } else {
      setMode("dark");
      localStorage.setItem("theme", "dark");
    }
  }, []);

  const toggle = () => {
    const newMode = mode === "dark" ? "light" : "dark";
    setMode(newMode);
    localStorage.setItem("theme", newMode);
    document.body.classList.toggle("dark", newMode === "dark");
    document.body.classList.toggle("light", newMode === "light");
  };

  useEffect(() => {
    document.body.classList.toggle("dark", mode === "dark");
    document.body.classList.toggle("light", mode === "light");
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggle }}>
      <div className={`theme ${mode}`}>{children}</div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  return useContext(ThemeContext);
};
