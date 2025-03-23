import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getEmployees,
  deleteEmployee,
  clearError,
} from "../../store/actions/employeeActions";
import { useNavigate, Link } from "react-router-dom";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  IconButton,
  Alert,
  AlertIcon,
  CloseButton,
  Flex,
  Spacer,
  Input,
  Text,
  Spinner,
  SimpleGrid, // Import SimpleGrid for card layout
  Select,
} from "@chakra-ui/react";
import { EditIcon, DeleteIcon, AddIcon, SearchIcon } from "@chakra-ui/icons";
import { logoutUser } from "../../store/actions/authActions";
import EmployeeCard from "./EmployeeCard"; // Import EmployeeCard component
const EmployeeList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { employees, loading, error, totalPages, currentPage, totalEmployees } =
    useSelector((state) => state.employee);
  const { isAuthenticated } = useSelector((state) => state.auth);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const limitOptions = [6, 9, 18];
  const [limit, setLimit] = useState(limitOptions[1]); // Default limit to 10

  useEffect(() => {
    console.log(
      "EmployeeList useEffect triggered. isAuthenticated:",
      isAuthenticated,
      "page:",
      page,
      "limit:",
      limit,
      "searchQuery:",
      searchQuery
    ); // Added console.log
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    dispatch(getEmployees(page, limit, searchQuery));
    if (error) {
      setTimeout(() => {
        dispatch(clearError());
      }, 5000);
    }
  }, [dispatch, isAuthenticated, navigate, error, page, limit, searchQuery]);

  const handleDelete = (id) => {
    dispatch(deleteEmployee(id)).then(() => {
      dispatch(getEmployees(page, limit, searchQuery)); // Refresh employee list after delete
    });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setPage(1); // Reset page to 1 when searching
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
    }
  };

  const handleLimitChange = (e) => {
    setLimit(parseInt(e.target.value, 10));
    setPage(1); // Reset page to 1 when limit changes
  };

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Box p={5} maxW="7xl" mx="auto">
      <Flex mb={4} alignItems="center">
        <Heading as="h2" size="lg">
          Employee List
        </Heading>
        <Spacer />
        <Button
          leftIcon={<AddIcon />}
          colorScheme="green"
          mr={2}
          onClick={() => navigate("/add")}
        >
          Add Employee
        </Button>
        {/* <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button> */}
      </Flex>

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

      <Flex mb={4} align="center">
        <Input
          placeholder="Search by name or position"
          value={searchQuery}
          onChange={handleSearchChange}
          mr={3}
        />
        <Button
          leftIcon={<SearchIcon />}
          onClick={() => dispatch(getEmployees(1, limit, searchQuery))}
        >
          Search
        </Button>
      </Flex>

      {loading ? (
        <Box textAlign="center">
          <Spinner size="xl" />
        </Box>
      ) : (
        <>
          <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={5} mb={4}>
            {employees.map((employee) => (
              <EmployeeCard
                key={employee._id}
                employee={employee}
                onDelete={handleDelete}
              />
            ))}
          </SimpleGrid>

          {/* <Flex mt={4} align="center">
            <Text mr={2}>Items per page:</Text>
            <Select
              value={limit}
              onChange={handleLimitChange}
              width="80px"
              mr={4}
            >
              {limitOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Text mr={4}>
              Page {currentPage} of {totalPages} (Total Employees:{" "}
              {totalEmployees})
            </Text>
            <Spacer />
            <Button
              isDisabled={currentPage <= 1}
              onClick={() => handlePageChange(currentPage - 1)}
              mr={2}
            >
              Previous
            </Button>
            <Button
              isDisabled={currentPage >= totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </Button>
          </Flex> */}
           <Flex mt={4} align="center" direction={{ base: "column", md: "row" }}>
            <Flex align="center" mb={{ base: 3, md: 0 }}>
              <Text mr={2}>Items per page:</Text>
              <Select value={limit} onChange={handleLimitChange} width="80px" mr={4}>
                {limitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </Select>
            </Flex>
            <Text flexShrink={0} textAlign="center">
              Page {currentPage} of {totalPages} (Total Employees: {totalEmployees})
            </Text>
            <Spacer />
            <Flex>
              <Button isDisabled={currentPage <= 1} onClick={() => handlePageChange(currentPage - 1)} mr={2}>
                Previous
              </Button>
              <Button isDisabled={currentPage >= totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                Next
              </Button>
            </Flex>
          </Flex>
        </>
      )}
    </Box>
  );
};

export default EmployeeList;
