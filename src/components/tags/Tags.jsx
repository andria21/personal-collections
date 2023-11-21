"use client";

import useSWR from "swr";
import { useTagSearch } from "@/contexts/tagsSearchContext";
import styles from "./tags.module.scss";
import { useState } from "react";

export default function Tags() {
  const [query, setQuery] = useState("");
  const { tagsSearchData, setTagsSearchData } = useTagSearch();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/tags?query=${encodeURIComponent(query)}`,
    fetcher
  );

  return (
    <div className={styles.tagsContainer}>
      <div className={styles.tag}>Tag 1</div>
      <div className={styles.tag}>Tag 2</div>
      <div className={`${styles.tag} ${styles.selected}`}>Tag 3</div>
    </div>
  );
}
