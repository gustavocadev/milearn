import { type Signal, createContextId } from "@builder.io/qwik";

type LanguageState = {
  language: Signal<string>;
};

export const LanguageContext =
  createContextId<LanguageState>("language.context");
