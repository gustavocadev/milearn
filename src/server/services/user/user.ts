import { db } from "~/server/drizzle/db";
import { SelectUser, userTable } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";

export const getUserById = async (id: string): Promise<SelectUser> => { 
  const [user] = await db.select().from(userTable).where(eq(userTable.id, id))
  return user
};

export const deleteUserById = (id: string) => { }

export const updateUserById = (id: string) => { }
