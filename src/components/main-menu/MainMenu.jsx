"use client";

import React, { useState } from "react";

import styles from "./main-menu.module.scss";

import useSWR from "swr";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function MainMenu({ collectionName, params }) {
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR("/api/collection", fetcher);

  return (
    <div className={styles.container}>
      {!isLoading &&
        data.map((collection) => (
          <div key={collection.id} className={styles.collectionItem}>
            <p className={styles.collectionP}>{collection.username}</p>
            <p
              className={styles.collectionP}
              onClick={() => router.push(`/${params.lang}/dashboard/${collection.id}`)}
            >
              {collectionName}: {collection.name}
            </p>
          </div>
        ))}
    </div>
  );
}
