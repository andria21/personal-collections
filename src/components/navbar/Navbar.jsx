"use client";

import {
  Button,
  Container,
  FlexContainer,
  LinksContainer,
  Logo,
  NavLink,
  SignOutButton,
} from "./navbar.module";

import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";
import useSWR from "swr";
import { isAdmin } from "@/utils/isAdmin";
import { useEffect, useState } from "react";
import { getDictionary } from "../../../getDictionary";
import { useRouter } from "next/navigation";

export default function Navbar({ params }) {
  const session = useSession();
  const router = useRouter();

  const [text, setText] = useState({});
  const [language, setLanguage] = useState("");

  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      setText(lang.navigation);
    };
    func();
    const savedLanguage = localStorage.getItem("language");

  if (savedLanguage) {
    setLanguage(savedLanguage);
    router.push(`/${savedLanguage}`);
  } else {
    setLanguage("en");
    localStorage.setItem("language", "en");
  }
  }, [params, router]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    router.push(`/${newLanguage}`);
  };

  return (
    <Container>
      <FlexContainer>
        <Logo href={`/${params.lang}/`}>CollectionApp</Logo>
        <LinksContainer>
          <DarkModeToggle />
          <label htmlFor="gsearch">{text.search}:</label>
          <input type="search" id="search" name="search" />
          <NavLink href={`/${params.lang}/`}>{text.home}</NavLink>
          <NavLink href={`/${params.lang}/dashboard`}>{text.dashboard}</NavLink>
          {session.status === "unauthenticated" && (
            <NavLink href={`/${params.lang}/login`}>{text.login}</NavLink>
          )}

          {session.status === "unauthenticated" && (
            <NavLink href={`/${params.lang}/register`}>{text.register}</NavLink>
          )}

          {session.status === "authenticated" &&
            isAdmin(isLoading, data, session) && (
              <NavLink href={`/${params.lang}/admin-panel`}>
                {text.adminPanel}
              </NavLink>
            )}
          {session.status === "authenticated" && (
            <SignOutButton onClick={signOut}>{text.signOut}</SignOutButton>
          )}
          <NavLink
            href={`/${language === "en" ? "" : "en"}/`}
            onClick={() => handleLanguageChange("en")}
          >
            🏴󠁧󠁢󠁥󠁮󠁧🇺🇸
          </NavLink>
          <NavLink
            href={`/${language === "ru" ? "" : "ru"}/`}
            onClick={() => handleLanguageChange("ru")}
          >
            🏴🇷🇺
          </NavLink>
        </LinksContainer>
      </FlexContainer>
    </Container>
  );
}
