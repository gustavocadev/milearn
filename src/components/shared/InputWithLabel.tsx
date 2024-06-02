import { component$ } from "@builder.io/qwik";
import { Label } from "../ui/label/label";
import { Input } from "../ui/input/input";

interface Props {
  type: string;
  name: string;
  placeholder: string;
  required: boolean;
  label: string;
}

export const InputWithLabel = component$<Props>(
  ({ type = "text", name, placeholder, required, label }) => {
    return (
      <div class="flex flex-col gap-1">
        <Label>{label}</Label>
        <Input
          type={type}
          name={name}
          placeholder={placeholder}
          required={required}
        />
      </div>
    );
  },
);
