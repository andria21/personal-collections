"use client";

import { DarkModeContainer, Icon, Ball } from "./dark-mode-toggle.module";
import { useTheme } from "@/contexts/themeContext";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function DarkModeToggle() {
  const { mode, toggle } = useTheme();

  const session = useSession();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

  // const handleUserTheme = async () => {
  //   if (!isLoading) {
  //     const filteredUsers = data.filter(
  //       (user) => user.email === session.data.user.email
  //     );
  //     filteredUsers.map(async (u) => {
  //       try {
  //         await fetch("/api/users", {
  //           method: "POST",
  //           body: JSON.stringify({
  //             id: u.id,
  //             theme: mode === "dark" ? "light" : "dark",
  //           }),
  //         });
  //         mutate();
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     });
  //   }
  // };

  return (
    <DarkModeContainer onClick={toggle}>
      <Icon>☀️</Icon>
      <Icon>🌙</Icon>
      <Ball style={mode === "light" ? { left: "2px" } : { right: "2px" }} />
    </DarkModeContainer>
  );
}
