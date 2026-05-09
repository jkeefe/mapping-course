import { createClient as createLibsqlClient } from '@libsql/client';
import { TURSO_URL, TURSO_AUTH_TOKEN } from '$env/static/private';

export function createClient() {
  return createLibsqlClient({
    url: TURSO_URL,
    authToken: TURSO_AUTH_TOKEN
  });
}
