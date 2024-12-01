import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import EmployeeList from './components/Employee/EmployeeList';
import AddEmployee from './components/Employee/AddEmployee';
import EditEmployee from './components/Employee/EditEmployee';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route
                    path="/employees"
                    element={
                        <ProtectedRoute>
                            <EmployeeList />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employees/add"
                    element={
                        <ProtectedRoute>
                            <AddEmployee />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/employees/edit/:id"
                    element={
                        <ProtectedRoute>
                            <EditEmployee />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
};

export default App;









                