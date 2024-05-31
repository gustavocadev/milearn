// src/server/lucia.ts
import { Lucia } from 'lucia';
import { DrizzleSQLiteAdapter } from '@lucia-auth/adapter-drizzle';
import { qwikLuciaConfig } from 'qwik-lucia';
import { SelectUser, sessionTable, userTable } from '../../../drizzle/schema';
import { db } from '../drizzle/db';

const adapter = new DrizzleSQLiteAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      // set to `true` when using HTTPS
      secure: process.env.NODE_ENV === 'production',
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

/*
IMPORTANT!
Here we need to use `qwikLuciaConfig` to correctly configure the `handleRequest` function
*/
export const { handleRequest } = qwikLuciaConfig(lucia);

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: Omit<SelectUser, 'id'>;
  }
}