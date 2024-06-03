import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { Sidebar } from "~/components/shared/sidebar";
import { handleRequest } from "~/server/services/auth/lucia";

export const onRequest: RequestHandler = async (event) => {
  const authRequest = handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw event.redirect(303, "/login");
  }
};

export default component$(() => {
  return (
    <div class="flex">
      <Sidebar />
      <Slot />
    </div>
  );
});
