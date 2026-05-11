import { useEffect, useState } from "react";

interface EditableTaskTitleCellProps {
  title: string;
  onSave: (title: string) => void;
}

export function EditableTaskTitleCell({
  title,
  onSave,
}: EditableTaskTitleCellProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(title);

  useEffect(() => {
    setDraftTitle(title);
  }, [title]);

  function startEditing() {
    setDraftTitle(title);
    setIsEditing(true);
  }

  function saveTitle() {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setDraftTitle(title);
      setIsEditing(false);
      return;
    }

    if (trimmedTitle !== title) {
      onSave(trimmedTitle);
    }

    setIsEditing(false);
  }

  function cancelEditing() {
    setDraftTitle(title);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <input
        autoFocus
        type="text"
        value={draftTitle}
        onChange={(event) => setDraftTitle(event.target.value)}
        onBlur={saveTitle}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            saveTitle();
          }

          if (event.key === "Escape") {
            cancelEditing();
          }
        }}
        className="w-full bg-transparent font-medium text-neutral-900 outline-none"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={startEditing}
      className="block w-full truncate text-left font-medium text-neutral-900 cursor-text"
    >
      {title}
    </button>
  );
}
