import { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
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

export default function LoginPage(): JSX.Element {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState<Credentials>({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const login = useAuthStore((state) => state.login);

  const handleInputChange = useCallback(
    (field: keyof Credentials) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setCredentials((prev) => ({ ...prev, [field]: e.target.value }));
      setError(null); // Clear error on input change
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
        const success = await login(credentials);
        if (success) {
          navigate("/resourceslist", { replace: true });
        } else {
          setError("Invalid credentials - Please check username/password");
        }
      } catch (err) {
        setError("Authentication failed - Please try again later");
      } finally {
        setLoading(false);
      }
    },
    [credentials, login, navigate]
  );

  return (
    <div className={classes.root}>
      <Header height={60} className={classes.header}>
        <Title order={3}>MySpaceX</Title>
      </Header>

      <Container size="xs" className={classes.wrapper}>
        <Box component="section" className={classes.formContainer}>
          <Title order={1} className={classes.title} aria-label="Login page">
            Sign In
          </Title>

          {error && (
            <Alert color="red" title="Authentication Error" className={classes.alert}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit} noValidate>
            <TextInput
              label="Username"
              name="username"
              placeholder="Enter your username"
              value={credentials.username}
              onChange={handleInputChange("username")}
              required
              autoComplete="username"
              aria-describedby="username-help"
              className={classes.inputField}
            />

            <PasswordInput
              label="Password"
              name="password"
              placeholder="Enter your password"
              value={credentials.password}
              onChange={handleInputChange("password")}
              required
              autoComplete="current-password"
              aria-describedby="password-help"
              mt="md"
              className={classes.inputField}
            />

            <Button
              type="submit"
              fullWidth
              mt="xl"
              loading={loading}
              disabled={!credentials.username || !credentials.password}
              aria-busy={loading}
            >
              {loading ? "Authenticating..." : "Sign in"}
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
}