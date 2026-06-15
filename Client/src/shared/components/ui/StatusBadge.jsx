function StatusBadge({ status }) {
  const styles = {
    UPCOMING:
      "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",

    LIVE:
      "bg-green-500/20 text-green-400 border-green-500/30",

    COMPLETED:
      "bg-slate-500/20 text-slate-300 border-slate-500/30",
  };

  return (
    <span
      className={`rounded-full border px-3 py-1 text-xs font-medium ${
        styles[status] || styles.COMPLETED
      }`}
    >
      {status}
    </span>
  );
}

export default StatusBadge;