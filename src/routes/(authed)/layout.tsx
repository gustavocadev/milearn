import { Slot, component$ } from "@builder.io/qwik";
import type { RequestHandler } from "@builder.io/qwik-city";
import { LuCheck } from "@qwikest/icons/lucide";
import { Sidebar } from "~/components/shared/sidebar";
import { Select } from "~/components/ui/select/select";
import { handleRequest } from "~/server/services/auth/lucia";

export const onRequest: RequestHandler = async (event) => {
  const authRequest = handleRequest(event);
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw event.redirect(303, "/login");
  }
};

export default component$(() => {
  const languages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Italian",
    "Portuguese",
    "Russian",
    "Chinese",
    "Japanese",
    "Korean",
    "Arabic",
    "Hindi",
    "Bengali",
    "Punjabi",
    "Urdu",
    "Turkish",
  ];

  return (
    <div class="flex">
      <Sidebar />
      <div>
        <nav class="flex items-center p-4">
          <Select.Root>
            {/* <Select.Label>Select a language</Select.Label> */}
            <Select.Trigger>
              <Select.DisplayValue placeholder="Select an option" />
            </Select.Trigger>
            <Select.Popover gutter={8}>
              <Select.Listbox>
                {languages.map((user) => (
                  <Select.Item key={user}>
                    <Select.ItemLabel>{user}</Select.ItemLabel>
                    <Select.ItemIndicator>
                      <LuCheck class="h-4 w-4" />
                    </Select.ItemIndicator>
                  </Select.Item>
                ))}
              </Select.Listbox>
            </Select.Popover>
          </Select.Root>
        </nav>
        <main class="px-12">
          <Slot />
        </main>
      </div>
    </div>
  );
});
