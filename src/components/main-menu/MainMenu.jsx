"use client";

import React, { useState } from "react";

import styles from "./main-menu.module.scss";

import useSWR from "swr";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/contexts/searchContext";

export default function MainMenu({
  collectionName,
  colDescription,
  colTopic,
  text,
  params,
}) {
  const router = useRouter();

  const { searchData, setSearchData } = useSearch();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR("/api/collection", fetcher);

  return (
    <div className={styles.container}>
      {searchData?.length
        ? searchData?.map((col) =>
            col.item.map((item) => (
              <div key={col.id} className={styles.collectionItem}>
                <p className={styles.collectionP}>
                  {text.user}: {col.username}
                </p>
                <Link
                  className={styles.collectionP}
                  href={`/${params.lang}/dashboard/${col.id}`}
                >
                  {collectionName}: {col.name}
                </Link>
                <p className={styles.collectionP}>
                  {text.item}: {item.name}
                </p>
                {item.image && (
                  <Image
                    src={item.image}
                    width={800}
                    height={200}
                    alt="Collection Image"
                    className={styles.colImage}
                    priority
                  />
                )}
                <p className={styles.collectionP}>
                  {colDescription}: {item.desc}
                </p>
                <p className={styles.collectionP}>
                  {colTopic}: {item.topic}
                </p>
                <p className={styles.collectionP}>
                  {text.tags}: {"#" + item.tags}
                </p>
                <p className={styles.collectionP}>
                  {text.likes}: {item.likes.length}
                </p>
                <p className={styles.collectionP}>
                  {text.comments}: {item.comments.length}
                </p>
              </div>
            ))
          )
        : !isLoading &&
          data.map((collection) => (
            <div key={collection.id} className={styles.collectionItem}>
              <p className={styles.collectionP}>{collection.username}</p>
              <p
                className={styles.collectionP}
                onClick={() =>
                  router.push(`/${params.lang}/dashboard/${collection.id}`)
                }
              >
                {collectionName}: {collection.name}
              </p>
              <p className={styles.collectionP}>
                {colDescription}: {collection.description}
              </p>
              <p className={styles.collectionP}>
                {colTopic}: {collection.topic}
              </p>
              {collection.image && (
                <Image
                  src={collection.image}
                  width={800}
                  height={200}
                  alt="Collection Image"
                  className={styles.colImage}
                  priority
                />
              )}
            </div>
          ))}
    </div>
  );
}
