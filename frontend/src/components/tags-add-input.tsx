import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Loader from "@/components/loader";
import { PlusIcon } from "lucide-react";
import useTagsMutations from "@/hooks/use-tags-mutations";

function TagsAddInput() {
  console.log("TagsAddInput");
  const [tag, setTag] = useState("");
  const { createTag } = useTagsMutations();
  return (
    <div className="flex gap-2">
      <Input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag name"
      />
      <Button
        onClick={async () => await createTag.mutateAsync({ name: tag })}
        disabled={createTag.isPending || !tag}
      >
        {createTag.isPending ? <Loader /> : <PlusIcon />}
      </Button>
    </div>
  );
}

export default TagsAddInput;
