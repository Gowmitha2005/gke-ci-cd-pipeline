const test = require("node:test");
const assert = require("node:assert");
const http = require("http");
const server = require("../src/server");

test("GET /readyz returns HTTP 200", async () => {
  await new Promise((resolve) => server.listen(0, resolve));
  const port = server.address().port;

  const statusCode = await new Promise((resolve, reject) => {
    http
      .get(`http://127.0.0.1:${port}/readyz`, (res) => {
        res.resume();
        resolve(res.statusCode);
      })
      .on("error", reject);
  });

  server.close();
  assert.strictEqual(statusCode, 200);
});
