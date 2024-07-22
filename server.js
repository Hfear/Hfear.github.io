const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express();
const port = 4000;

// Set up a proxy to forward requests to the IUCN Red List API
app.use("/api", createProxyMiddleware({
  target: "https://api.iucnredlist.org",
  changeOrigin: true,
  pathRewrite: {
    "^/api": "", // remove /api prefix when forwarding to target
  },
}));

app.get("/", (req, res) => {
  res.send("ProXY SERVER");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
