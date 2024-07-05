import { component$ } from "@builder.io/qwik";
import {
  Form,
  Link,
  type RequestHandler,
  routeAction$,
  z,
  zod$,
} from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";

import { login } from "~/server/services/auth/auth";
import { handleRequest } from "~/server/services/auth/lucia";

export const onRequest: RequestHandler = async ({ sharedMap, redirect }) => {
  const user = sharedMap.get("user");
  if (user) {
    throw redirect(303, "/");
  }
};

export const useLoginAction = routeAction$(
  async (values, { cookie, fail, redirect }) => {
    // Important! Use `handleRequest` to handle the authentication request
    const authRequest = handleRequest({ cookie });

    const { message, session } = await login(values.username, values.password);

    // if the login fails, return a 400 status code with a message
    if (!session) return fail(400, { message });

    authRequest.setSession(session); // set session cookie

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
        <Button type="submit" disabled={loginAction.isRunning}>
          Log in
        </Button>

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
