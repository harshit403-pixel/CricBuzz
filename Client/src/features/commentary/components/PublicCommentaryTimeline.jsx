import clsx from "clsx";

const EVENT_STYLES = {
  NORMAL: "border-slate-200 bg-slate-100 text-slate-700",
  FOUR: "border-blue-200 bg-blue-50 text-blue-700",
  SIX: "border-emerald-200 bg-emerald-50 text-emerald-700",
  WICKET: "border-rose-200 bg-rose-50 text-rose-700",
  MILESTONE: "border-amber-200 bg-amber-50 text-amber-700",
};

function PublicCommentaryTimeline({ commentary = [] }) {
  return (
    <div className="space-y-6">
      {commentary.map((item, index) => (
        <div key={item._id} className="relative pl-10">
          <div className="absolute left-4 top-0 bottom-0 w-px bg-sky-100" />
          <div
            className={clsx(
              "absolute left-[9px] top-2 h-3.5 w-3.5 rounded-full border-2 border-white",
              index === 0 ? "bg-sky-500" : "bg-slate-300",
            )}
          />

          <div className="rounded-[28px] border border-slate-200 bg-white px-5 py-5 shadow-[0_12px_30px_rgba(15,23,42,0.05)]">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex items-start gap-4">
                <div className="min-w-[3.5rem] text-3xl font-semibold tracking-tight text-sky-600">
                  {item.over}.{item.ball}
                </div>

                <div className="space-y-3">
                  <span
                    className={clsx(
                      "inline-flex rounded-xl border px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em]",
                      EVENT_STYLES[item.type] || EVENT_STYLES.NORMAL,
                    )}
                  >
                    {item.type}
                  </span>

                  <p className="max-w-3xl text-base leading-7 text-slate-700">
                    {item.message}
                  </p>
                </div>
              </div>

              <div className="text-right text-sm text-slate-500">
                <p className="font-medium text-slate-700">
                  {item.player?.name || item.battingTeam?.shortName}
                </p>
                <p>{item.battingTeam?.name}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PublicCommentaryTimeline;
