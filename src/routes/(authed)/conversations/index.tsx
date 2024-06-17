import { component$ } from "@builder.io/qwik";
import { ConversationCard } from "~/components/shared/conversation-card";

export default component$(() => {
  return (
    <main class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 9 }).map((_, idx) => {
        return (
          <ConversationCard
            description="This conversation is about a coffee shop. The two people are talking about the coffee shop."
            title="Coffee Shop"
            key={idx}
          />
        );
      })}
    </main>
  );
});
