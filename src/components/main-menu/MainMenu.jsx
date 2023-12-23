"use client";

import styles from "./main-menu.module.scss";

import useSWR from "swr";
import Image from "next/image";
import Link from "next/link";
import { useSearch } from "@/contexts/searchContext";
import TagCloud from "../tags/Tags";
import NewNavbar from "../new-navbar/NewNavbar";
import Search from "../search/Search";

export default function MainMenu({
  collectionName,
  colDescription,
  colTopic,
  text,
  params,
}) {
  const { searchData, setSearchData } = useSearch();
  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR("/api/collection", fetcher);

  const sortedCollectionsBySize = data
    ? data.sort((a, b) => b.item.length - a.item.length).slice(0, 5)
    : [];

  // const sortedCollectionsByDate = data
  //   ? data
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  //       .slice(0, 5)
  //   : [];
  const usersCollectionsMap = new Map();

  if (!isLoading) {
    data.forEach((coll) => {
      const { username, item, name, id } = coll;
      if (!usersCollectionsMap.has(username)) {
        usersCollectionsMap.set(username, [{ item, name, id }]);
      } else {
        usersCollectionsMap.get(username).push({ item, name, id });
      }
    });
  }
  // <NewNavbar />
  return (
    <div className={styles.container}>
      <div className={styles.collectionContainer}>
        
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
          : Array.from(usersCollectionsMap).map(([username, items]) => (
              <div key={username} className={styles.userCollectionContainer}>
                <h2 className={styles.author}>{username}</h2>
                <div className={styles.collectionsItemsContainer}>
                  <div className={styles.colContainer}>
                    {items.map(({ name, id }, index) => (
                      <div key={index} className={styles.collection}>
                        <Link
                          className={styles.collectionLink}
                          href={`/${params.lang}/dashboard/${id}`}
                        >
                          {name}
                        </Link>
                      </div>
                    ))}
                </div>
                  <p>-</p>
                  <div className={styles.itemContainer}>
                    {items.map((item) =>
                      item.item.map((i) => (
                        <div key={i.id} className={styles.item}>
                          <p className={styles.itemNameP}>{i.name}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            ))}
      </div>
      <div className={styles.clouds}>
        <Search />
        <div className={styles.latestCollectionsContainer}>
          <h2 className={styles.largestHeading}>{text.largestCollections}</h2>
          {!isLoading &&
            sortedCollectionsBySize.map((largestCollections) => (
              <div key={largestCollections.id} className={styles.largestCollP}>
                {largestCollections.name}
              </div>
            ))}
        </div>
        <TagCloud
          loading={isLoading}
          tagsData={data}
          params={params}
          name={text.tagCloud}
        />
      </div>
    </div>
  );
}
