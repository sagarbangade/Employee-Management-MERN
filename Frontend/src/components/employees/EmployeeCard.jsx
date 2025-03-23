// Frontend\src\components\employees\EmployeeCard.jsx
import React from 'react';
import { Box, Image, Text, VStack, HStack, IconButton, Card, CardHeader, CardBody, CardFooter, Heading } from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

const EmployeeCard = ({ employee, onDelete }) => {
    const navigate = useNavigate();

    return (
        <Card maxW="sm" borderWidth="1px" borderRadius="md" overflow="hidden">
            <CardHeader>
                <Heading size="md">{employee.name}</Heading>
            </CardHeader>
            <CardBody>
                <VStack align="start" spacing={2}>
                    {employee.profilePictureUrl && (
                        <Image
                            src={employee.profilePictureUrl}
                            alt={employee.name}
                            boxSize="100px"
                            objectFit="cover"
                            borderRadius="full"
                        />
                    )}
                    <Text>Position: {employee.position}</Text>
                    <Text>Contact: {employee.contactInformation || 'N/A'}</Text>
                </VStack>
            </CardBody>
            <CardFooter justify="space-between">
                <HStack spacing="2">
                    <IconButton
                        icon={<EditIcon />}
                        colorScheme="blue"
                        size="sm"
                        onClick={() => navigate(`/edit/${employee._id}`)}
                        aria-label={`Edit ${employee.name}`}
                    />
                    <IconButton
                        icon={<DeleteIcon />}
                        colorScheme="red"
                        size="sm"
                        onClick={() => onDelete(employee._id)}
                        aria-label={`Delete ${employee.name}`}
                    />
                </HStack>
            </CardFooter>
        </Card>
    );
};

export default EmployeeCard;