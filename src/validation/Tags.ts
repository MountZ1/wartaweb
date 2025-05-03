import { z } from "zod";

export const TagsScheme = z.object({
  name: z.string().min(3).max(50).transform((str) => str.trim()),
  slug: z.nullable(z.string().max(255).transform((str) => str.trim())),
  description: z.nullable(z.string().transform(str => str.trim()))
})
