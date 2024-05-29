import { useState } from "react";
import { Container, VStack, Heading, Input, Button, Text } from "@chakra-ui/react";
import { useLogin } from "../integrations/supabase/index.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const loginMutation = useLogin();

  const handleLogin = async () => {
    try {
      await loginMutation.mutateAsync({ email, password });
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Login</Heading>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
        />
        <Input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button colorScheme="teal" size="lg" mt={6} onClick={handleLogin}>
          Login
        </Button>
        {loginMutation.isError && (
          <Text color="red.500">{loginMutation.error.message}</Text>
        )}
      </VStack>
    </Container>
  );
};

export default Login;