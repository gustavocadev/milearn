import { component$ } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";

export interface NavbarProps {}

export const Navbar = component$<NavbarProps>(() => {
  return (
    <nav class="bg-[#293749] px-6 py-4 text-white">
      <ul>
        <li class="">
          <Link href="/" class=" text-3xl">
            LOGO
          </Link>
        </li>
      </ul>
    </nav>
  );
});
