import { c as createLucideIcon, j as jsxRuntimeExports, B as Bookmark, r as reactExports, u as ue } from "./index-TQ8rKdt2.js";
import { d as useSavedCards, e as useDeleteCard, C as ChevronUp, a as ChevronDown } from "./useBackend-CGtZQ_0k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function relativeTime(savedAt) {
  const ms = Number(savedAt);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 6e4);
  const hours = Math.floor(diff / 36e5);
  const days = Math.floor(diff / 864e5);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}
function AnswerPills({ options }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: options.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: opt.isCorrect ? "answer-option-correct" : "answer-option-wrong",
      "data-ocid": `answer-pill-${opt.letter.toLowerCase()}`,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold mr-1", children: [
          opt.letter,
          "."
        ] }),
        opt.text
      ]
    },
    opt.letter
  )) });
}
function SolutionSteps({ steps }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "space-y-3 mt-2", children: steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex gap-3 items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "span",
      {
        className: "flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground\n                       text-xs font-bold flex items-center justify-center mt-0.5",
        children: String(step.stepNumber)
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground", children: step.description }),
      step.formula && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-mono text-muted-foreground mt-0.5 break-words", children: step.formula }),
      step.result && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-accent font-semibold mt-0.5", children: step.result })
    ] })
  ] }, String(step.stepNumber))) });
}
function SavedCardItem({ card }) {
  const [expanded, setExpanded] = reactExports.useState(false);
  const deleteCard = useDeleteCard();
  function handleCopy() {
    const correctOpt = card.answerOptions.find((o) => o.isCorrect);
    const text = [
      card.variationQuestion || card.question,
      "",
      card.answerOptions.map((o) => `${o.letter}. ${o.text}`).join("\n"),
      "",
      `Correct: ${(correctOpt == null ? void 0 : correctOpt.letter) ?? "?"}.  ${(correctOpt == null ? void 0 : correctOpt.text) ?? ""}`,
      "",
      `Confidence: ${Number(card.confidence)}%`
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => ue.success("Copied to clipboard!"));
  }
  function handleDelete() {
    deleteCard.mutate(card.id);
  }
  const confidence = Number(card.confidence);
  const isLowConfidence = confidence < 60;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-variant", "data-ocid": "saved-card-item", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground font-medium", children: [
        "Saved ",
        relativeTime(card.savedAt)
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            "aria-label": "Copy card",
            className: "w-7 h-7 flex items-center justify-center rounded-[10px] neomorph-raised\n                       text-muted-foreground hover:text-foreground transition-smooth",
            "data-ocid": "saved-card-copy",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { size: 14 })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleDelete,
            "aria-label": "Remove saved card",
            disabled: deleteCard.isPending,
            className: "w-7 h-7 flex items-center justify-center rounded-[10px] neomorph-raised\n                       text-muted-foreground hover:text-destructive transition-smooth\n                       disabled:opacity-50",
            "data-ocid": "saved-card-delete",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { size: 14 })
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "confidence-badge", children: [
        confidence,
        "% confidence"
      ] }),
      isLowConfidence && /* @__PURE__ */ jsxRuntimeExports.jsx(
        "span",
        {
          className: "warning-flag",
          title: "Low confidence — verify manually",
          children: "⚠️"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-foreground leading-relaxed", children: card.variationQuestion || card.question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnswerPills, { options: card.answerOptions }),
    card.steps.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setExpanded((e) => !e),
          className: "flex items-center gap-2 text-sm font-semibold text-accent\n                       hover:opacity-80 transition-smooth w-full text-left",
          "data-ocid": "saved-card-solution-toggle",
          children: [
            expanded ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }),
            expanded ? "Hide solution" : "Show step-by-step solution"
          ]
        }
      ),
      expanded && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-3 neomorph-sunken rounded-[14px] p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SolutionSteps, { steps: card.steps }) })
    ] })
  ] });
}
function EmptyState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "card-variant flex flex-col items-center text-center py-10 gap-4",
      "data-ocid": "saved-empty-state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-[20px] neomorph-raised flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bookmark, { size: 28, className: "text-accent" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-base", children: "No saved cards yet" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1 max-w-xs", children: "Generate some variants and tap the save icon to keep them here." })
        ] })
      ]
    }
  );
}
function Saved() {
  const { data: savedCards = [], isLoading } = useSavedCards();
  const sorted = [...savedCards].sort(
    (a, b) => Number(b.savedAt) - Number(a.savedAt)
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-5 pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", "data-ocid": "saved-header", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-bold text-foreground", children: "Saved Cards" }),
      !isLoading && savedCards.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "bg-accent text-accent-foreground text-xs font-bold\n                       rounded-full px-2.5 py-0.5",
          "data-ocid": "saved-count-badge",
          children: [
            savedCards.length,
            " saved"
          ]
        }
      )
    ] }),
    isLoading && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-variant animate-pulse space-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-3 w-28 bg-muted rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-4 w-20 bg-muted rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-10 w-full bg-muted rounded-[14px]" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-2", children: [1, 2, 3, 4].map((j) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-9 bg-muted rounded-[14px]" }, j)) })
    ] }, i)) }),
    !isLoading && sorted.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyState, {}),
    !isLoading && sorted.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: sorted.map((card) => /* @__PURE__ */ jsxRuntimeExports.jsx(SavedCardItem, { card }, card.id)) })
  ] });
}
export {
  Saved as default
};
