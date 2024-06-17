import { component$ } from "@builder.io/qwik";

export interface ConversationCardProps {
  title: string;
  description: string;
  image?: string;
}

export const ConversationCard = component$<ConversationCardProps>(
  ({
    description,
    image = "https://cyclingmagazine.ca/wp-content/uploads/2018/07/GettyImages-515745996.jpg",
  }) => {
    return (
      <figure class="flex flex-col rounded-lg border border-gray-200">
        <img
          src={image}
          alt="Puss in boots"
          width={300}
          height={200}
          class="w-full rounded-t-lg"
        />
        <figcaption class="flex flex-col gap-3 p-3">
          <p>{description}</p>
        </figcaption>
      </figure>
    );
  },
);
