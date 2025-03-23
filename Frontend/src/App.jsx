import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import EmployeeList from "./components/employees/EmployeeList";
import Register from "./components/auth/Register";
import AddEmployee from "./components/employees/AddEmployee";
import EditEmployee from "./components/employees/EditEmployee";
import Navbar from "./components/Navbar";
import PrivateRoute from "./components/common/PrivateRoute";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />{" "}
          {/* Add Register route */}
          {/* Example Private Routes using Outlet - adjust PrivateRoute as needed */}
          <Route path="/" element={<PrivateRoute />}>
            <Route index element={<EmployeeList />} />
            <Route path="add" element={<AddEmployee />} />
            <Route path="edit/:id" element={<EditEmployee />} />
          </Route>
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
