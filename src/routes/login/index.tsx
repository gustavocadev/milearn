import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";
import { handleRequest, lucia } from "~/server/auth/lucia";
import { db } from "~/server/drizzle/db";
import { userTable } from "../../../drizzle/schema";
import { eq } from "drizzle-orm";
import { verifyPassword } from "qwik-lucia";

export const useLoginAction = routeAction$(
  async (values, { cookie, fail, redirect }) => {
    // Important! Use `handleRequest` to handle the authentication request
    const authRequest = handleRequest({ cookie });

    try {
      //1. search for user
      const [user] = await db
        .select({
          id: userTable.id,
          passwordHash: userTable.passwordHash,
          username: userTable.username,
        })
        .from(userTable)
        .where(eq(userTable.username, values.username));

      //2. if user is not found, throw error
      if (!user) {
        return fail(400, {
          message: "Incorrect username or password",
        });
      }

      // 3. validate password
      const isValidPassword = await verifyPassword(
        user.passwordHash,
        values.password,
      );

      if (!isValidPassword) {
        return fail(400, {
          message: "Incorrect username or password",
        });
      }

      // 4. create session
      const session = await lucia.createSession(user.id, {});

      authRequest.setSession(session); // set session cookie
      console.log("session", session);
    } catch (e) {
      console.error(e);
    }
    // make sure you don't throw inside a try/catch block!
    throw redirect(303, "/");
  },
  // validate the input
  zod$({
    username: z.string(),
    password: z.string(),
  }),
);

export default component$(() => {
  const loginAction = useLoginAction();
  return (
    <main class="mx-auto max-w-5xl space-y-4 py-12 ">
      <h2 class="text-4xl">Log in to have fun and learn faster</h2>

      <Form class="flex flex-col gap-2" action={loginAction}>
        <Input type="text" name="username" placeholder="Username" required />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <Button type="submit">Log in</Button>

        <p>
          Don't have an account?{" "}
          <Link href="/signup" class="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>

        {loginAction.value?.message && (
          <p class="font-bold text-red-500">{loginAction.value.message}</p>
        )}
      </Form>
    </main>
  );
});
