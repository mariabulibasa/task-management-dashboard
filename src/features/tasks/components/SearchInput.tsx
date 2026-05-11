import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  placeholder: string;
  variant?: "underline" | "boxed";
}

export function SearchInput({
  value,
  onValueChange,
  placeholder,
  variant = "underline",
}: SearchInputProps) {
  const wrapperClasses =
    variant === "underline"
      ? "flex w-64 items-center gap-2 border-b border-neutral-200 pb-1 transition focus-within:border-neutral-400"
      : "flex items-center gap-2 rounded-lg border border-neutral-200 px-3 py-2 transition focus-within:border-neutral-400";

  return (
    <label className={wrapperClasses}>
      <Search size={16} className="text-neutral-400" />

      <input
        type="text"
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-neutral-700 outline-none placeholder:text-neutral-400"
      />
    </label>
  );
}
