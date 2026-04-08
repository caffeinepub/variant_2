export default function Drill() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center min-h-[60vh] px-6">
      {/* Icon */}
      <div
        className="w-24 h-24 rounded-[20px] flex items-center justify-center mb-8"
        style={{
          background: "#F0F2F5",
          boxShadow: "-6px -6px 14px #FFFFFF, 6px 6px 14px #BABECC",
        }}
      >
        <svg
          width="64"
          height="64"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#2DB2ED"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </div>

      {/* Heading */}
      <h1 className="text-2xl font-bold mb-3" style={{ color: "#303030" }}>
        Drill Mode
      </h1>

      {/* Subtitle */}
      <p
        className="text-center text-sm leading-relaxed mb-8 max-w-xs"
        style={{ color: "#8A8A8A" }}
      >
        Interactive drill mode coming soon. Sharpen your skills with timed
        practice.
      </p>

      {/* Coming Soon Badge */}
      <div
        className="px-6 py-2 rounded-full text-sm font-semibold"
        style={{
          background: "#F0F2F5",
          color: "#2DB2ED",
          boxShadow: "-4px -4px 10px #FFFFFF, 4px 4px 10px #BABECC",
        }}
        data-ocid="drill-coming-soon-badge"
      >
        Coming Soon
      </div>
    </div>
  );
}
