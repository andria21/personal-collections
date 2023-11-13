"use client";

import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import { useState } from "react";
import { useSession } from "next-auth/react";

export default function Register({ params: { lang } }) {
  const [err, setErr] = useState("");

  const router = useRouter();
  const session = useSession();

  session.status === "authenticated" && router.push(`/${lang}/dashboard`);

  if (session.status === "loading") {
    return (
      <div className={styles.spinnerContainer}>
        <div className={styles.spinner} />
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });
      res.status === 200
        ? router.push(`/${lang}/login?success=Account has been created`)
        : setErr(
            "Something went wrong. Make sure this account doesn't already exist!"
          );

      console.log(err);
    } catch (error) {
      setErr(true);
    }
  };

  return (
    <div className={styles.registerContainer}>
      <form className={styles.registerForm} onSubmit={handleSubmit}>
        <h2 className={styles.title}>Register</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>Name:</label>
          <input
            className={styles.input}
            type="text"
            id="name"
            name="name"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Email:</label>
          <input
            className={styles.input}
            type="email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>Password:</label>
          <input
            className={styles.input}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <div className={styles.buttonsContainer}>
          <button className={styles.button}>Submit</button>
          <a
            className={styles.loginButton}
            onClick={() => router.push(`/${lang}/login`)}
          >
            - Already have an account -
          </a>
        </div>
        <p>{err && err}</p>
      </form>
    </div>
  );
}
