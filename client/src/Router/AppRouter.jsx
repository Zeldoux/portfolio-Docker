// src/Router/AppRouter.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'; // React Router components
import Layout from '../Layouts/Layout'; // Main layout wrapper
import MainPage from '../Pages/MainPage/MainPage'; // Main public page
import AdminPage from '../Pages/AdminPage/AdminPage'; // Admin dashboard page
import ErrorPage from '../Pages/ErrorPage/ErrorPage'; // Error page for handling 404 or unauthorized access
import ProtectedRoute from '../Router/ProtectedRoute'; // Component for route protection

/**
 * Component: AppRouter
 * 
 * This component defines the application's routing structure using React Router.
 * It manages public, protected, and error routes.
 */
const AppRouter = () => {
    // Fetch the authentication token from localStorage
    const token = localStorage.getItem('token'); 

    return (
        <Router>
            <Routes>
                {/* Public route: Main page */}
                <Route 
                    path="/" 
                    element={
                        <Layout>
                            <MainPage />
                        </Layout>
                    } 
                />

                {/* Protected route: Admin page */}
                <Route
                    path="/adminpage"
                    element={
                            <Layout>
                                <AdminPage />
                            </Layout>
                    }
                />

                {/* Public route: Error page */}
                <Route 
                    path="/error" 
                    element={
                        <Layout>
                            <ErrorPage />
                        </Layout>
                    } 
                />

                {/* Catch-all route: Redirect to error page */}
                <Route
                    path="*"
                    element={
                        <Navigate
                            to="/error" // Redirects to the error page for invalid routes
                            replace // Replaces the current history entry
                            state={{ message: "Page not found. The page you are looking for does not exist." }}
                        />
                    }
                />
            </Routes>
        </Router>
    );
};

export default AppRouter;
