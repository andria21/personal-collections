"use client"

import { DarkModeContainer, Icon, Ball } from "./dark-mode-toggle.module";
import { useTheme } from "@/contexts/themeContext";

export default function DarkModeToggle() {
    const { mode, toggle } = useTheme();

    return (
        <DarkModeContainer onClick={toggle}>
            <Icon>☀️</Icon>
            <Icon>🌙</Icon>
            <Ball
                style={mode === "light" ? { left: "2px" } : { right: "2px" }}
            />
        </DarkModeContainer>
    );
}
