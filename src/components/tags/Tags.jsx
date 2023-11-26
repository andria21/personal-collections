"use client";

import useSWR from "swr";
import { useTagSearch } from "@/contexts/tagsSearchContext";
import styles from "./tags.module.scss";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function TagCloud({ loading, tagsData, params }) {
  const [query, setQuery] = useState("");
  // const { tagsSearchData, setTagsSearchData } = useTagSearch();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/tagCloud?query=${encodeURIComponent(query)}`,
    fetcher
  );

  // !isLoading && query && setTagsSearchData(data);

  // useEffect(() => {
  //   query.length === 0 && setTagsSearchData([]);
  // }, [query]);

  return (
    <div className={styles.tagCloudContainer}>
      <h2 className={styles.tagHeading}>Tag Cloud</h2>
      {!loading &&
        tagsData.map((collection) =>
          collection.item.map((item) => (
            <div key={item.id}>
              <p
                className={`${styles.tag} ${
                  query === item.tags && styles.active
                }`}
                onClick={() => setQuery(item.tags)}
              >
                {item.tags}
              </p>
            </div>
          ))
        )}

      {query && (
        <div className={styles.itemContainer}>
          <h4 className={styles.selectedTitle}>Selected tag items</h4>
          {!isLoading &&
            data.map((coll) =>
              coll.item.map((collectionItem) => (
                <div key={collectionItem.id}>
                  <Link href={`/${params.lang}/dashboard/${coll.id}`}>
                    {collectionItem.name}
                  </Link>
                </div>
              ))
            )}
        </div>
      )}
    </div>
  );
}
