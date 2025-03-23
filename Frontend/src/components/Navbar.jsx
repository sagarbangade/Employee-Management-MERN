import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Button,
  Flex,
  Spacer,
  Heading,
  IconButton,
  useBreakpointValue,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useBreakpointValue({ base: true, md: false });

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingY={4}
      paddingX={10}
      shadow="md"
      mb={4}
      wrap="wrap"
    >
      <Heading as="h1" size="lg" fontWeight="bold" color="teal.500">
        Employee Management
      </Heading>
      <Spacer />
      {isMobile ? (
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
          <MenuList>
            <MenuItem as={Link} to="/">
              Home
            </MenuItem>
            <MenuItem as={Link} to="/add">
              Add Employee
            </MenuItem>
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex align="center" gap={4}>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost">
            Home
          </Button>
          <Button as={Link} to="/add" colorScheme="teal" variant="ghost">
            Add Employee
          </Button>
          <Button colorScheme="red" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
