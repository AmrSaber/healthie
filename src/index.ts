import { Elysia } from 'elysia';

class ServerState {
  constructor(public status: 'on' | 'off' | 'timeout' = 'on') {}
}

const app = new Elysia()
  .decorate('state', new ServerState())
  .post('/on', ({ state }) => {
    state.status = 'on';
    return state.status.toUpperCase();
  })
  .post('/off', ({ state }) => {
    state.status = 'off';
    return state.status.toUpperCase();
  })
  .post('/timeout', ({ state }) => {
    state.status = 'timeout';
    return state.status.toUpperCase();
  })
  .get('/status', ({ state }) => state.status.toUpperCase())
  .get('/health', async ({ state: { status }, set }) => {
    if (status == 'timeout') {
      await new Promise((res) => setTimeout(res, 30_000));
      return status.toUpperCase();
    }

    if (status == 'off') {
      set.status = 'Unprocessable Content';
      return status.toUpperCase();
    }

    return status.toUpperCase();
  })
  .listen({ idleTimeout: 60, port: process.env.PORT ?? 80 });

console.log(`🦊 Server is running at http://${app.server?.hostname}:${app.server?.port}`);
