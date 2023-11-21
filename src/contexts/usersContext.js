"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useSWR from "swr";

const UsersContext = createContext();

export const UsersProvider = ({ children }) => {
  const [users, setUsers] = useState([]);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

  useEffect(() => {
    !isLoading && setUsers(data);
    mutate();
  }, [data]);

  return (
    <UsersContext.Provider value={{ users, isLoading, mutate }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsers = () => {
  return useContext(UsersContext);
};
