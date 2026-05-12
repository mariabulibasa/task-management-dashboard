import type { ReactNode } from "react";

interface TaskPanelShellProps {
  children: ReactNode;
  onClose: () => void;
  ariaLabel: string;
}

export function TaskPanelShell({
  children,
  onClose,
  ariaLabel,
}: TaskPanelShellProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 px-4 py-8">
      <button
        type="button"
        aria-label={ariaLabel}
        onClick={onClose}
        className="absolute inset-0 cursor-default"
      />

      <section className="relative z-10 w-full max-w-4xl overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-2xl">
        <div className="max-h-[85vh] overflow-y-auto px-18 py-16">
          <div className="mx-auto max-w-3xl">{children}</div>
        </div>
      </section>
    </div>
  );
}
