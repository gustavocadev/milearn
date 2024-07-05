import { createContextId } from "@builder.io/qwik";

type Conversation = {
  id: string;
  title: string;
  description: string;
  image: string | null;
};

type ConversationContextType = {
  conversations: Conversation[];
};

export const ConversationContext = createContextId<ConversationContextType>(
  "conversation.context",
);
