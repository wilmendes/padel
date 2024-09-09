import { serial, text, timestamp, pgTableCreator, varchar, char, integer } from "drizzle-orm/pg-core";

export const createTable = pgTableCreator((name) => name);

export const users = createTable("users", {
  id: serial("id").primaryKey(),
  email: varchar("email", { length: 50 }).notNull().unique(),
  name: varchar("name", { length: 50 }),
  // TODO: figure out the right size of password to store
  password: varchar("password", { length: 100 }),
  pictureUrl: varchar("picture_url", { length: 256 }),
  updatedAt: timestamp("updated_at").default(new Date()).notNull(),
  createdAt: timestamp("created_at").default(new Date()).notNull(),
  recoverToken: char("recovery_token", { length: 16 }),
});

export const oauthAccounts = createTable("oauth_accounts", {
  id: serial("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  providerId: text("provider_id").notNull(),
  providerUserId: text("provider_user_id").notNull(),
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }),
  updatedAt: timestamp("updated_at").default(new Date()).notNull(),
  createdAt: timestamp("created_at").default(new Date()).notNull(),
});

export const sessions = createTable("sessions", {
  id: text("id").primaryKey(),
  userId: integer("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});
