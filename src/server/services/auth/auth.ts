import { db } from "~/server/drizzle/db";
import { userTable } from "../../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "qwik-lucia";
import { lucia } from "./lucia";


export const login = async (username: string, password: string) => {
  try {
    const [user] = await db
      .select({
        id: userTable.id,
        passwordHash: userTable.passwordHash,
        username: userTable.username,
      })
      .from(userTable)
      .where(eq(userTable.username, username));

    //2. if user is not found, throw error
    if (!user) {
      return {
        message: "Incorrect username or password",
        session: null
      };
    }

    // 3. validate password
    const isValidPassword = await verifyPassword(
      user.passwordHash,
      password,
    );

    if (!isValidPassword) {
      return {
        message: "Incorrect username or password",
        session: null
      };
    }

    // 4. create session
    const session = await lucia.createSession(user.id, {});

    return {
      message: "Login successful",
      session
    };
  } catch (error) {
    console.error("login error", error);
    return {
      message: "An error occurred. Please try again",
      session: null
    };
  }
};

export const signup = () => {
  //  do something
};


export const signout = () => {
  // do something
};