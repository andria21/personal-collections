"use client";

import styles from "./navbar.module.scss";

import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";
import useSWR from "swr";
import { isAdmin } from "@/utils/isAdmin";
import { useEffect, useState } from "react";
import { getDictionary } from "../../../getDictionary";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Search from "../search/Search";
import { useUsers } from "@/contexts/usersContext";
import Tags from "../tags/Tags";

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
      // router.push(`/${savedLanguage}`);
    } else {
      setLanguage("en");
      localStorage.setItem("language", "en");
    }
  }, [params, router]);

  const { users, isLoading } = useUsers();

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
    localStorage.setItem("language", newLanguage);
    router.push(`/${newLanguage}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.flexContainer}>
        <Link className={styles.logo} href={`/${params.lang}/`}>
          CollectionApp
        </Link>
        <div className={styles.linksContainer}>
          <DarkModeToggle />
          <label className={styles.navLink} htmlFor="gsearch">{text.search}:</label>
          <Search />
          <Link className={styles.navLink} href={`/${params.lang}/`}>
            {text.home}
          </Link>
          {session.status === "authenticated" && (
            <Link className={styles.navLink} href={`/${params.lang}/dashboard`}>
              {text.dashboard}
            </Link>
          )}
          {session.status === "unauthenticated" && (
            <Link className={styles.navLink} href={`/${params.lang}/login`}>
              {text.login}
            </Link>
          )}

          {session.status === "unauthenticated" && (
            <Link className={styles.navLink} href={`/${params.lang}/register`}>
              {text.register}
            </Link>
          )}

          {session.status === "authenticated" &&
            isAdmin(isLoading, users, session) && (
              <Link
                className={styles.navLink}
                href={`/${params.lang}/admin-panel`}
              >
                {text.adminPanel}
              </Link>
            )}
          <Link
            className={styles.navLink}
            href={`/${language === "en" ? "" : "en"}/`}
            onClick={() => handleLanguageChange("en")}
          >
            🏴󠁧󠁢󠁥󠁮󠁧🇺🇸
          </Link>
          <Link
            className={styles.navLink}
            href={`/${language === "ru" ? "" : "ru"}/`}
            onClick={() => handleLanguageChange("ru")}
          >
            🏴🇷🇺
          </Link>
          
        </div>
        {session.status === "authenticated" && (
          <button
            className={`${styles.navLink} ${styles.signOutButton}`}
            onClick={signOut}
          >
            {text.signOut}
          </button>
        )}
      </div>
    </div>
  );
}
