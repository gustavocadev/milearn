import {
  Slot,
  component$,
  useContextProvider,
  useStore,
} from "@builder.io/qwik";
import { ConversationContext } from "./ConversationContext";

export const ConversationProvider = component$(() => {
  const conversations = [
    {
      id: "coffee-shop",
      title: "Coffee Shop",
      description:
        "This conversation is about a coffee shop. The two people are talking about the coffee shop.",
      image:
        "https://cyclingmagazine.ca/wp-content/uploads/2018/07/GettyImages-515745996.jpg",
    },
    {
      id: "christmas",
      title: "Christmas",
      description:
        "This conversation is about a christmas. The two people are talking about the christmas.",
      image:
        "https://th.bing.com/th/id/R.7506a2fd7e968b3bb47da232e0ab5ff1?rik=kHyDiOVcZ7eGSw&pid=ImgRaw&r=0",
    },
  ];
  useContextProvider(ConversationContext, useStore({ conversations }));
  return <Slot />;
});
