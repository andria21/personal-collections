"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
  Button,
  CenteredSpinnerContainer,
  CollectionDiv,
  CollectionHeading,
  CollectionName,
  CustomSpan,
  DashboardContainer,
  Form,
  FormGroup,
  HeadingDiv,
  Input,
  Label,
  Spinner,
  Title,
} from "./page.module";

import useSWR from "swr";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, mutate, error, isLoading } = useSWR(`/api/collection`, fetcher);

  if (session.data?.user === "unauthenticated") router.push("/login");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collectionName = e.target[0].value;
    try {
      await fetch("/api/collection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionName,
          userEmail: session.data.user.email,
        }),
      });
      e.target[0].value = "";
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCollection = async (collectionId) => {
    try {
      await fetch("/api/collection", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          collectionId,
        }),
      });
      mutate();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <DashboardContainer>
      <Form onSubmit={handleSubmit}>
        <Title>Create Collection</Title>
        <FormGroup>
          <Label>Collection Name:</Label>
          <Input
            type="text"
            id="collectionName"
            name="collectionName"
            required
          />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
      <CollectionDiv>
        <CollectionHeading>Your Collections</CollectionHeading>
        {!isLoading &&
          data.map((collection) => {
            if (session.data?.user.email === collection.username) {
              return (
                <HeadingDiv>
                  <CollectionName
                    onClick={() => router.push(`/dashboard/${collection.id}`)}
                  >
                    {collection.name}
                  </CollectionName>
                  <CustomSpan
                    onClick={() => handleDeleteCollection(collection.id)}
                  >
                    X
                  </CustomSpan>
                </HeadingDiv>
              );
            }
          })}
      </CollectionDiv>
    </DashboardContainer>
  );
}
