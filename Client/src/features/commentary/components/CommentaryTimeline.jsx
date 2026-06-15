import { toast } from "sonner";

import { useDeleteCommentary } from "../hooks/useDeleteCommentary";

const TYPE_STYLES = {
  NORMAL: "bg-slate-700 text-white",

  FOUR: "bg-blue-500 text-white",

  SIX: "bg-green-500 text-white",

  WICKET: "bg-red-500 text-white",

  MILESTONE: "bg-purple-500 text-white",
};

function CommentaryTimeline({ commentary = [] }) {
  const deleteMutation = useDeleteCommentary();

  const handleDelete = async (id) => {
    try {
      await deleteMutation.mutateAsync(id);

      toast.success("Commentary deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="space-y-4">
      {commentary.map((item) => (
        <div
          key={item._id}
          className="rounded-xl border border-slate-800 bg-slate-900 p-4"
        >
          <div className="mb-3 flex items-center justify-between">
            <div className="font-bold">
              {item.over}.{item.ball}
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${
                TYPE_STYLES[item.type] || TYPE_STYLES.NORMAL
              }`}
            >
              {item.type}
            </span>
          </div>

          <p className="mb-3">{item.message}</p>

          <div className="flex flex-wrap gap-3 text-sm text-slate-400">
            <span>Runs: {item.runs}</span>

            <span>Innings: {item.innings}</span>

            {item.wicket && (
              <span className="font-semibold text-red-400">WICKET</span>
            )}
          </div>

          <button
            onClick={() => handleDelete(item._id)}
            className="mt-3 rounded bg-red-600 px-3 py-1 text-sm text-white"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default CommentaryTimeline;
