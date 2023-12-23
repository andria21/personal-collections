"use client";

import Link from "next/link";
import "./new-navbar.styles.scss";
import Image from "next/image";

import { signOut, useSession } from "next-auth/react";
import { isAdmin } from "@/utils/isAdmin";
import { useEffect, useState } from "react";
import { getDictionary } from "../../../getDictionary";
import { useRouter } from "next/navigation";
import Search from "../search/Search";
import { useUsers } from "@/contexts/usersContext";

import HomeSvg from "../../../public/home.svg";
import AdminSvg from "../../../public/admin.svg";
import DashboardSvg from "../../../public/account.svg";
import LoginSvg from "../../../public/signIn.svg";
import RegisterSvg from "../../../public/signUp.svg";
import SignOutSvg from "../../../public/signOut.svg";

import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";

export default function NewNavbar({ params }) {
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

  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;

      if (scrollTop > lastScrollTop) {
        setIsNavVisible(false);
      } else {
        setIsNavVisible(scrollTop === 0);
      }

      setLastScrollTop(scrollTop);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollTop]);

  return (
    <div className={`navContainer ${!isNavVisible ? "hidden" : ""}`}>
      <div className="container">
        <Link className="link" href={`/${params.lang}/`}>
          LOGO
        </Link>
        <DarkModeToggle />
        <Link className="link" href={`/${params.lang}/`}>
          <Image
            className="img"
            src={HomeSvg}
            alt="Svg"
            width={40}
            height={40}
          />
          {text.home}
        </Link>
        {session.status === "authenticated" && (
          <Link className="link" href={`/${params.lang}/dashboard`}>
            <Image
              className="img"
              src={DashboardSvg}
              alt="Svg"
              width={40}
              height={40}
            />
            {text.dashboard}
          </Link>
        )}
        {session.status === "authenticated" &&
          isAdmin(isLoading, users, session) && (
            <Link className="link" href={`/${params.lang}/admin-panel`}>
              <Image
                className="img"
                src={AdminSvg}
                alt="Svg"
                width={40}
                height={40}
              />
              {text.adminPanel}
            </Link>
          )}
        {session.status === "unauthenticated" && (
          <Link className="link" href={`/${params.lang}/login`}>
            <Image
              className="img"
              src={LoginSvg}
              alt="Svg"
              width={40}
              height={40}
            />
            {text.login}
          </Link>
        )}
        {session.status === "unauthenticated" && (
          <Link className="link" href={`/${params.lang}/register`}>
            <Image
              className="img"
              src={RegisterSvg}
              alt="Svg"
              width={40}
              height={40}
            />
            {text.register}
          </Link>
        )}
        <Link
          href={`/${language === "en" ? "" : "en"}/`}
          onClick={() => handleLanguageChange("en")}
        >
          🇺🇸
        </Link>
        <Link
          href={`/${language === "ru" ? "" : "ru"}/`}
          onClick={() => handleLanguageChange("ru")}
        >
          🇷🇺
        </Link>
        {session.status === "authenticated" && (
          <button className="signOutButton" onClick={signOut}>
            {text.signOut}
          </button>
        )}
      </div>
    </div>
  );
}
