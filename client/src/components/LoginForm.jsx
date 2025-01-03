import React, { useState, useContext } from 'react';
import AuthContext from '../Context/AuthContext'; // Import the authentication context

/**
 * Component: LoginForm
 * Handles user login by collecting email and password,
 * sending them to the server, and updating the auth context upon success.
 */
function LoginForm() {
  const { login } = useContext(AuthContext); // Access the login function from the AuthContext
  const [email, setEmail] = useState(''); // State for the email input field
  const [password, setPassword] = useState(''); // State for the password input field
  const [error, setError] = useState(null); // State for displaying error messages

  /**
   * Handles form submission:
   * - Sends a POST request with email and password.
   * - Updates the auth context with the received token if login is successful.
   * - Displays an error message if login fails.
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    // Send login credentials to the server
    fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }) // Send email and password as JSON
    })
      .then((res) => res.json()) // Parse the response as JSON
      .then((data) => {
        console.log('Login response:', data); // Log server response for debugging
        if (data.token) {
          login(data.token); // Update context with the received token
        } else {
          setError('Invalid email or password'); // Display an error if login fails
        }
      })
      .catch(() => setError('An error occurred. Please try again.')); // Handle network or other errors
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Display error message if there's an error */}
      {error && <p className="error-message">{error}</p>}

      {/* Email input field */}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)} // Update email state on input change
        required
      />

      {/* Password input field */}
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)} // Update password state on input change
        required
      />

      {/* Submit button */}
      <button type="submit">Login</button>
    </form>
  );
}

export default LoginForm;
