import type { ReactNode } from "react";

interface DropdownOptionProps {
  children: ReactNode;
  selected?: boolean;
  onClick: () => void;
}

export function DropdownOption({
  children,
  selected = false,
  onClick,
}: DropdownOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition hover:bg-neutral-100 hover:text-neutral-900 ${
        selected
          ? "bg-neutral-100 font-medium text-neutral-900"
          : "font-normal text-neutral-700"
      }`}
    >
      {children}
    </button>
  );
}
