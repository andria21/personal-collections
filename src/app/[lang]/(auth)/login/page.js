"use client";

import { useParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import styles from "./page.module.scss";

import useSWR from "swr";

export default function Login({ params: { lang } }) {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/users`, fetcher);

  if (session.status === "loading") {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  session.status === "authenticated" && router.push(`/${lang}/dashboard`);

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    const password = e.target[1].value;

    signIn("credentials", { email, password });

    try {
      !isLoading &&
        data.map((user) => {
          if (user.email === email && user.isBlocked) {
            alert("This account has been blocked!");
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.loginContainer}>
      <form className={styles.loginForm} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email:</label>
          <input className={styles.input} type="email" id="email" name="email" required />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="password">Password:</label>
          <input className={styles.input} type="password" id="password" name="password" required />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button} type="submit">Login</button>
          <a className={styles.registerButton} onClick={() => router.push(`/${lang}/register`)}>
            - Create a new account -
          </a>
        </div>
      </form>
    </div>
  );
}
