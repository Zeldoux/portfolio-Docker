import React, { useState, useEffect, useContext } from 'react';
import AuthContext from '../../Context/AuthContext'; // Import the authentication context
import Projects from '../../components/Projects'; // Displays the list of projects
import ProjectsAddForm from '../../components/ProjectForm'; // Form to add new projects
import LoginForm from '../../components/LoginForm'; // Login form for authentication

/**
 * Component: AdminPage
 * 
 * The admin page for managing projects. Allows adding new projects and viewing existing ones.
 * Requires authentication to access.
 */
const AdminPage = () => {
  const [projects, setProjects] = useState([]); // State to store project data
  const { token, isLoggedIn, logout } = useContext(AuthContext); // Access authentication context

  // Fetch projects from the backend
  const fetchProjects = () => {
    fetch('/api/project')
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .catch((err) => console.error(err)); // Log errors to the console
  };

  // Fetch projects whenever the user logs in
  useEffect(() => {
    if (isLoggedIn) {
      fetchProjects();
    }
  }, [isLoggedIn, token]);

  // Show the login form if the user is not logged in
  if (!isLoggedIn) {
    return (
      <div className="unauthorized-access">
        <p className="warning-message">Vous devez être connecté pour accéder à cette page.</p>
        <LoginForm />
        <button onClick={() => window.location.href = '/'} className="back-home-button">
          Retour à la page d'accueil
        </button>
      </div>
    );
  }

  return (
    <main>
      <>
        {/* Form to add new projects */}
        <ProjectsAddForm token={token} fetchProjects={fetchProjects} />

        {/* List of projects */}
        <Projects projects={projects} fetchProjects={fetchProjects} />

        {/* Logout button */}
        <button onClick={logout}>Logout</button>
      </>
    </main>
  );
};

export default AdminPage;
