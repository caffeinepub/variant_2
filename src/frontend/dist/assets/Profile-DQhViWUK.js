import { j as jsxRuntimeExports } from "./index-TQ8rKdt2.js";
function Profile() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-1 flex-col items-center justify-center min-h-[60vh] px-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "w-24 h-24 rounded-[20px] flex items-center justify-center mb-8",
        style: {
          background: "#F0F2F5",
          boxShadow: "-6px -6px 14px #FFFFFF, 6px 6px 14px #BABECC"
        },
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "svg",
          {
            width: "64",
            height: "64",
            viewBox: "0 0 24 24",
            fill: "none",
            stroke: "#2DB2ED",
            strokeWidth: "2",
            strokeLinecap: "round",
            strokeLinejoin: "round",
            "aria-hidden": "true",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "12", cy: "7", r: "4" })
            ]
          }
        )
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-bold mb-3", style: { color: "#303030" }, children: "Profile" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-center text-sm leading-relaxed mb-8 max-w-xs",
        style: { color: "#8A8A8A" },
        children: "Your account, stats, and settings will live here."
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "px-6 py-2 rounded-full text-sm font-semibold",
        style: {
          background: "#F0F2F5",
          color: "#2DB2ED",
          boxShadow: "-4px -4px 10px #FFFFFF, 4px 4px 10px #BABECC"
        },
        "data-ocid": "profile-coming-soon-badge",
        children: "Coming Soon"
      }
    )
  ] });
}
export {
  Profile as default
};
