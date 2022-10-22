import { PropsWithChildren } from "react";

export default function Wrapper({ children }: PropsWithChildren) {
  return <main className="mx-4">{children}</main>;
}
