import type { ReactNode } from "react";

interface DropdownSectionTitleProps {
  children: ReactNode;
}

export function DropdownSectionTitle({ children }: DropdownSectionTitleProps) {
  return (
    <p className="px-2 py-2 text-xs font-medium uppercase tracking-wide text-neutral-500">
      {children}
    </p>
  );
}
