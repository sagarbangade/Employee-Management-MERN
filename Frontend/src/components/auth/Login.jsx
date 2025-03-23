import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, clearError } from "../../store/actions/authActions";
import { useNavigate, Link } from "react-router-dom";
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  CloseButton,
  Box,
  Flex,
  Spinner,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Image,
  useBreakpointValue,
  Container,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  // Responsive values
  const boxWidth = useBreakpointValue({ base: "90%", sm: "450px", md: "500px" });
  const padding = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  const logoSize = useBreakpointValue({ base: "60px", sm: "70px", md: "80px" });
  const headingSize = useBreakpointValue({ base: "xl", sm: "xl", md: "2xl" });
  
  // Theme colors
  const boxBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/"); // Redirect to employee list after login
    }
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000); // Clear error message after 5 seconds
    }
  }, [isAuthenticated, navigate, error, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser({ username, password }));
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container centerContent minH="100vh" py="5">
      <Flex direction="column" align="center" justify="center" minH="80vh" w="full">
        <Box
          width={boxWidth}
          p={padding}
          shadow="lg"
          borderWidth="1px"
          borderRadius="lg"
          bg={boxBg}
          borderColor={borderColor}
          transition="all 0.3s"
        >
          <VStack spacing={5} align="center" mb={6}>
            {/* Company logo placeholder - replace with your actual logo */}
            <Image
              src="/company-logo.png" 
              fallback={
                <Box
                  w={logoSize}
                  h={logoSize}
                  borderRadius="md"
                  bg="blue.500"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Text fontSize="2xl" fontWeight="bold" color="white">
                    EM
                  </Text>
                </Box>
              }
              alt="Company Logo" 
              boxSize={logoSize}
            />
            
            <Heading size={headingSize} textAlign="center">
              Employee Portal
            </Heading>
            
            <Text fontSize={{ base: "sm", md: "md" }} color="gray.500">
              Sign in to access the management system
            </Text>
          </VStack>

          {error && (
            <Alert status="error" borderRadius="md" mb={4} fontSize={{ base: "sm", md: "md" }}>
              <AlertIcon />
              {error}
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={() => dispatch(clearError())}
              />
            </Alert>
          )}
          
          {loading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" thickness="4px" color="blue.500" />
              <Text mt={3} fontSize="sm">Authenticating...</Text>
            </Box>
          ) : (
            <form onSubmit={handleSubmit}>
              <VStack spacing={4} align="stretch">
                <FormControl isRequired>
                  <FormLabel htmlFor="username" fontSize={{ base: "sm", md: "md" }}>
                    Username
                  </FormLabel>
                  <Input
                    type="text"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    size={{ base: "md", md: "lg" }}
                    borderRadius="md"
                    focusBorderColor="blue.500"
                    placeholder="Enter your username"
                  />
                </FormControl>
                
                <FormControl isRequired>
                  <FormLabel htmlFor="password" fontSize={{ base: "sm", md: "md" }}>
                    Password
                  </FormLabel>
                  <InputGroup size={{ base: "md", md: "lg" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      borderRadius="md"
                      focusBorderColor="blue.500"
                      placeholder="Enter your password"
                    />
                    <InputRightElement>
                      <IconButton
                        icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                        variant="ghost"
                        size="sm"
                        onClick={togglePasswordVisibility}
                        aria-label={showPassword ? "Hide password" : "Show password"}
                      />
                    </InputRightElement>
                  </InputGroup>
                </FormControl>

                <Button 
                  type="submit" 
                  colorScheme="blue" 
                  size={{ base: "md", md: "lg" }}
                  w="full"
                  mt={2}
                  fontWeight="bold"
                >
                  Sign In
                </Button>

                <Flex mt={2} justifyContent="space-between" fontSize={{ base: "xs", sm: "sm" }}>
                  <Link to="/forgot-password">Forgot password?</Link>
                  <Link to="/register">Create account</Link>
                </Flex>
              </VStack>
            </form>
          )}
          
          <Text fontSize="xs" color="gray.500" textAlign="center" mt={6}>
            © {new Date().getFullYear()} Employee Management System. All rights reserved.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Login;