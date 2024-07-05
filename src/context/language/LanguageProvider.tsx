import {
  Slot,
  component$,
  useContextProvider,
  useSignal,
  useStore,
} from "@builder.io/qwik";
import { LanguageContext } from "./LanguageContext";

export const LanguageProvider = component$(() => {
  const language = useSignal("en");

  useContextProvider(LanguageContext, useStore({ language }));
  return <Slot />;
});
