/* ––
 * –––– Imports
 * –––––––––––––––––––––––––––––––––– */
// Platform imports
import { PropsWithChildren } from "react";

/* ––
 * –––– Component declaration
 * –––––––––––––––––––––––––––––––––– */
export default function Wrapper({ children }: PropsWithChildren) {
  return <main className="mx-4">{children}</main>;
}
