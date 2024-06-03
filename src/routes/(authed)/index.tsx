import { component$ } from "@builder.io/qwik";
import { type DocumentHead } from "@builder.io/qwik-city";

// Welcome to the user to login the app
export default component$(() => {
  return (
    <>
      <h2 class="text-4xl">
        Hi, you're
        <span class="text-blue-500"> logged in!</span>
      </h2>
      <p>Enjoy your stay and feel free to explore the app. If you have any</p>
    </>
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
