import { integer, pgTable, primaryKey, text, varchar } from "drizzle-orm/pg-core";
import { db } from "./connection";
import { eq } from "drizzle-orm";

export class Tags {
  private static Tags = pgTable('tags', {
    id: integer('id').primaryKey(),
    name: varchar('name', { length: 50 }).notNull().unique(),
    slug: varchar('slug', { length: 255 }).notNull().unique(),
    description: text('description')
  });

  public static async index(offset: number = 0) {
    let tags = await db.select({
      id: this.Tags.id,
      name: this.Tags.name,
      slug: this.Tags.slug,
      description: this.Tags.description,
    }).from(this.Tags).limit(10).offset(offset);

    return {
      tags: tags,
      hasMore: tags.length == 10,
    }
  }

  public static async store(tag: any): Promise<{}[] | Error> {
    try {
      const result = await db.insert(this.Tags).values(tag).returning();

      return result;
    } catch (error) {
      return error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }

  public static async update(id: string, tag: any): Promise<{}[] | Error> {
    try {
      return await db.update(this.Tags).set(tag).where(eq(this.Tags.id, parseInt(id))).returning()
    } catch (error) {
      return error instanceof Error ? error : new Error('Unknown error occurred');
    }
  }
}
