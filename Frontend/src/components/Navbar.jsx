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
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useDispatch } from "react-redux";
import { logoutUser } from "../store/actions/authActions";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isMobile = useBreakpointValue({ base: true, md: false });
  
  // Reduced logo size
  const logoSize = useBreakpointValue({ base: "30px", sm: "35px", md: "40px" });

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      paddingY={3}
      paddingX={12}
      shadow="md"
      mb={4}
      wrap="wrap"
    >
      {/* Logo Section */}
      <Flex align="center" gap={2}>
        <Image
          src="https://cdn-icons-png.freepik.com/256/4116/4116352.png?semt=ais_hybrid"
          alt="Company Logo"
          boxSize={logoSize}
        />
        <Heading as="h1" size="md" fontWeight="bold" color="teal.500">
          EMP Management
        </Heading>
      </Flex>

      <Spacer />

      {isMobile ? (
        <Menu>
          <MenuButton as={IconButton} icon={<HamburgerIcon />} variant="outline" />
          <MenuList>
            <MenuItem as={Link} to="/">Home</MenuItem>
            <MenuItem as={Link} to="/add">Add Employee</MenuItem>
            <MenuItem onClick={handleLogout} color="red.500">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      ) : (
        <Flex align="center" gap={3}>
          <Button as={Link} to="/" colorScheme="teal" variant="ghost" size="sm">
            Home
          </Button>
          <Button as={Link} to="/add" colorScheme="teal" variant="ghost" size="sm">
            Add Employee
          </Button>
          <Button colorScheme="red" size="sm" onClick={handleLogout}>
            Logout
          </Button>
        </Flex>
      )}
    </Flex>
  );
};

export default Navbar;
