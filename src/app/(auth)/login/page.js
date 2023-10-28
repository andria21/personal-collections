"use client";

import { useParams, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

import {
  LoginContainer,
  LoginForm,
  Title,
  FormGroup,
  Label,
  Input,
  Button,
  RegisterButton,
  ButtonsContainer,
  CenteredSpinnerContainer,
  Spinner
} from "./page.module";
import useSWR from "swr";

export default function Login() {
  const session = useSession();
  const router = useRouter();

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, isLoading } = useSWR(`/api/users`, fetcher);

  if (session.status === "loading") {
    return (
      <CenteredSpinnerContainer>
        <Spinner />
      </CenteredSpinnerContainer>
    );
  }

  session.status === "authenticated" && router.push("/dashboard");

  const handleLogin = async (e) => {
    e.preventDefault();

    const email = e.target[0].value;

    const password = e.target[1].value;

    signIn("credentials", { email, password });

    try {
      !isLoading && data.map(user => {
        if (user.email === email && user.isBlocked) {
          alert("This account has been blocked!")
        }
      })
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleLogin}>
        <Title>Login</Title>
        <FormGroup>
          <Label htmlFor="email">Email:</Label>
          <Input type="email" id="email" name="email" required />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="password">Password:</Label>
          <Input type="password" id="password" name="password" required />
        </FormGroup>
        <ButtonsContainer>
          <Button type="submit">Login</Button>
          <RegisterButton onClick={() => router.push("/register")}>
            - Create a new account -
          </RegisterButton>
        </ButtonsContainer>
      </LoginForm>
    </LoginContainer>
  );
}
