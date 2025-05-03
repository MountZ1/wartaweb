import { password } from "bun";
import { string, z } from "zod";

export const Userscheme = z.object({
  username: z.string().min(5).max(20).transform((str) => str.trim()),
  email: z.string().email().transform((email) => email.trim().toLowerCase()),
  firstname: z.string().min(1).transform((str) => str.trim()),
  lastname: z.string().min(1).transform((str) => str.trim()),
  password: z.string().min(8),
  role: z.string().max(15),
});

export const UserLoginScheme = z.object({
  username: z.string().transform((str: string) => str.trim()),
  password: z.string()
})
