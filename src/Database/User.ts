import { boolean, pgTable, serial, timestamp, varchar } from "drizzle-orm/pg-core";
import { db } from "./connection";
import { and, count, eq } from "drizzle-orm";

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

export const IndexUsers = async (offset: number = 0, status: boolean = true, role: string = '') => {
  const conditions = [eq(Users.status, status)];

  if (role) {
    conditions.push(eq(Users.role, role));
  }

  let users = await db.select({
    username: Users.username,
    firstname: Users.firstname,
    lastname: Users.lastname,
    email: Users.email,
    role: Users.role,
    status: Users.status,
    avatar: Users.avatar,
  }).from(Users)
    .where(and(...conditions))
    .limit(10)
    .offset(offset);

  return {
    users: users,
    hasMore: users.length === 10
  }
}
export const UserStore = async (data: any) => {
  let result: any;
  try {
    result = await db.insert(Users).values(data).returning({ username: Users.username })
  } catch (error) {
    console.log(error);
  }
  return result;
}

export const DeleteUser = async (username: string) => {
  return await db.delete(Users).where(eq(Users.username, username)).returning({ username: Users.username });
}

export const CountUsers = async (): Promise<number> => {
  const result = await db.select({ count: count() }).from(Users);
  return Number(result[0].count)
}

export const ShowUser = async (username: string) => {
  const user = await db.select({
    username: Users.username,
    firstname: Users.firstname,
    lastname: Users.lastname,
    email: Users.email,
    role: Users.role,
    avatar: Users.avatar
  }).from(Users).where(eq(Users.username, username));

  return user[0];
}

export const updateStatus = async (username: string, val: boolean) => {
  return await db.update(Users).set({ status: val }).where(eq(Users.username, username)).returning({ username: Users.username, status: Users.status });
}

export const updateRoleUser = async (username: string, role: string) => {
  return await db.update(Users).set({ role: role }).where(eq(Users.username, username)).returning({ username: Users.username })
}


export const getUserForLogin = async (username: string) => {
  const users = await db
    .select({
      username: Users.username,
      email: Users.email,
      password: Users.password,
      role: Users.role,
      status: Users.status
    })
    .from(Users)
    .where(eq(Users.username, username));

  if (users.length === 0) {
    return false; // No user found
  }

  const user = users[0]; // Get the first user in the array

  if (!user.status) {
    return false; // User is not active
  }

  return user; // Return the user if they are active
};

