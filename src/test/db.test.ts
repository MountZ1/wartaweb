import { expect, test } from "bun:test";
import { drizzle } from "drizzle-orm/node-postgres";
import { config } from "dotenv";
import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { and, count, eq } from "drizzle-orm";

config({ path: "../../.env" })

const db = drizzle(process.env.DB_URL);

const Users = pgTable('users', {
  username: varchar('username', { length: 20 }).notNull().unique(),
  firstname: varchar('firstname', { length: 20 }).notNull(),
  lastname: varchar('lastname', { length: 20 }).notNull(),
  email: varchar('email', { length: 50 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  status: boolean('active'),
  role: varchar('role', { length: 20 }).notNull(),
  avatar: varchar('avatar', { length: 255 }).default(null),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

test("Database connection test: SELECT 1", async () => {
  const user = await db.select({
    username: Users.username,
    firstname: Users.firstname,
    lastname: Users.lastname,
    email: Users.email,
    role: Users.role,
    status: Users.status,
    avatar: Users.avatar,
  }).from(Users)
    .where(and(
      eq(Users.status, true),
      eq(Users.role, 'administrator, editor, author, contributor, subscriber')
    )).limit(10);

  user.map(usr => {
    console.log(`The User data is ${usr.username}`)
  })
});
