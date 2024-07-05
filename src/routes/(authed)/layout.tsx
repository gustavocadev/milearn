import { Slot, component$ } from "@builder.io/qwik";
import { type RequestHandler } from "@builder.io/qwik-city";
import { NavbarAuth } from "~/components/shared/navbar-auth";
import { Sidebar } from "~/components/shared/sidebar";
import { ConversationProvider } from "~/context/conversation/ConversationProvider";
import { LanguageProvider } from "~/context/language/LanguageProvider";

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
    <LanguageProvider>
      <ConversationProvider>
        <div class="flex">
          <div class="xl:w-2/12">
            <Sidebar />
          </div>
          <div class="w-full">
            <NavbarAuth />
            <main class="px-12">
              <Slot />
            </main>
          </div>
        </div>
      </ConversationProvider>
    </LanguageProvider>
  );
});
