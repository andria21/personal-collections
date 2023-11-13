"use client";

import { useSearch } from "@/contexts/searchContext";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

export default function Search({ onSearchResults }) {
  const [query, setQuery] = useState("");
  const { searchData, setSearchData } = useSearch();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(
    `/api/search?query=${encodeURIComponent(query)}`,
    fetcher
  );

  !isLoading && query && setSearchData(data)

  useEffect(() => {
    query.length === 0 && setSearchData([])
    console.log("executed");
  }, [query])
  // !isLoading && query && onSearchResults(data);

  return (
    <input
      type="text"
      placeholder="Search collection item..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
