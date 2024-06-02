import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { InputWithLabel } from "~/components/shared/InputWithLabel";
import { Button } from "~/components/ui/button/button";

export default component$(() => {
  return (
    <main class="mx-auto max-w-5xl space-y-4 py-12 ">
      <h2 class="text-4xl">Sign up to have fun and learn faster</h2>

      <div class="flex flex-col gap-4">
        <InputWithLabel
          type="text"
          name=""
          placeholder="Name"
          required
          label="Name"
        />

        <InputWithLabel
          type="text"
          name=""
          placeholder="Last name"
          required
          label="Last name"
        />

        <InputWithLabel
          type="text"
          name=""
          placeholder="Username"
          required
          label="Username"
        />

        <InputWithLabel
          type="email"
          name=""
          placeholder="Email"
          required
          label="Email"
        />

        <InputWithLabel
          type="password"
          name=""
          placeholder="Password"
          required
          label="Password"
        />

        <Button type="submit">Sign up</Button>

        <p>
          Already have an account?{" "}
          <Link href="/login" class="text-blue-500 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </main>
  );
});
