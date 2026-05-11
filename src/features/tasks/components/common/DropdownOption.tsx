import type { ReactNode } from "react";

interface DropdownOptionProps {
  children: ReactNode;
  selected?: boolean;
  variant?: "default" | "danger";
  onClick: () => void;
}

export function DropdownOption({
  children,
  selected = false,
  variant = "default",
  onClick,
}: DropdownOptionProps) {
  const variantClasses =
    variant === "danger"
      ? "text-neutral-700 hover:bg-red-50 hover:text-red-600"
      : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900";

  const selectedClasses = selected
    ? "bg-neutral-100 font-medium text-neutral-900"
    : "font-normal";

  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${variantClasses} ${selectedClasses}`}
    >
      {children}
    </button>
  );
}
