import { LoaderCircleIcon } from "lucide-react";

function Loader() {
  return (
    <div className="flex items-center justify-center">
      <LoaderCircleIcon className="animate-spin" />
    </div>
  );
}

export default Loader;
