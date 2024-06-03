import { Slot, component$ } from "@builder.io/qwik";
import { Sidebar } from "~/components/shared/sidebar";

export default component$(() => {
  return (
    <div class="flex">
      <Sidebar />
      <Slot />
    </div>
  );
});
