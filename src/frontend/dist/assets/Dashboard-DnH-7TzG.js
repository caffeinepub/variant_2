import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, u as ue } from "./index-TQ8rKdt2.js";
import { u as useSaveCard, C as ChevronUp, a as ChevronDown, b as useVariantStore, c as useSolveQuestion } from "./useBackend-CGtZQ_0k.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
const LoaderCircle = createLucideIcon("loader-circle", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M13.234 20.252 21 12.3", key: "1cbrk9" }],
  [
    "path",
    {
      d: "m16 6-8.414 8.586a2 2 0 0 0 0 2.828 2 2 0 0 0 2.828 0l8.414-8.586a4 4 0 0 0 0-5.656 4 4 0 0 0-5.656 0l-8.415 8.585a6 6 0 1 0 8.486 8.486",
      key: "1pkts6"
    }
  ]
];
const Paperclip = createLucideIcon("paperclip", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",
      key: "wmoenq"
    }
  ],
  ["path", { d: "M12 9v4", key: "juzpu7" }],
  ["path", { d: "M12 17h.01", key: "p32p05" }]
];
const TriangleAlert = createLucideIcon("triangle-alert", __iconNode);
function CopyIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Copy" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { x: "9", y: "9", width: "13", height: "13", rx: "2", ry: "2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" })
      ]
    }
  );
}
function SaveIcon() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "svg",
    {
      width: "18",
      height: "18",
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
      role: "img",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("title", { children: "Save" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "17 21 17 13 7 13 7 21" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("polyline", { points: "7 3 7 8 15 8" })
      ]
    }
  );
}
function VariantCard({
  variation,
  index,
  total,
  originalQuestion
}) {
  const [stepsOpen, setStepsOpen] = reactExports.useState(false);
  const saveCard = useSaveCard();
  const confidence = Number(variation.confidence);
  const isLowConfidence = confidence < 60;
  function handleCopy() {
    const optionsText = variation.answerOptions.map((o) => `${o.letter}. ${o.text}${o.isCorrect ? " ✓" : ""}`).join("\n");
    const stepsText = variation.steps.map(
      (s) => `Step ${Number(s.stepNumber)}: ${s.description}
  Formula: ${s.formula}
  Result: ${s.result}`
    ).join("\n");
    const text = [
      `Variant ${index + 1} of ${total}`,
      `Confidence: ${confidence}%`,
      "",
      variation.question,
      "",
      "Options:",
      optionsText,
      "",
      "Solution:",
      stepsText
    ].join("\n");
    navigator.clipboard.writeText(text).then(() => {
      ue.success("Copied to clipboard");
    });
  }
  function handleSave() {
    const card = {
      question: originalQuestion,
      variationQuestion: variation.question,
      answerOptions: variation.answerOptions,
      steps: variation.steps,
      confidence: variation.confidence
    };
    saveCard.mutate(card);
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "card-variant", "data-ocid": "variant-card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 flex-wrap", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm font-semibold", style: { color: "#303030" }, children: [
        "Variant ",
        index + 1,
        " of ",
        total
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 ml-auto", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "confidence-badge", children: [
          confidence,
          "%"
        ] }),
        isLowConfidence && /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: "warning-flag",
            title: "Low confidence — verify manually",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { size: 18, className: "text-orange-500" })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleCopy,
            className: "p-1.5 rounded-lg transition-smooth hover:opacity-70 cursor-pointer",
            style: { color: "#303030" },
            "aria-label": "Copy variant card",
            "data-ocid": "copy-card-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(CopyIcon, {})
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: handleSave,
            disabled: saveCard.isPending,
            className: "p-1.5 rounded-lg transition-smooth hover:opacity-70 cursor-pointer disabled:opacity-40",
            style: { color: "#303030" },
            "aria-label": "Save variant card",
            "data-ocid": "save-card-btn",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(SaveIcon, {})
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base leading-relaxed", style: { color: "#303030" }, children: variation.question }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3", children: variation.answerOptions.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: option.isCorrect ? "answer-option-correct" : "answer-option-wrong",
        "data-ocid": `answer-option-${option.letter.toLowerCase()}`,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-bold mr-2", children: [
            option.letter,
            "."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: option.text })
        ]
      },
      option.letter
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "button",
        {
          type: "button",
          onClick: () => setStepsOpen((v) => !v),
          className: "flex items-center gap-2 text-sm font-medium transition-smooth hover:opacity-70 cursor-pointer w-full",
          style: { color: "#2DB2ED" },
          "data-ocid": "toggle-steps-btn",
          children: [
            stepsOpen ? /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronUp, { size: 16 }) : /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { size: 16 }),
            "Step-by-step Solution"
          ]
        }
      ),
      stepsOpen && /* @__PURE__ */ jsxRuntimeExports.jsx("ol", { className: "mt-3 space-y-3 pl-1", children: variation.steps.map((step) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        "li",
        {
          className: "text-sm rounded-[14px] p-3 neomorph-sunken",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "span",
              {
                className: "shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                style: { background: "#2DB2ED" },
                children: Number(step.stepNumber)
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-medium mb-1",
                  style: { color: "#303030" },
                  children: step.description
                }
              ),
              step.formula && /* @__PURE__ */ jsxRuntimeExports.jsx(
                "p",
                {
                  className: "font-mono text-xs mb-1",
                  style: { color: "#8A8A8A" },
                  children: step.formula
                }
              ),
              step.result && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                "p",
                {
                  className: "text-xs font-semibold",
                  style: { color: "#2DB2ED" },
                  children: [
                    "= ",
                    step.result
                  ]
                }
              )
            ] })
          ] })
        },
        Number(step.stepNumber)
      )) })
    ] })
  ] });
}
const ANSWER_TYPES = [
  { label: "Integer Only", value: "Integer" },
  { label: "Decimal", value: "Decimal" },
  { label: "Any", value: "Any" }
];
const VARIATION_COUNTS = [1, 2, 3, 4, 5];
function Dashboard() {
  const [question, setQuestion] = reactExports.useState("");
  const answerType = useVariantStore((s) => s.answerType);
  const difficulty = useVariantStore((s) => s.difficulty);
  const variationCount = useVariantStore((s) => s.variationCount);
  const currentVariations = useVariantStore((s) => s.currentVariations);
  const isLoading = useVariantStore((s) => s.isLoading);
  const error = useVariantStore((s) => s.error);
  const setAnswerType = useVariantStore((s) => s.setAnswerType);
  const setDifficulty = useVariantStore((s) => s.setDifficulty);
  const setVariationCount = useVariantStore((s) => s.setVariationCount);
  const lastQuestionRef = reactExports.useRef("");
  const solve = useSolveQuestion();
  function handleGenerate() {
    if (!question.trim()) return;
    lastQuestionRef.current = question;
    solve.mutate({ question, answerType, difficulty, variationCount });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 pb-32 pt-6 space-y-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "neomorph-raised rounded-[20px] p-5 space-y-5 bg-card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "textarea",
          {
            value: question,
            onChange: (e) => setQuestion(e.target.value),
            placeholder: "Paste your question here...",
            rows: 5,
            className: "w-full resize-none rounded-[14px] px-4 py-3 text-sm bg-card neomorph-input outline-none transition-smooth pr-10",
            style: { color: "#303030", minHeight: 120 },
            "data-ocid": "question-input"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: "absolute top-3 right-3 pointer-events-none",
            style: { color: "#8A8A8A" },
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, { size: 18 })
          }
        )
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-semibold uppercase tracking-wider",
            style: { color: "#8A8A8A" },
            children: "Answer Type"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-2 flex-wrap", children: ANSWER_TYPES.map(({ label, value }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setAnswerType(value),
            className: `px-4 py-1.5 rounded-full text-sm font-medium transition-smooth cursor-pointer ${answerType === value ? "pill-active" : "pill-inactive"}`,
            style: answerType === value ? {
              background: "#2DB2ED",
              color: "#fff",
              boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.3)"
            } : {},
            "data-ocid": `answer-type-${value.toLowerCase()}`,
            children: label
          },
          value
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "p",
            {
              className: "text-xs font-semibold uppercase tracking-wider",
              style: { color: "#8A8A8A" },
              children: "Difficulty"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold", style: { color: "#2DB2ED" }, children: [
            "Level ",
            difficulty
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "input",
          {
            type: "range",
            min: 1,
            max: 5,
            value: difficulty,
            onChange: (e) => setDifficulty(Number(e.target.value)),
            className: "w-full h-2 rounded-full appearance-none cursor-pointer",
            style: {
              background: `linear-gradient(to right, #2DB2ED 0%, #2DB2ED ${(difficulty - 1) * 25}%, #d1d5db ${(difficulty - 1) * 25}%, #d1d5db 100%)`,
              boxShadow: "inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff"
            },
            "data-ocid": "difficulty-slider"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "p",
          {
            className: "text-xs font-semibold uppercase tracking-wider",
            style: { color: "#8A8A8A" },
            children: "Variations"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-3", children: VARIATION_COUNTS.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setVariationCount(n),
            className: "w-10 h-10 rounded-full text-sm font-bold transition-smooth cursor-pointer flex items-center justify-center",
            style: variationCount === n ? {
              background: "#2DB2ED",
              color: "#fff",
              boxShadow: "inset 2px 2px 5px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.3)"
            } : {
              background: "#F0F2F5",
              color: "#303030",
              boxShadow: "-3px -3px 8px #ffffff, 3px 3px 8px #babecc"
            },
            "data-ocid": `variation-count-${n}`,
            children: n
          },
          n
        )) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "button",
        {
          type: "button",
          onClick: handleGenerate,
          disabled: isLoading || !question.trim(),
          className: "w-full h-12 rounded-[20px] text-white font-semibold text-base transition-smooth flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed",
          style: {
            background: "#2DB2ED",
            boxShadow: isLoading ? "inset 3px 3px 8px rgba(0,0,0,0.2)" : "-3px -3px 8px #ffffff, 3px 3px 8px #babecc, inset 0 1px 4px rgba(255,255,255,0.4)"
          },
          "data-ocid": "generate-btn",
          children: isLoading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { size: 18, className: "animate-spin" }),
            "Generating…"
          ] }) : `Generate ${variationCount} Variation${variationCount > 1 ? "s" : ""}`
        }
      )
    ] }),
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "card-variant border border-red-200",
        "data-ocid": "error-state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium text-red-500", children: error })
      }
    ),
    !isLoading && !error && currentVariations.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center justify-center py-12 space-y-2",
        "data-ocid": "empty-state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "w-16 h-16 rounded-full flex items-center justify-center neomorph-raised",
              style: { background: "#F0F2F5" },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-2xl", children: "✦" })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-medium", style: { color: "#8A8A8A" }, children: "Your generated variations will appear here" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs", style: { color: "#8A8A8A" }, children: "Paste a question above and hit Generate" })
        ]
      }
    ),
    currentVariations.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-5", "data-ocid": "variant-cards-list", children: currentVariations.map((variation, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      VariantCard,
      {
        variation,
        index: idx,
        total: currentVariations.length,
        originalQuestion: lastQuestionRef.current || question
      },
      variation.id
    )) })
  ] });
}
export {
  Dashboard as default
};
