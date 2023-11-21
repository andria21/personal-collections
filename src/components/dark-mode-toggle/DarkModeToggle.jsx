"use client";

import styles from "./dark-mode.module.scss";
import { useTheme } from "@/contexts/themeContext";

export default function DarkModeToggle() {
  const { mode, toggle } = useTheme();

  const handleToggle = () => {
    toggle();

    // Toggle theme class on body
    document.body.classList.toggle('dark', mode === 'dark');
    document.body.classList.toggle('light', mode === 'light');
  };

  return (
    <div className={styles.darkModeContainer} onClick={handleToggle}>
      <div className={styles.icon}>☀️</div>
      <div className={styles.icon}>🌙</div>
      <div className={styles.ball} style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  );
}
