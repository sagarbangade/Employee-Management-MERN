import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployeeDetails,
  updateEmployee,
  clearError,
} from "../../store/actions/employeeActions";
import { useNavigate, useParams } from "react-router-dom";
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
  Image,
  FormHelperText,
} from "@chakra-ui/react";
import { Formik, Field, Form } from "formik";
import * as Yup from "yup";

const EditEmployee = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { employee, loading, error } = useSelector((state) => state.employee);
  const [file, setFile] = useState(null);

  useEffect(() => {
    dispatch(getEmployeeDetails(id)); // Fetch employee details on component mount
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, id, error]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    position: Yup.string().required("Position is required"),
    contactInformation: Yup.string(),
    profilePicture: Yup.mixed().nullable(),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("position", values.position);
      formData.append("contactInformation", values.contactInformation);
      if (file) {
        formData.append("profilePicture", file);
      }

      await dispatch(updateEmployee(id, formData));
      navigate("/"); // Redirect to employee list after successful update
    } catch (err) {
      // Error handled by Redux state
    } finally {
      setSubmitting(false);
    }
  };

  const handleFileChange = (event) => {
    setFile(event.currentTarget.files[0]);
  };

  if (loading && !employee) {
    // Initial loading
    return (
      <Box textAlign="center" mt={8}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (!employee) {
    // Employee details not loaded yet or not found
    return (
      <Box textAlign="center" mt={8}>
        Employee not found.
      </Box>
    );
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={8}
      p={6}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
    >
      <Heading textAlign="center" mb={4}>
        Edit Employee
      </Heading>
      {error && (
        <Alert status="error" borderRadius="md" mb={4}>
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
        <Box textAlign="center">
          <Spinner size="lg" />
        </Box>
      ) : (
        <Formik
          initialValues={{
            name: employee.name || "",
            position: employee.position || "",
            contactInformation: employee.contactInformation || "",
            profilePicture: null, // File input reset on each edit for simplicity. Can be improved.
          }}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          enableReinitialize // Important to re-initialize form when employee data loads
        >
          {(props) => (
            <Form>
              <VStack spacing={4} align="stretch">
                {/* Example 1: Name Field - Correctly wrapped in FormControl */}
                <FormControl
                  isRequired
                  isInvalid={props.errors.name && props.touched.name}
                >
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Employee Name"
                  />
                  <FormErrorMessage>{props.errors.name}</FormErrorMessage>
                </FormControl>

                {/* Example 2: Position Field - Correctly wrapped in FormControl */}
                <FormControl
                  isRequired
                  isInvalid={props.errors.position && props.touched.position}
                >
                  <FormLabel htmlFor="position">Position</FormLabel>
                  <Field
                    as={Input}
                    type="text"
                    id="position"
                    name="position"
                    placeholder="Position"
                  />
                  <FormErrorMessage>{props.errors.position}</FormErrorMessage>
                </FormControl>

                {/* Example 3: Contact Information - Correctly wrapped in FormControl (even though not using error/helper text here) */}
                <FormControl>
                  <FormLabel htmlFor="contactInformation">
                    Contact Information
                  </FormLabel>
                  <Field
                    as={Textarea}
                    id="contactInformation"
                    name="contactInformation"
                    placeholder="Contact Details"
                  />
                </FormControl>

                {/* **Crucially: Profile Picture FormControl - Ensure FormHelperText is inside** */}
                <FormControl>
                  <FormLabel htmlFor="profilePicture">
                    Update Profile Picture (Optional)
                  </FormLabel>
                  <Input
                    type="file"
                    id="profilePicture"
                    name="profilePicture"
                    onChange={handleFileChange}
                    accept="image/*"
                  />
                  <FormHelperText>
                    {" "}
                    {/* **FormHelperText MUST be inside FormControl** */}
                    Upload new employee profile picture to replace the existing
                    one (JPEG, PNG, JPG)
                  </FormHelperText>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  isLoading={props.isSubmitting}
                >
                  Update Employee
                </Button>
              </VStack>
            </Form>
          )}
        </Formik>
      )}
    </Box>
  );
};

export default EditEmployee;
