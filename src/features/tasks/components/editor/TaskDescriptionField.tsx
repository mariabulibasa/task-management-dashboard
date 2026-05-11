interface TaskDescriptionFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export function TaskDescriptionField({
  value,
  onChange,
}: TaskDescriptionFieldProps) {
  return (
    <section>
      <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
        Task Description
      </h3>

      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Add details about this task..."
        className="mt-5 min-h-48 w-full resize-none bg-transparent text-base leading-7 text-neutral-700 outline-none placeholder:text-neutral-300"
      />
    </section>
  );
}
