// server.js
const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 8080;

// Serve static frontend
app.use(express.static(path.join(__dirname, "dist")));

// SPA fallback
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname, "dist/index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Frontend running on port ${PORT}`);
});
