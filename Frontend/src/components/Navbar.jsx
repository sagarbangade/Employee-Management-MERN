import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Flex, Spacer, Heading } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingY={5}
      paddingX={6}
      shadow="md"
      mb={4}
    >
      <Heading as="h1" size="lg" fontWeight="bold" color="teal.500">
        Employee Management
      </Heading>
      <Spacer />
      <Flex align="center" gap={4}>
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          Home
        </Button>
        <Button as={Link} to="/" colorScheme="teal" variant="ghost">
          Employees
        </Button>
        <Button as={Link} to="/add" colorScheme="teal" variant="ghost">
          Add Employee
        </Button>
        <Button colorScheme="red" onClick={handleLogout}>
          Logout
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
