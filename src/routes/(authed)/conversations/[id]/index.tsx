import { component$, useContext, useStore, useSignal } from "@builder.io/qwik";
import { routeLoader$, server$, useLocation } from "@builder.io/qwik-city";
import { Input } from "~/components/ui/input/input";
import { ConversationContext } from "~/context/conversation/ConversationContext";
import { LanguageContext } from "~/context/language/LanguageContext";
import { chat, generateMessage, type Chat } from "~/utils/utils";

export const useAssistantGreeting = routeLoader$(async ({ params, url }) => {
  const language = url.searchParams.get("lang") || "en";
  const topic = params.id || "coffee";

  const response = await generateMessage({
    prompt: `Greet to me in ${language} language and Let's talk about the ${topic} topic. Please only give to me 255 characters. Dont ask questions.`,
  });

  return response;
});

export const talkToAssistant = server$(async function ({
  topic,
  lang,
  content,
}: Chat) {
  const response = await chat({
    content,
    lang,
    topic,
  });
  return response;
});

type MessageSignal = {
  role: "user" | "assistant";
  content: string;
};

export default component$(() => {
  const { language } = useContext(LanguageContext);
  const inputMsg = useSignal("");
  const assistantGreeting = useAssistantGreeting();
  const isLoading = useSignal(false);
  const loc = useLocation();
  const messages = useStore<MessageSignal[][]>([]);
  const { conversations } = useContext(ConversationContext);
  const conversation = conversations.find((conv) => conv.id === loc.params.id);

  return (
    <div class="space-y-5">
      <header class="flex rounded-md bg-gray-200">
        <figure class="w-64 ">
          <img
            src={conversation?.image ?? ""}
            alt=""
            class="w-full rounded-l-md"
          />
        </figure>
        <div class="space-y-1 p-10">
          <h3 class="text-3xl font-bold">
            Begginer: Asking for a coffee in a coffee shop
          </h3>
          <p>
            Goal: Learn how to ask for a coffee in a coffee shop. You will learn
            how to ask for a coffee in a coffee shop.
          </p>
        </div>
      </header>
      <div class="space-y-2 py-4">
        <p class="w-6/12 rounded-lg bg-sky-300 p-4">
          {assistantGreeting.value}
        </p>
        {messages.map((message, idx) => (
          <div key={idx} class="flex flex-col gap-2">
            {message.map((convesation) => (
              <>
                {convesation.role === "user" ? (
                  <p class="w-auto self-end rounded-lg bg-gray-200 p-4 text-right">
                    {convesation.content}
                  </p>
                ) : (
                  <p class="w-auto self-start rounded-lg bg-sky-300 p-4">
                    {convesation.content}
                  </p>
                )}
              </>
            ))}
          </div>
        ))}
        <p>{isLoading.value && <span>Loading...</span>}</p>
      </div>

      <form
        onSubmit$={async () => {
          isLoading.value = true;

          messages.push([
            {
              role: "user",
              content: inputMsg.value,
            },
          ]);

          const msg = inputMsg.value;

          inputMsg.value = "";

          const response = await talkToAssistant({
            lang: language.value,
            topic: loc.params.id,
            content: msg,
          });
          isLoading.value = false;

          // add the response to the last message
          messages.at(-1)?.push({
            role: "assistant",
            content: response,
          });
        }}
        preventdefault:submit
      >
        <Input
          type="text"
          placeholder="Type here..."
          name="message"
          bind:value={inputMsg}
          disabled={isLoading.value}
        />
      </form>
    </div>
  );
});
