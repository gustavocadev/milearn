import { component$ } from "@builder.io/qwik";
import { Form, Link, routeAction$, z, zod$ } from "@builder.io/qwik-city";
import { hashPassword } from "qwik-lucia";
import { InputWithLabel } from "~/components/shared/InputWithLabel";
import { Button } from "~/components/ui/button/button";
import { db } from "~/server/drizzle/db";
import { userTable } from "../../../drizzle/schema";
import pg from "pg";

export const useSignupAction = routeAction$(
  async (values, { redirect, fail }) => {
    try {
      const passwordHash = await hashPassword(values.password);

      // verify passwords match
      if (values.password !== values.confirmPassword) {
        return fail(400, {
          message: "Passwords do not match",
        });
      }

      await db.insert(userTable).values({
        name: values.name,
        lastName: values.lastName,
        username: values.username,
        passwordHash: passwordHash,
      });
    } catch (e) {
      if (
        e instanceof pg.DatabaseError &&
        e.message === "AUTH_DUPLICATE_KEY_ID"
      ) {
        return fail(400, {
          message: "Username already taken",
        });
      }
      return fail(500, {
        message: "An unknown error occurred",
      });
    }
    // make sure you don't throw inside a try/catch block!
    throw redirect(303, "/");
  },
  // validate the input
  zod$({
    username: z.string().min(2),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
    name: z.string().min(2),
    lastName: z.string().min(2),
  }),
);

export default component$(() => {
  const signupAction = useSignupAction();
  return (
    <main class="mx-auto max-w-5xl space-y-4 py-12 ">
      <h2 class="text-4xl">Sign up to have fun and learn faster</h2>

      <Form class="flex flex-col gap-4" action={signupAction}>
        <InputWithLabel
          type="text"
          name="name"
          placeholder="Name"
          required
          label="Name"
        />

        <InputWithLabel
          type="text"
          name="lastName"
          placeholder="Last name"
          required
          label="Last name"
        />

        <InputWithLabel
          type="text"
          name="username"
          placeholder="Username"
          required
          label="Username"
        />

        <InputWithLabel
          type="password"
          name="password"
          placeholder="Password"
          required
          label="Password"
        />

        <InputWithLabel
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          required
          label="Confirm password"
        />

        <Button type="submit">Sign up</Button>

        <p>
          Already have an account?{" "}
          <Link href="/login" class="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>

        {signupAction.value?.message && (
          <p class="font-bold text-red-500">{signupAction.value.message}</p>
        )}
      </Form>
    </main>
  );
});
