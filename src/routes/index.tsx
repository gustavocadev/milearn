import { component$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { Input } from "~/components/ui/input/input";

export default component$(() => {
  return (
    <main class="mx-auto max-w-5xl space-y-4 py-12 ">
      <h2 class="text-4xl">Log in to have fun and learn faster</h2>

      <div class="flex flex-col gap-2">
        <Input type="email" name="" placeholder="Email" required />

        <Input type="password" placeholder="Password" required />
        <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700">
          Log in
        </button>
      </div>
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
