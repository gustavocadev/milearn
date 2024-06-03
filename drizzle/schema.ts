import { pgTable, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { generateId } from "lucia";

export const userTable = pgTable("user", {
  id: text("id")
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
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export type SelectSession = typeof sessionTable.$inferSelect;
