"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import useSWR from "swr";
import { CenteredSpinnerContainer, Spinner } from "../dashboard/page.module";
import {
  BlockButton,
  H4,
  InfoContainer,
  MainDiv,
  TableContainer,
  TableDiv,
  Td,
  Th,
  Tr,
} from "./page.module";
import { isAdmin } from "@/utils/isAdmin";
import { useState } from "react";

export default function AdminPanel({ params: { lang } }) {
  const session = useSession();
  const adminEmail = process.env.ADMIN_EMAIL;
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

  console.log(selectedUsers);

  return (
    <MainDiv>
      <TableContainer>
        <TableDiv>
          <BlockButton onClick={() => handleAction("block")}>Block</BlockButton>
          <BlockButton onClick={() => handleAction("unblock")}>
            Unblock
          </BlockButton>
          <BlockButton onClick={() => handleAction("delete")}>
            Delete
          </BlockButton>
          <BlockButton onClick={() => handleAction("add-admin")}>
            Add Admin
          </BlockButton>
          <BlockButton onClick={() => handleAction("remove-admin")}>
            Remove Admin
          </BlockButton>

          <TableContainer>
            <thead>
              <Tr>
                <Th>
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                  />
                </Th>
                <Th>ID</Th>
                <Th>Name</Th>
                <Th>e-Mail</Th>
                <Th>Status</Th>
                <Th>Admin Status</Th>
              </Tr>
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
                    <Tr key={user.id}>
                      <Td>
                        <input
                          type="checkbox"
                          checked={selectedUsers.some(
                            (u) => u.userId === user.id
                          )}
                          onChange={() => toggleCheckbox(user.id, user.email)}
                        />
                      </Td>
                      <Td>{index + 1}</Td>
                      <Td>{user.name}</Td>
                      <Td>{user.email}</Td>
                      <Td>{user.isBlocked ? "Blocked" : "Active"}</Td>
                      <Td>{user.isAdmin ? "True" : "False"}</Td>
                    </Tr>
                  );
                })}
            </tbody>
          </TableContainer>
        </TableDiv>
      </TableContainer>
    </MainDiv>
  );
}
