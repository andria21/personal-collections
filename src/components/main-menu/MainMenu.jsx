"use client";

import React, { useState } from "react";

import styles from "./main-menu.module.scss";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MainMenu() {
  const [showComments, setShowComments] = useState(false);
  const [collectionId, setCollectionId] = useState("");
  const [itemId, setItemId] = useState("");

  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR("/api/collection", fetcher);

  const handleSubmitComment = async (e, buttonName) => {
    e.preventDefault();

    const comment = e.target[0].value;

    try {
      await fetch(`/api/collection/${collectionId}/item`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          buttonName,
          comment,
          commentUser: session.data.user.name,
          id: itemId,
        }),
      });
      e.target[0].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.container}>
      {!isLoading &&
        data.map((collection) => (
          <div key={collection.id}>
            <p className={styles.collectionP}>{collection.username}</p>
            <p
              className={styles.collectionP}
              onClick={() => router.push(`/dashboard/${collection.id}`)}
            >
              Collection: {collection.name}
            </p>
          </div>
        ))}
    </div>
  );
}
