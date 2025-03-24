import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createEmployee, clearError } from '../../store/actions/employeeActions';
import { useNavigate } from 'react-router-dom';
import {
    Box,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    VStack,
    Alert,
    AlertIcon,
    CloseButton,
    FormErrorMessage,
    Spinner,
    FormHelperText,
} from '@chakra-ui/react';
import { Formik, Field, Form } from 'formik';
import * as Yup from 'yup';

const AddEmployee = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.employee);
    const [file, setFile] = useState(null);

    useEffect(() => {
        if (error) {
            setTimeout(() => {
                dispatch(clearError());
            }, 5000);
        }
    }, [error, dispatch]);

    const validationSchema = Yup.object().shape({
        name: Yup.string().required('Name is required'),
        position: Yup.string().required('Position is required'),
        contactInformation: Yup.string(),
        profilePicture: Yup.mixed().nullable()
    });


    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const formData = new FormData();
            formData.append('name', values.name);
            formData.append('position', values.position);
            formData.append('contactInformation', values.contactInformation);
            if (file) {
                formData.append('profilePicture', file);
            }
            await dispatch(createEmployee(formData));
            resetForm();
            setFile(null); // Clear file input
            navigate('/'); // Redirect to employee list after successful creation
        } catch (err) {
            // Error handled by Redux state
        } finally {
            setSubmitting(false);
        }
    };

    const handleFileChange = (event) => {
        setFile(event.currentTarget.files[0]);
    };


    return (
        <Box maxW="md" mx="auto" mt={8} p={6} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading textAlign="center" mb={4}>Add New Employee</Heading>
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
                <Formik
                    initialValues={{ name: '', position: '', contactInformation: '', profilePicture: null }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {(props) => (
                        <Form>
                            <VStack spacing={4} align="stretch">
                                <FormControl isRequired isInvalid={props.errors.name && props.touched.name}>
                                    <FormLabel htmlFor="name">Name</FormLabel>
                                    <Field as={Input} type="text" id="name" name="name" placeholder="Employee Name" />
                                    <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                                </FormControl>

                                <FormControl isRequired isInvalid={props.errors.position && props.touched.position}>
                                    <FormLabel htmlFor="position">Position</FormLabel>
                                    <Field as={Input} type="text" id="position" name="position" placeholder="Position" />
                                    <FormErrorMessage>{props.errors.position}</FormErrorMessage>
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="contactInformation">Contact Information</FormLabel>
                                    <Field
                                        as={Textarea}
                                        id="contactInformation"
                                        name="contactInformation"
                                        placeholder="Contact Details"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel htmlFor="profilePicture">Profile Picture (Optional)</FormLabel>
                                    <Input type="file" id="profilePicture" name="profilePicture" onChange={handleFileChange} accept="image/*" />
                                    <FormHelperText>Upload employee profile picture (JPEG, PNG, JPG)</FormHelperText>
                                </FormControl>


                                <Button type="submit" colorScheme="green" isLoading={props.isSubmitting}>
                                    Add Employee
                                </Button>
                            </VStack>
                        </Form>
                    )}
                </Formik>
            )}
        </Box>
    );
};

export default AddEmployee;