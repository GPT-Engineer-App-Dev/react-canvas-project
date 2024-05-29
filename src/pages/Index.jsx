import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaPaintBrush } from "react-icons/fa";
import { useLogout } from "../integrations/supabase/index.js";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to Your Blank Canvas</Heading>
        <Text fontSize="xl">Start creating your masterpiece with us.</Text>
        <Button leftIcon={<FaPaintBrush />} colorScheme="teal" size="lg" mt={6}>
          Get Started
        </Button>
        <Button colorScheme="red" size="lg" mt={6} onClick={handleLogout}>
          Logout
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;