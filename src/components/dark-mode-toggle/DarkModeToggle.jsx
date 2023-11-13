"use client";

import styles from "./dark-mode.module.scss";
import { useTheme } from "@/contexts/themeContext";

export default function DarkModeToggle() {
  const { mode, toggle } = useTheme();

  return (
    <div className={styles.darkModeContainer} onClick={toggle}>
      <div className={styles.icon}>☀️</div>
      <div className={styles.icon}>🌙</div>
      <div className={styles.ball} style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
    </div>
  );
}
