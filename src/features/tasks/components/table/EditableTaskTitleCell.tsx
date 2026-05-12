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
  const [visibleTitle, setVisibleTitle] = useState(title);

  useEffect(() => {
    setDraftTitle(title);
    setVisibleTitle(title);
  }, [title]);

  function startEditing() {
    setDraftTitle(visibleTitle);
    setIsEditing(true);
  }

  function saveTitle() {
    const trimmedTitle = draftTitle.trim();

    if (!trimmedTitle) {
      setDraftTitle(visibleTitle);
      setIsEditing(false);
      return;
    }

    if (trimmedTitle !== visibleTitle) {
      setVisibleTitle(trimmedTitle);
      onSave(trimmedTitle);
    }

    setIsEditing(false);
  }

  function cancelEditing() {
    setDraftTitle(visibleTitle);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <input
        autoFocus
        type="text"
        value={draftTitle}
        onChange={(e) => setDraftTitle(e.target.value)}
        onBlur={saveTitle}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            saveTitle();
          }

          if (e.key === "Escape") {
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
      className="block w-full cursor-text truncate text-left font-medium text-neutral-900"
    >
      {visibleTitle}
    </button>
  );
}
