"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import styles from "./page.module.scss";

import useSWR from "swr";

import { useEffect, useState } from "react";
import { getDictionary } from "../../../../getDictionary";

export default function Dashboard({ params }) {
  const [text, setText] = useState({});

  useEffect(() => {
    const func = async () => {
      const lang = await getDictionary(params.lang);
      setText(lang.page.dashboard);
    };
    func();
  }, [params]);

  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/collection`, fetcher);

  if (session.data?.user === "unauthenticated")
    router.push(`/${params.lang}/login`);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionName = e.target[0].value;
    const collectionDescription = e.target[1].value;
    const collectionTopic = e.target[2].value;
    const collectionImage = e.target[3].value;

    try {
      await fetch("/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName,
          userEmail: session.data.user.email,
          collectionDescription,
          collectionTopic,
          collectionImage,
        }),
      });
      e.target[0].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await fetch("/api/collection", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.dashboardContainer}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>{text.createCollection}</h2>
        <div className={styles.formGroup}>
          <label className={styles.label}>{text.collectionName}:</label>
          <input
            className={styles.input}
            type="text"
            id="collectionName"
            name="collectionName"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{text.collectionDescription}:</label>
          <input
            className={styles.input}
            type="text"
            id="collectionDescription"
            name="collectionDescription"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{text.collectionTopic}:</label>
          <input
            className={styles.input}
            type="text"
            id="collectionTopic"
            name="collectionTopic"
            required
          />
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label}>{text.collectionImage}:</label>
          <input
            className={styles.input}
            type="text"
            id="collectionImage"
            name="collectionImage"
          />
        </div>
        <button className={styles.button} type="submit">
          {text.submit}
        </button>
      </form>
      <div className={styles.collectionDiv}>
        <h1 className={styles.collectionHeading}>{text.yourCollections}</h1>
        {!isLoading &&
          data.map((collection) => {
            if (session.data?.user.email === collection.username) {
              return (
                <div className={styles.headingDiv} key={collection.id}>
                  <h3
                    className={styles.collectionName}
                    onClick={() =>
                      router.push(`/${params.lang}/dashboard/${collection.id}`)
                    }
                  >
                    {collection.name}
                  </h3>
                  <span
                    className={styles.span}
                    onClick={() => handleDeleteCollection(collection.id)}
                  >
                    X
                  </span>
                </div>
              );
            }
          })}
      </div>
    </div>
  );
}
