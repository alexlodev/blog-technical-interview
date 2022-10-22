/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { useEffect } from "react";

/* ––
 * –––– Hook declaration
 * –––––––––––––––––––––––––––––––––– */
export default function useScapeKey({ callback }: { callback: () => void }) {
  useEffect(() => {
    function handleKeydown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        callback();
      }
    }
    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [callback]);
}
