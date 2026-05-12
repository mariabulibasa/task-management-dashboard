import { Ellipsis, Trash2, type LucideIcon } from "lucide-react";
import { useState } from "react";
import { DropdownMenu } from "../common/DropdownMenu";
import { DropdownOption } from "../common/DropdownOption";

interface TaskRowActionMenuProps {
  onDeleteTask: () => void;
}

interface TaskRowAction {
  label: string;
  icon: LucideIcon;
  variant: "default" | "danger";
  onClick: () => void;
}

export function TaskRowActionMenu({ onDeleteTask }: TaskRowActionMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions: TaskRowAction[] = [
    {
      label: "Delete task",
      icon: Trash2,
      variant: "danger",
      onClick: onDeleteTask,
    },
  ];

  function handleSelectAction(action: () => void) {
    setIsOpen(false);
    action();
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="flex h-7 w-7 items-center justify-center rounded-md border border-neutral-300 bg-white text-sm font-medium text-neutral-600 shadow-sm transition hover:border-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"
        aria-label="More actions"
      >
        <Ellipsis size={16} />
      </button>

      <DropdownMenu
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        widthClassName="w-44"
        align="left"
      >
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <DropdownOption
              key={action.label}
              variant={action.variant}
              onClick={() => handleSelectAction(action.onClick)}
            >
              <span className="flex items-center gap-2">
                <Icon size={15} />
                <span>{action.label}</span>
              </span>
            </DropdownOption>
          );
        })}
      </DropdownMenu>
    </div>
  );
}
