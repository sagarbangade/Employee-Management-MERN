import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../store/actions/authActions';
import { useNavigate, Link } from 'react-router-dom';
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
} from '@chakra-ui/react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isAuthenticated) {
            navigate('/'); // Redirect to employee list after login
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

    return (
        <Box maxW="md" mx="auto" mt={8} p={6} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading textAlign="center" mb={4}>Login</Heading>
            {error && (
                <Alert status="error" borderRadius="md" mb={4}>
                    <AlertIcon />
                    {error}
                    <CloseButton position="absolute" right="8px" top="8px" onClick={() => dispatch(clearError())} />
                </Alert>
            )}
            {loading ? (
                <Box textAlign="center"><Spinner size="lg" /></Box>
            ) : (
                <form onSubmit={handleSubmit}>
                    <VStack spacing={4} align="stretch">
                        <FormControl isRequired>
                            <FormLabel htmlFor="username">Username</FormLabel>
                            <Input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Button type="submit" colorScheme="blue">Login</Button>
                        {/* Optional Registration Link */}
                        {/* <Box textAlign="center">
                            <Link to="/register">Don't have an account? Register here</Link>
                        </Box> */}
                    </VStack>
                </form>
            )}
        </Box>
    );
};

export default Login;