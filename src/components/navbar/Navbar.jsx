"use client";

import styles from "./navbar.module.scss";

import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";
import { isAdmin } from "@/utils/isAdmin";
import { useEffect, useState } from "react";
import { getDictionary } from "../../../getDictionary";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Search from "../search/Search";
import { useUsers } from "@/contexts/usersContext";

export default function Navbar({ params }) {
  const session = useSession();
  const router = useRouter();

  const [text, setText] = useState({});
  const [language, setLanguage] = useState("");
  const [active, setActive] = useState(false);

  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      setText(lang.navigation);
    };
    func();
    const savedLanguage = localStorage.getItem("language");

    if (savedLanguage) {
      setLanguage(savedLanguage);
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
      <div className={`${styles.linksContainer}`}>
        <DarkModeToggle />
        <label
          className={`${styles.navLink} ${styles.searchLabel}`}
          htmlFor="gsearch"
        >
          {text.search}:
        </label>
        <Search />
        <Link
          href={`/${language === "en" ? "" : "en"}/`}
          onClick={() => handleLanguageChange("en")}
        >
          🏴󠁧󠁢󠁥󠁮󠁧🇺🇸
        </Link>
        <Link
          href={`/${language === "ru" ? "" : "ru"}/`}
          onClick={() => handleLanguageChange("ru")}
        >
          🏴🇷🇺
        </Link>
      </div>
    </div>
  );
}
