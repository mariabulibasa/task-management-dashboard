interface TaskTitleFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskTitleField({ value, onChange }: TaskTitleFieldProps) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Task name"
      className="mt-2 w-full bg-transparent text-3xl font-bold leading-tight tracking-tight text-neutral-900 outline-none placeholder:text-neutral-300"
    />
  );
}
