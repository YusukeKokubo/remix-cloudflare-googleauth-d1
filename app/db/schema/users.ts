import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core"
import { sql } from "drizzle-orm"

export const users = sqliteTable(
  "users",
  {
    id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
    email: text("email").notNull(),
    name: text("name"),
    image: text("image"),
    memo: text("memo"),
    createdAt: integer("createdAt", { mode: "timestamp" })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
    updatedAt: integer("updatedAt", { mode: "timestamp" })
      .default(sql`(strftime('%s', 'now'))`)
      .notNull(),
  },
  (users) => ({
    emailIdx: uniqueIndex("emailIdx").on(users.email),
  }),
)
