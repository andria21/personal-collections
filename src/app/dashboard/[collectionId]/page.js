"use client";

import useSWR from "swr";

import {
    Button,
    DashboardContainer,
    Form,
    FormGroup,
    Input,
    Label,
    Title,
} from "../page.module";
import { useSession } from "next-auth/react";

export default function CollectionPage({ params }) {
  const session = useSession();
    const { collectionId } = params;

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(
        `/api/collection/${collectionId}`,
        fetcher
  );
  
  console.log(data);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const collectionName = e.target[0].value;
        const name = e.target[1].value;
        const id = e.target[2].value;
        const image = e.target[3].value;
        const desc = e.target[4].value;
        const topic = e.target[5].value;
        const tags = e.target[6].value;

        try {
            await fetch("/api/collection/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    collectionName,
                    name,
                    id,
                    image,
                    desc,
                    topic,
                    tags,
                    userEmail: session.data.user.email,
                }),
            });
            e.target[0].value = "";
            e.target[1].value = "";
            e.target[2].value = "";
            e.target[3].value = "";
            e.target[4].value = "";
            e.target[5].value = "";
            e.target[6].value = "";
            mutate();
        } catch (error) {
            console.log(error);
        }
    };

    console.log(params.collectionId);
    return (
        <DashboardContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Add items to your Collection</Title>
                <FormGroup>
                    <Label>Collection Name:</Label>
                    <Input
                        type="text"
                        id="collectionName"
                        name="collectionName"
                        required
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" id="name" name="name" />
                </FormGroup>
                <FormGroup>
                    <Label>ID:</Label>
                    <Input type="text" id="id" name="id" />
                </FormGroup>
                <FormGroup>
                    <Label>Image:</Label>
                    <Input type="text" id="image" name="image" />
                </FormGroup>
                <FormGroup>
                    <Label>Desc:</Label>
                    <Input type="text" id="desc" name="desc" />
                </FormGroup>
                <FormGroup>
                    <Label>Topic:</Label>
                    <Input type="text" id="topic" name="topic" />
                </FormGroup>
                <FormGroup>
                    <Label>#Tags:</Label>
                    <Input type="text" id="tags" name="tags" />
                </FormGroup>
                <Button type="submit">Submit</Button>
        </Form>
        {
          !isLoading && data.map(collection => {
              if (session.data?.user.email === collection.username) {
                  return (
                      <h1>Collection Name: {collection.name}</h1>
                  )
              }
          })
      }
        </DashboardContainer>
    );
}

// NEED TO CREATE SEPARATE FORMS TO CHANGE COLLECTION NAME, ITEMS ETC...