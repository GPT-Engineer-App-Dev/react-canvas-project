import { Container, Text, VStack, Heading, Button } from "@chakra-ui/react";
import { FaPaintBrush } from "react-icons/fa";

const Index = () => {
  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <VStack spacing={4}>
        <Heading as="h1" size="2xl" mb={4}>Welcome to Your Blank Canvas</Heading>
        <Text fontSize="xl">Start creating your masterpiece with us.</Text>
        <Button leftIcon={<FaPaintBrush />} colorScheme="teal" size="lg" mt={6}>
          Get Started
        </Button>
      </VStack>
    </Container>
  );
};

export default Index;