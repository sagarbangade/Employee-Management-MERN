import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, clearError } from "../../store/actions/authActions";
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
  Spinner,
  Text,
  InputGroup,
  InputRightElement,
  IconButton,
  Container,
  Flex,
  useBreakpointValue,
  useColorModeValue,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();
  const { loading, error } = useSelector((state) => state.auth);

  // Responsive values
  const boxWidth = useBreakpointValue({ base: "90%", sm: "450px", md: "500px" });
  const padding = useBreakpointValue({ base: 4, sm: 6, md: 8 });
  const headingSize = useBreakpointValue({ base: "xl", sm: "xl", md: "2xl" });
  
  // Theme colors
  const boxBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  // Redirect after successful registration with a delay for user feedback
  useEffect(() => {
    if (registrationSuccess) {
      const timer = setTimeout(() => {
        navigate("/login");
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [registrationSuccess, navigate]);

  const validateForm = () => {
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match");
      return false;
    }
    
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return false;
    }
    
    setPasswordError("");
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    dispatch(registerUser({ username, password }))
      .then(() => {
        setRegistrationSuccess(true);
        toast({
          title: "Registration successful!",
          description: "You will be redirected to the login page.",
          status: "success",
          duration: 2000,
          isClosable: true,
          position: "top",
        });
      })
      .catch((registerError) => {
        console.error("Registration failed:", registerError);
      });
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Container centerContent minH="100vh" py={{ base: 4, md: 5 }}>
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
          <Heading size={headingSize} textAlign="center" mb={6} color="green.600">
            Create Account
          </Heading>
          
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
          
          {registrationSuccess ? (
            <Alert status="success" borderRadius="md" mb={4}>
              <AlertIcon />
              <Text>Registration successful! Redirecting to login page...</Text>
            </Alert>
          ) : loading ? (
            <Box textAlign="center" py={10}>
              <Spinner size="xl" thickness="4px" color="green.500" />
              <Text mt={3} fontSize="sm">Creating your account...</Text>
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
                    focusBorderColor="green.500"
                    placeholder="Choose a username"
                  />
                </FormControl>
                
                <FormControl isRequired isInvalid={!!passwordError}>
                  <FormLabel htmlFor="password" fontSize={{ base: "sm", md: "md" }}>
                    Password
                  </FormLabel>
                  <InputGroup size={{ base: "md", md: "lg" }}>
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        setPasswordError("");
                      }}
                      borderRadius="md"
                      focusBorderColor="green.500"
                      placeholder="Create a password"
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
                
                <FormControl isRequired isInvalid={!!passwordError}>
                  <FormLabel htmlFor="confirmPassword" fontSize={{ base: "sm", md: "md" }}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);
                      setPasswordError("");
                    }}
                    size={{ base: "md", md: "lg" }}
                    borderRadius="md"
                    focusBorderColor="green.500"
                    placeholder="Confirm your password"
                  />
                  {passwordError && (
                    <Text color="red.500" fontSize="sm" mt={1}>
                      {passwordError}
                    </Text>
                  )}
                </FormControl>

                <Button 
                  type="submit" 
                  colorScheme="green" 
                  size={{ base: "md", md: "lg" }}
                  w="full"
                  mt={2}
                  fontWeight="bold"
                >
                  Register
                </Button>

                <Box textAlign="center" mt={2}>
                  <Text fontSize={{ base: "xs", sm: "sm" }}>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "var(--chakra-colors-green-500)" }}>
                      Sign in
                    </Link>
                  </Text>
                </Box>
              </VStack>
            </form>
          )}
          
          <Text fontSize="xs" color="gray.500" textAlign="center" mt={6}>
            By registering, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </Box>
      </Flex>
    </Container>
  );
};

export default Register;