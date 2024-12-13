# Healthie
An app to test servers health configuration.

To start server run `bun start` or run docker image. By default server runs on port `80`; to change port use env variable `PORT`.

Available endpoints:
- GET `/health` Gets server health, responses are:
  - `ON` and status code 200 if server is healthy
  - `OFF` and status code 422 of server os unhealthy
  - `TIMEOUT` and status code 200 but responds after 30 seconds if server is set to timeout
- GET `/status` Gets current status of the server with status code 200; response is one of (`ON`, `OFF`, or `TIMEOUT`)
- POST `/on` Sets server status to healthy
- POST `/off` Sets server status to unhealthy
- POST `/timeout` Sets server status to timeout
