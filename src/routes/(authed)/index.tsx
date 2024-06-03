import { component$ } from "@builder.io/qwik";
import type { DocumentHead, RequestHandler } from "@builder.io/qwik-city";
import { handleRequest } from "~/server/services/auth/lucia";

export const onRequest: RequestHandler = async (event) => {
  const authRequest = handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw event.redirect(303, "/login");
  }
};

// Welcome to the user to login the app
export default component$(() => {
  return (
    <main>
      <h2>Hi </h2>
      <p>Welcome to the Qwik app</p>
    </main>
  );
});

export const head: DocumentHead = {
  title: "Welcome to Qwik",
  meta: [
    {
      name: "description",
      content: "Qwik site description",
    },
  ],
};
