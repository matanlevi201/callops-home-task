import { Button } from "@/components/ui/button";
import { useState } from "react";

function App() {
  const [count, setCount] = useState(0);
  console.log("rendered");
  return (
    <Button onClick={() => setCount((prev) => prev + 1)}>
      Click me - {count}
    </Button>
  );
}

export default App;
