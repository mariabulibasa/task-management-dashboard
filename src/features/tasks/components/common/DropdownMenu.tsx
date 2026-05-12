import type { ReactNode } from "react";

interface DropdownMenuProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
  widthClassName?: string;
  align?: "left" | "right";
}

export function DropdownMenu({
  isOpen,
  onClose,
  children,
  widthClassName = "w-56",
  align = "left",
}: DropdownMenuProps) {
  if (!isOpen) {
    return null;
  }

  const alignmentClass = align === "left" ? "left-0" : "right-0";

  return (
    <>
      <button
        type="button"
        aria-label="Close dropdown"
        onClick={onClose}
        className="fixed inset-0 z-[60] cursor-default"
      />

      <div
        className={`absolute ${alignmentClass} top-full z-[70] mt-2 ${widthClassName} rounded-xl border border-neutral-200 bg-white p-1 shadow-lg`}
      >
        {children}
      </div>
    </>
  );
}
