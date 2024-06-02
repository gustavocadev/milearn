import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { Button } from "~/components/ui/button/button";
import { Input } from "~/components/ui/input/input";

export default component$(() => {
  return (
    <main class="mx-auto max-w-5xl space-y-4 py-12 ">
      <h2 class="text-4xl">Log in to have fun and learn faster</h2>

      <div class="flex flex-col gap-2">
        <Input type="text" name="" placeholder="Username" required />

        <Input type="password" placeholder="Password" required />
        <Button>Log in</Button>

        <p>
          Don't have an account?{" "}
          <Link href="/signup" class="text-blue-500 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </main>
  );
});
