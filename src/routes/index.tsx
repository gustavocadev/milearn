import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";

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
