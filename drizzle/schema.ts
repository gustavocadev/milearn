import { pgTable, integer, varchar } from "drizzle-orm/pg-core";
import { generateId } from "lucia";

export const userTable = pgTable("user", {
  id: varchar("id")
    .primaryKey()
    .$defaultFn(() => generateId(15)),
  passwordHash: varchar("passwordHash").notNull(),
  username: varchar("username").notNull(),
  // other user attributes
  name: varchar("name", {
    length: 55,
  }),
  lastName: varchar("last_name", {
    length: 55,
  }),
  email: varchar("email", {
    length: 100,
  }),
});

export type SelectUser = typeof userTable.$inferSelect;

export const sessionTable = pgTable("session", {
  id: varchar("id").notNull().primaryKey(),
  userId: varchar("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: integer("expires_at").notNull(),
});

export type SelectSession = typeof sessionTable.$inferSelect;
