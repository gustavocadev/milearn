import { component$ } from "@builder.io/qwik";
import { routeLoader$, type DocumentHead } from "@builder.io/qwik-city";
import { handleRequest } from "~/server/services/auth/lucia";
import { getUserById } from "~/server/services/user/user";

export const useUser = routeLoader$(async ({ cookie, redirect }) => {
  const authRequest = handleRequest({ cookie });
  const { user } = await authRequest.validateUser();
  if (!user) {
    throw redirect(303, "/login");
  }

  const userFound = await getUserById(user.id);
  return userFound;
});

// Welcome to the user to login the app
export default component$(() => {
  const user = useUser();
  return (
    <section class="flex flex-col items-center gap-4">
      <section class="space-y-2">
        <h2 class="text-center text-5xl">
          Hi {user.value.name}, you're
          <span class="text-blue-500"> logged in!</span>
        </h2>
        <p class="text-center">
          Enjoy your stay and feel free to explore the app. If you have any
        </p>
      </section>
      <div class="w-full p-0 xl:px-52">
        <iframe
          width="100%"
          height="auto"
          src="https://www.youtube.com/embed/o_XVt5rdpFY?si=8gG19GwwSQWUmmvN"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          class="aspect-video"
        />
      </div>
    </section>
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
