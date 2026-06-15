function ConfirmModal({
  open,
  title,
  description,
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-slate-900 p-6">
        <h2 className="mb-3 text-xl font-bold">
          {title}
        </h2>

        <p className="mb-6 text-slate-400">
          {description}
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="rounded-lg border border-slate-700 px-4 py-2"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="rounded-lg bg-red-500 px-4 py-2 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;