"use client";

import {
    Button,
    Container,
    FlexContainer,
    LinksContainer,
    Logo,
    NavLink,
} from "./navbar.module";

import { signOut, useSession } from "next-auth/react";

import DarkModeToggle from "../dark-mode-toggle/DarkModeToggle";
import useSWR from "swr";
import { isAdmin } from "@/utils/isAdmin";

export default function Navbar() {
    const session = useSession();
    // const adminEmail = process.env.ADMIN_EMAIL;

    const fetcher = (...args) => fetch(...args).then((res) => res.json());

    const { data, mutate, error, isLoading } = useSWR(`/api/users`, fetcher);

    return (
        <Container>
            <FlexContainer>
                <Logo href="/">CollectionApp</Logo>
                <LinksContainer>
                    <DarkModeToggle />
                    <label htmlFor="gsearch">Search:</label>
                    <input type="search" id="search" name="search" />
                    <NavLink href="/">Home</NavLink>
                    <NavLink href="/dashboard">Dashboard</NavLink>
                    <NavLink href="/login">Login</NavLink>
                    <NavLink href="/register">Register</NavLink>
                    {session.status === "authenticated" && isAdmin(isLoading, data, session) && (
                        <NavLink href="/admin-panel">Admin Panel</NavLink>
                    )}
                    {session.status === "authenticated" && (
                        <button onClick={signOut}>SIGN OUT</button>
                    )}
                </LinksContainer>
            </FlexContainer>
        </Container>
    );
}
