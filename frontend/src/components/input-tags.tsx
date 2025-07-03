import { useMemo, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Badge } from "@/components/ui/badge";

type InputTagsProps = {
  name: string;
  label?: string;
  description?: string;
  tagsOptions: { value: string; label: string }[];
  disabled?: boolean;
};

function InputTags({
  name,
  label,
  description,
  tagsOptions,
  disabled,
}: InputTagsProps) {
  console.log("InputTags");
  const form = useFormContext();
  const [open, setOpen] = useState(false);

  const valueToLabelMap = useMemo(() => {
    return tagsOptions.reduce((acc, tag) => {
      acc[tag.value] = tag.label;
      return acc;
    }, {} as Record<string, string>);
  }, [tagsOptions]);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => {
        const selectedTagIds: string[] = field.value || [];

        const handleSelect = (value: string) => {
          const updated = selectedTagIds.includes(value)
            ? selectedTagIds.filter((id) => id !== value)
            : [...selectedTagIds, value];

          field.onChange(updated);
        };

        return (
          <FormItem>
            {label && <FormLabel>{label}</FormLabel>}
            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <div className="flex flex-wrap gap-1">
                  {selectedTagIds.map((id, i) => (
                    <Badge key={i} variant="secondary">
                      {valueToLabelMap[id] || id}
                    </Badge>
                  ))}
                </div>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                    disabled={disabled}
                  >
                    Select tags...
                    <ChevronsUpDown className="opacity-50 ml-2 h-4 w-4 shrink-0" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search tag..." className="h-9" />
                    <CommandList>
                      <CommandEmpty>No tags found.</CommandEmpty>
                      <CommandGroup>
                        {tagsOptions.map((tag) => (
                          <CommandItem
                            key={tag.value}
                            value={tag.value}
                            onSelect={() => handleSelect(tag.value)}
                          >
                            {tag.label}
                            <Check
                              className={cn(
                                "ml-auto h-4 w-4",
                                selectedTagIds.includes(tag.value)
                                  ? "opacity-100"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </FormControl>
            {description && (
              <FormDescription className="text-xs text-muted-foreground">
                {description}
              </FormDescription>
            )}
            <FormMessage />
          </FormItem>
        );
      }}
    />
  );
}

export default InputTags;
