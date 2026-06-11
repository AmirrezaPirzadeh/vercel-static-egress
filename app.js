const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8080;
const JWT_SECRET = process.env.JWT_SECRET;
const TARGET_URL = process.env.TARGET_URL;

// JWT Verification Middleware
app.use((req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access Denied: No Token Provided" });
  }

  try {
    const verified = jwt.verify(token, JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(403).json({ error: "Invalid or Expired Token" });
  }
});

app.use(
  "/",
  createProxyMiddleware({
    target: TARGET_URL,
    changeOrigin: true,
    secure: true,
    logLevel: "debug",
  }),
);

app.listen(PORT, () => {
  console.log(`running on port ${PORT}`);
});
