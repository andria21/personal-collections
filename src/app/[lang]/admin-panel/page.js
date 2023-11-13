"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useSWR from "swr";

import styles from "./page.module.scss"

import { isAdmin } from "@/utils/isAdmin";
import { useState } from "react";

export default function AdminPanel({ params: { lang } }) {
  const session = useSession();
  const router = useRouter();

  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

  if (!isAdmin(isLoading, data, session)) {
    router.push(`/${lang}/`);
  }

  const handleAdminAccess = async (userId) => {
    try {
      await fetch("/api/admin", {
        method: "POST",
        body: JSON.stringify({
          id: userId,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const toggleCheckbox = (userId, userEmail) => {
    setSelectedUsers((prevSelectedUsers) => {
      if (prevSelectedUsers.some((user) => user.userId === userId)) {
        return prevSelectedUsers.filter((user) => user.userId !== userId);
      } else {
        return [...prevSelectedUsers, { userId, userEmail }];
      }
    });
  };

  const handleAction = async (buttonName) => {
    const selectedUserIds = selectedUsers.map((user) => user.userId);
    try {
      await fetch(`/api/admin`, {
        method: "POST",
        body: JSON.stringify({
          id: selectedUserIds,
          buttonName,
        }),
      });
      mutate();
      setSelectedUsers([]);
      setSelectAll(false);
      if (buttonName === "delete") {
        selectedUsers.forEach((user) => {
          if (user.userEmail === session.data.user.email) {
            signOut();
          }
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(
        data.map((user) => ({
          userId: user.id,
          userEmail: user.email,
        }))
      );
    }
    setSelectAll(!selectAll);
  };

  return (
    <div className={styles.mainDiv}>
      <div className={styles.tableContainer}>
        <div className={styles.tableDiv}>
          <a className={styles.blockButton} onClick={() => handleAction("block")}>Block</a>
          <a className={styles.blockButton} onClick={() => handleAction("unblock")}>
            Unblock
          </a>
          <a className={styles.blockButton} onClick={() => handleAction("delete")}>
            Delete
          </a>
          <a className={styles.blockButton} onClick={() => handleAction("add-admin")}>
            Add Admin
          </a>
          <a className={styles.blockButton} onClick={() => handleAction("remove-admin")}>
            Remove Admin
          </a>

          <div>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </th>
                <th className={styles.th}>ID</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>e-Mail</th>
                <th className={styles.th}>Status</th>
                <th className={styles.th}>Admin Status</th>
              </tr>
            </thead>
            <tbody>
              {!isLoading &&
                data.map((user, index) => {
                  // const filteredData = data.filter(u => u.email !== session.data.user.email)
                  try {
                    if (user.isBlocked) {
                      if (session.data.user.email === user.email) {
                        signOut();
                      }
                    }
                  } catch (error) {
                    console.log(error);
                  }
                  return (
                    <tr className={styles.tr} key={user.id}>
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          checked={selectedUsers.some(
                            (u) => u.userId === user.id
                          )}
                          onChange={() => toggleCheckbox(user.id, user.email)}
                        />
                      </td>
                      <td className={styles.td}>{index + 1}</td>
                      <td className={styles.td}>{user.name}</td>
                      <td className={styles.td}>{user.email}</td>
                      <td className={styles.td}>{user.isBlocked ? "Blocked" : "Active"}</td>
                      <td className={styles.td}>{user.isAdmin ? "True" : "False"}</td>
                    </tr>
                  );
                })}
            </tbody>
          </div>
        </div>
      </div>
    </div>
  );
}
