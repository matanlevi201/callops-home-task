import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { type InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  label?: string;
  name: string;
  description?: string;
  defaultVal?: string | number | never[];
  className?: string;
} & InputHTMLAttributes<HTMLTextAreaElement>;

function InputTextarea({
  label = "",
  name,
  description,
  defaultVal,
  className,
  ...props
}: Props) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="">
          <FormLabel htmlFor={name}>{label}</FormLabel>
          <FormControl>
            <Textarea
              id={name}
              className={`${className}`}
              {...props}
              {...field}
              value={field.value ?? defaultVal ?? ""}
            />
          </FormControl>
          <FormDescription className="text-xs text-muted-foreground">
            {description}
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default InputTextarea;
