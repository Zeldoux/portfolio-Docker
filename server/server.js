// Importing the HTTP module to create a server
const http = require('http');

// Importing the Express application from the app.js file
const app = require('./app');

// Function to normalize the port value for ensuring valid input
const normalizePort = val => {
  const port = parseInt(val, 10); // Parse the value to an integer

  if (isNaN(port)) {
    // If the value is not a number, return it as-is (e.g., named pipe)
    return val;
  }
  if (port >= 0) {
    // If the port is a valid non-negative number, return it
    return port;
  }
  return false; // Invalid port value
};

// Define the port the server will listen on, using the environment variable or default to 3000
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port); // Set the port for the Express app

// Function to handle specific errors related to server listening
const errorHandler = error => {
  if (error.syscall !== 'listen') {
    // If the error is not related to the 'listen' syscall, throw it
    throw error;
  }
  const address = server.address(); // Get server address information
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;

  // Handle specific error codes for the listening process
  switch (error.code) {
    case 'EACCES': // Error when access is denied due to insufficient privileges
      console.error(bind + ' requires elevated privileges.');
      process.exit(1); // Exit the process with a failure code
      break;
    case 'EADDRINUSE': // Error when the port is already in use
      console.error(bind + ' is already in use.');
      process.exit(1); // Exit the process with a failure code
      break;
    default:
      throw error; // For any other error, throw it
  }
};

// Create the HTTP server using the Express application
const server = http.createServer(app);

// Register the error handler for the server
server.on('error', errorHandler);

// Log when the server starts listening
server.on('listening', () => {
  const address = server.address(); // Get server address information
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind); // Log the bind information
});

// Start the server and make it listen on the specified port
server.listen(process.env.PORT || 3000);
