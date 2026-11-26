
const { test } = require("node:test");
const assert = require("node:assert/strict");
const app = require("../src/server");

const server = app.listen(0, "127.0.0.1");

const baseUrl = () =>
  `http://127.0.0.1:${server.address().port}`;

test("Home endpoint should return 200", async () => {
  const response = await fetch(baseUrl() + "/");

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.status, "Running");
});

test("Health endpoint should return UP", async () => {
  const response = await fetch(baseUrl() + "/health");

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.status, "UP");
});

test("Readiness endpoint should return READY", async () => {
  const response = await fetch(baseUrl() + "/ready");

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.status, "READY");
});

test("Application info endpoint should return application name", async () => {
  const response = await fetch(baseUrl() + "/api/info");

  assert.equal(response.status, 200);

  const body = await response.json();

  assert.equal(body.application, "gke-ci-cd-pipeline");
});

test("Close test server", () => {
  server.close();
});
