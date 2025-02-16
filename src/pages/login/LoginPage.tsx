import { useState } from "react";
import {
  TextInput,
  PasswordInput,
  Button,
  Box,
  Title,
  Alert,
  Container,
  Header,
} from "@mantine/core";
import { useAuthStore } from "../../store/app.store";
import classes from "../../styles/login/LoginPage.module.scss";

interface Credentials {
  username: string;
  password: string;
}

export function LoginPage(): JSX.Element {
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const success = login(credentials);
    if (success) {
      window.location.href = "/resourceslist";
    } else {
      setError("Invalid username or password");
      setLoading(false);
    }
  };

  return (
    <>
      <Header height={60} className={classes.header}>
        MySpaceX
      </Header>
      <Container className={classes.wrapper}>
        <Box className={classes.formContainer}>
          <Title order={2} className={classes.title}>
            Sign In
          </Title>
          {error && <Alert color="red">{error}</Alert>}

          <form onSubmit={handleSubmit}>
            <TextInput
              label="Username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={(e) =>
                setCredentials({ ...credentials, username: e.target.value })
              }
              required
            />
            <PasswordInput
              label="Password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={(e) =>
                setCredentials({ ...credentials, password: e.target.value })
              }
              required
              mt="md"
            />
            <Button type="submit" fullWidth mt="xl" loading={loading}>
              Sign in
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
}
