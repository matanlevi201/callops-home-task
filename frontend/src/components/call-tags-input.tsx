import { useMemo, useState } from "react";
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
import Loader from "@/components/loader";
import useTagsQuery from "@/hooks/use-tags-query";

interface CallTagsInputProps {
  selectedTags: Record<string, boolean>;
  onSelect: (tagId: string) => void;
}

function CallTagsInput({ selectedTags, onSelect }: CallTagsInputProps) {
  const { data: tags = [], isError, isPending } = useTagsQuery();

  const [open, setOpen] = useState(false);

  const tagsData = useMemo(() => {
    if (!tags?.length) return [];
    return tags.map((tag) => ({
      value: tag.id,
      label: tag.name,
    }));
  }, [tags]);

  if (isPending) return <Loader />;
  if (isError) return;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          Select tag...
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search tag..." className="h-9" />
          <CommandList>
            <CommandEmpty>No tags found.</CommandEmpty>
            <CommandGroup>
              {tagsData.map((tag) => (
                <CommandItem
                  key={tag.value}
                  value={tag.value}
                  onSelect={onSelect}
                >
                  {tag.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      selectedTags[tag.value] ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default CallTagsInput;
