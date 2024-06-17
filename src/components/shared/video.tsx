import { component$ } from "@builder.io/qwik";
import { Button } from "../ui/button/button";

type Props = {
  title: string;
  description: string;
  image: string;
  video: string;
};

export const Video = component$<Props>(({ description, image, video }) => {
  return (
    <figure class="flex flex-col rounded-lg border border-gray-200">
      <a href={video} target="_blank">
        <img
          src={image}
          alt="Puss in boots"
          width={300}
          height={200}
          class="w-full rounded-t-lg"
        />
      </a>
      <figcaption class="flex flex-col gap-3 p-3">
        <p>{description}</p>
        <Button class="w-32">Learn words</Button>
      </figcaption>
    </figure>
  );
});
