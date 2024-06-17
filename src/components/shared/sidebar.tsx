import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export const Sidebar = component$(() => {
  const userRoutes = [
    {
      name: "Home",
      path: "/",
    },
    {
      name: "Videos",
      path: "/videos",
    },
    {
      name: "Conversations",
      path: "/conversations",
    },
  ];

  return (
    <aside
      class="hidden h-screen w-64 -translate-x-full border-r border-gray-200 bg-white transition-transform sm:translate-x-0 md:block"
      aria-label="Sidebar"
    >
      <div class="h-full overflow-y-auto bg-white px-3 py-4">
        <h2 class="p-2 text-2xl font-semibold">LOGO</h2>
        <ul class="space-y-2 font-medium">
          {userRoutes.map((route) => {
            return (
              <li key={route.path}>
                <Link
                  href={route.path}
                  class="group flex items-center rounded-sm p-2 hover:bg-gray-300"
                >
                  <span class="ms-3">{route.name}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
});
