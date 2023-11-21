"use client";

import { createContext, useContext, useState } from "react";

const TagsContext = createContext();

export const TagsProvider = ({ children }) => {
  const [tagsSearchData, setTagsSearchData] = useState();

  return (
    <TagsContext.Provider value={{ tagsSearchData, setTagsSearchData }}>
      {children}
    </TagsContext.Provider>
  );
};

export const useTagSearch = () => {
  return useContext(TagsContext);
};
