import React, { useState } from "react";
import {
  Box,
  Image,
  Text,
  VStack,
  HStack,
  IconButton,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
  useColorModeValue,
  Badge,
  Flex,
  Spacer,
  Tooltip,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, EmailIcon, PhoneIcon, ViewIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const EmployeeCard = ({ employee, onDelete }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Color scheme for a professional look
  const cardBg = useColorModeValue("white", "gray.800");
  const headerBg = useColorModeValue("blue.50", "blue.900");
  const shadow = useColorModeValue("sm", "dark-lg");
  const borderColor = useColorModeValue("blue.100", "blue.700");
  const accentColor = useColorModeValue("blue.600", "blue.300");

  // Determine contact icon
  const hasEmail = employee.contactInformation && employee.contactInformation.includes('@');
  const contactIcon = hasEmail ? <EmailIcon mr={1} /> : <PhoneIcon mr={1} />;

  // Format employee ID
  const employeeId = employee._id ? `ID: ${employee._id.substring(0, 6)}...` : "No ID";

  return (
    <>
      <Card
        maxW="sm"
        borderWidth="1px"
        borderRadius="md"
        borderColor={borderColor}
        overflow="hidden"
        bg={cardBg}
        boxShadow={shadow}
        transition="all 0.2s"
        _hover={{ boxShadow: "md", borderColor: accentColor }}
      >
        <CardHeader bg={headerBg} py={2} px={4}>
          <Flex align="center">
            <Heading size="sm" color={accentColor}>
              {employee.name}
            </Heading>
            <Spacer />
            <Text fontSize="xs" color="gray.500">
              {employeeId}
            </Text>
          </Flex>
        </CardHeader>

        <CardBody p={4}>
          <HStack spacing={4} align="start">
            {/* Employee Photo */}
            {employee.profilePictureUrl ? (
              <Image
                src={employee.profilePictureUrl}
                alt={employee.name}
                boxSize="90px"
                objectFit="cover"
                borderRadius="md"
                border="1px solid"
                borderColor="gray.200"
              />
            ) : (
              <Flex
                boxSize="90px"
                borderRadius="md"
                bg="gray.100"
                align="center"
                justify="center"
                border="1px solid"
                borderColor="gray.200"
              >
                <Text fontSize="3xl" color="gray.400" fontWeight="bold">
                  {employee.name.charAt(0)}
                </Text>
              </Flex>
            )}

            {/* Employee Details */}
            <VStack align="start" spacing={2} flex={1}>
              <Box w="full">
                <Flex align="center">
                  <Text fontSize="sm" fontWeight="bold">
                    {employee.position}
                  </Text>
                  <Spacer />
                  {employee.status && (
                    <Badge 
                      colorScheme={employee.status === "Active" ? "green" : "orange"} 
                      size="sm"
                    >
                      {employee.status}
                    </Badge>
                  )}
                </Flex>
              </Box>

              {employee.department && (
                <Text fontSize="sm" color="gray.600">
                  {employee.department}
                </Text>
              )}

              <HStack fontSize="sm">
                {contactIcon}
                <Text>{employee.contactInformation || "No contact info"}</Text>
              </HStack>

              {employee.startDate && (
                <Text fontSize="xs" color="gray.500">
                  Started: {new Date(employee.startDate).toLocaleDateString()}
                </Text>
              )}
            </VStack>
          </HStack>
        </CardBody>

        <Divider borderColor={borderColor} />

        <CardFooter justify="flex-end" py={2} px={3} bg={headerBg}>
          <HStack spacing={2}>
            <Tooltip label="View employee details">
              <IconButton
                icon={<ViewIcon />}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                onClick={onOpen}
                aria-label={`View details of ${employee.name}`}
              />
            </Tooltip>
            <Tooltip label="Edit employee">
              <IconButton
                icon={<EditIcon />}
                colorScheme="blue"
                variant="ghost"
                size="sm"
                onClick={() => navigate(`/edit/${employee._id}`)}
                aria-label={`Edit ${employee.name}`}
              />
            </Tooltip>
            <Tooltip label="Delete employee">
              <IconButton
                icon={<DeleteIcon />}
                colorScheme="red"
                variant="ghost"
                size="sm"
                onClick={() => onDelete(employee._id)}
                aria-label={`Delete ${employee.name}`}
              />
            </Tooltip>
          </HStack>
        </CardFooter>
      </Card>

      {/* Employee Details Modal */}
      <Modal isOpen={isOpen} onClose={onClose} size="md">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{employee.name}'s Details</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack spacing={3} align="start">
              {employee.profilePictureUrl && (
                <Image
                  src={employee.profilePictureUrl}
                  alt={employee.name}
                  boxSize="150px"
                  objectFit="cover"
                  borderRadius="full"
                  alignSelf="center"
                />
              )}
              <Text fontSize="md"><b>Position:</b> {employee.position}</Text>
              <Text fontSize="md"><b>Contact:</b> {employee.contactInformation || "N/A"}</Text>
              {/* <Text fontSize="md"><b>Email:</b> {employee.email || "N/A"}</Text>
              <Text fontSize="md"><b>Department:</b> {employee.department || "N/A"}</Text>
              <Text fontSize="md"><b>Joining Date:</b> {employee.startDate ? new Date(employee.startDate).toLocaleDateString() : "N/A"}</Text> */}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default EmployeeCard;
