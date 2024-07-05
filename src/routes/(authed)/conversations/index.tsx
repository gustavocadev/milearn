import { component$, useContext } from "@builder.io/qwik";
import { Link } from "@builder.io/qwik-city";
import { ConversationCard } from "~/components/shared/conversation-card";
import { ConversationContext } from "~/context/conversation/ConversationContext";

export default component$(() => {
  const { conversations } = useContext(ConversationContext);
  return (
    <main class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {conversations.map((conv) => {
        return (
          <Link key={conv.id} href={`${conv.id}`}>
            <ConversationCard
              description={conv.description}
              title={conv.title}
              image={conv.image ?? ""}
            />
          </Link>
        );
      })}
    </main>
  );
});
