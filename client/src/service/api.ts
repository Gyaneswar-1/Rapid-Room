const API =
  window.location.hostname === "localhost"
    ? "http://localhost:3000/api/v1" // Local API
    : "https://rapid-room-server.onrender.com/api/v1"; // Deployed API

export default API;

