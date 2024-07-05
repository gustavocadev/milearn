// @ts-nocheck
import { component$, useContext } from "@builder.io/qwik";
import {
  Form,
  globalAction$,
  useLocation,
  useNavigate,
} from "@builder.io/qwik-city";
import { Select } from "~/components/ui/select/select";
import { LuCheck } from "@qwikest/icons/lucide";
import { Button } from "../ui/button/button";
import { handleRequest } from "~/server/services/auth/lucia";
import { LanguageContext } from "~/context/language/LanguageContext";

export const useSignOutAction = globalAction$(
  async (values, { cookie, redirect }) => {
    const authRequest = handleRequest({ cookie });
    const { session } = await authRequest.validateUser();
    if (!session) return {};

    await authRequest.invalidateSessionCookie(session);

    throw redirect(303, "/login");
  },
);

export const NavbarAuth = component$(() => {
  const languages = [
    {
      code: "en",
      name: "English",
    },
    {
      code: "it",
      name: "Italian",
    },
    {
      code: "fr",
      name: "French",
    },
  ];
  const nav = useNavigate();
  const loc = useLocation();
  const signOutAction = useSignOutAction();
  const { language } = useContext(LanguageContext);

  return (
    <nav class="flex  items-center justify-between p-4">
      <Select.Root
        onChange$={(value: string) => {
          const url = new URL(loc.url);
          language.value = value;
          url.searchParams.set("lang", value.toLowerCase());
          nav(url.href);
        }}
        value={language.value}
        class="w-40"
      >
        {/* <Select.Label>Select a language</Select.Label> */}
        <Select.Trigger>
          <Select.DisplayValue placeholder="Select an option" />
        </Select.Trigger>
        <Select.Popover gutter={8}>
          <Select.Listbox>
            {languages.map((lang) => (
              <Select.Item key={lang.code}>
                <Select.ItemLabel>{lang.name}</Select.ItemLabel>
                <Select.ItemIndicator>
                  <LuCheck class="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Listbox>
        </Select.Popover>
      </Select.Root>
      <Form action={signOutAction}>
        <Button look="destructive" type="submit">
          Sign out
        </Button>
      </Form>
    </nav>
  );
});
