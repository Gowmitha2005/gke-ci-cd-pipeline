const http = require("http");

const PORT = process.env.PORT || 8080;
const DEPLOYED_COMMIT = process.env.DEPLOYED_COMMIT || "local";

const server = http.createServer((req, res) => {
  if (req.url === "/healthz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "alive" }));
  }

  if (req.url === "/readyz") {
    res.writeHead(200, { "Content-Type": "application/json" });
    return res.end(JSON.stringify({ status: "ready", commit: DEPLOYED_COMMIT }));
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(
    JSON.stringify({
      message: "Hello from GKE (gowmitha-ingress)!",
      environment: process.env.NODE_ENV || "development",
      commit: DEPLOYED_COMMIT,
    })
  );
});

if (require.main === module) {
  server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

module.exports = server;
