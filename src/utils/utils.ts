// import OpenAI from "openai";
import ollama from "ollama";

type Generate = {
  prompt: string;
};

// const openaiApiKey = process.env.OPENAI_API_KEY || "ollama";

// const openai = new OpenAI({
//   // apiKey: openaiApiKey,
//   baseURL: "http://localhost:11434/v1",
//   apiKey: openaiApiKey,
// });

export const generateMessage = async ({
  prompt,
}: Generate): Promise<string> => {
  // const response = await openai.completions.create({
  //   model: "llama2",
  //   prompt,
  // });

  // return response.choices.at(0)?.text ?? "Error";

  const response = await ollama.generate({
    model: "llama2",
    prompt,
  });
  return response.response;
};

export type Chat = {
  topic: string;
  lang: string;
  content: string;
};

export const chat = async ({ content, lang, topic }: Chat) => {
  // const response = await openai.chat.completions.create({
  //   model: "llama2",
  //   messages: [
  //     {
  //       role: "system",
  //       content: `You're my friend. We are in a conversation about the ${topic} topic in a place, and I want to know more about it. Please talk to me in ${lang} language.`,
  //     },
  //     {
  //       role: "user",
  //       content,
  //     },
  //   ],
  // });

  // return response.choices.at(0)?.message.content ?? "Error";

  const response = await ollama.chat({
    model: "llama2",
    messages: [
      {
        role: "system",
        content: `You're my friend. We are in a conversation about the ${topic} topic in a place, and I want to know more about it. Please talk to me in ${lang} language. Please only give to me 255 characters.`,
      },
      {
        role: "user",
        content,
      },
    ],
  });
  return response.message.content;
};
