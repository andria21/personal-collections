"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import {
    Button,
    CenteredSpinnerContainer,
    CollectionDiv,
    DashboardContainer,
    Form,
    FormGroup,
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
        const name = e.target[1].value;
        const id = e.target[2].value;
        const image = e.target[3].value;
        const desc = e.target[4].value;
        const topic = e.target[5].value;
        const tags = e.target[6].value;

        try {
            await fetch("/api/collection", {
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
            mutate()
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
                <FormGroup>
                    <Label>Name:</Label>
                    <Input type="text" id="name" name="name"  />
                </FormGroup>
                <FormGroup>
                    <Label>ID:</Label>
                    <Input type="text" id="id" name="id"  />
                </FormGroup>
                <FormGroup>
                    <Label>Image:</Label>
                    <Input type="text" id="image" name="image"  />
                </FormGroup>
                <FormGroup>
                    <Label>Desc:</Label>
                    <Input type="text" id="desc" name="desc"  />
                </FormGroup>
                <FormGroup>
                    <Label>Topic:</Label>
                    <Input type="text" id="topic" name="topic"  />
                </FormGroup>
                <FormGroup>
                    <Label>#Tags:</Label>
                    <Input type="text" id="tags" name="tags"  />
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
            <h1>Collections</h1>
            <CollectionDiv>
                {
                    !isLoading && data.map(collection => {
                        if (session.data?.user.email === collection.username) {
                            return (
                                <h1 onClick={() => router.push(`/dashboard/${collection.id}`)}>{collection.name}</h1>
                            )
                        }
                    })
                }
            </CollectionDiv>
        </DashboardContainer>
    );
}
