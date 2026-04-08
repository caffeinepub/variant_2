import { AlertTriangle, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useSaveCard } from "../hooks/useBackend";
import type { CardInput, Variation } from "../types";

interface VariantCardProps {
  variation: Variation;
  index: number;
  total: number;
  originalQuestion: string;
}

function CopyIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
    >
      <title>Copy</title>
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
    </svg>
  );
}

function SaveIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      role="img"
    >
      <title>Save</title>
      <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
      <polyline points="17 21 17 13 7 13 7 21" />
      <polyline points="7 3 7 8 15 8" />
    </svg>
  );
}

export function VariantCard({
  variation,
  index,
  total,
  originalQuestion,
}: VariantCardProps) {
  const [stepsOpen, setStepsOpen] = useState(false);
  const saveCard = useSaveCard();

  const confidence = Number(variation.confidence);
  const isLowConfidence = confidence < 60;

  function handleCopy() {
    const optionsText = variation.answerOptions
      .map((o) => `${o.letter}. ${o.text}${o.isCorrect ? " ✓" : ""}`)
      .join("\n");
    const stepsText = variation.steps
      .map(
        (s) =>
          `Step ${Number(s.stepNumber)}: ${s.description}\n  Formula: ${s.formula}\n  Result: ${s.result}`,
      )
      .join("\n");
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
      stepsText,
    ].join("\n");

    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard");
    });
  }

  function handleSave() {
    const card: CardInput = {
      question: originalQuestion,
      variationQuestion: variation.question,
      answerOptions: variation.answerOptions,
      steps: variation.steps,
      confidence: variation.confidence,
    };
    saveCard.mutate(card);
  }

  return (
    <div className="card-variant" data-ocid="variant-card">
      {/* Header row */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <span className="text-sm font-semibold" style={{ color: "#303030" }}>
          Variant {index + 1} of {total}
        </span>
        <div className="flex items-center gap-2 ml-auto">
          {/* Confidence badge */}
          <span className="confidence-badge">{confidence}%</span>
          {/* Warning flag */}
          {isLowConfidence && (
            <span
              className="warning-flag"
              title="Low confidence — verify manually"
            >
              <AlertTriangle size={18} className="text-orange-500" />
            </span>
          )}
          {/* Copy icon */}
          <button
            type="button"
            onClick={handleCopy}
            className="p-1.5 rounded-lg transition-smooth hover:opacity-70 cursor-pointer"
            style={{ color: "#303030" }}
            aria-label="Copy variant card"
            data-ocid="copy-card-btn"
          >
            <CopyIcon />
          </button>
          {/* Save icon */}
          <button
            type="button"
            onClick={handleSave}
            disabled={saveCard.isPending}
            className="p-1.5 rounded-lg transition-smooth hover:opacity-70 cursor-pointer disabled:opacity-40"
            style={{ color: "#303030" }}
            aria-label="Save variant card"
            data-ocid="save-card-btn"
          >
            <SaveIcon />
          </button>
        </div>
      </div>

      {/* Question text */}
      <p className="text-base leading-relaxed" style={{ color: "#303030" }}>
        {variation.question}
      </p>

      {/* Answer options */}
      <div className="grid grid-cols-2 gap-3">
        {variation.answerOptions.map((option) => (
          <div
            key={option.letter}
            className={
              option.isCorrect ? "answer-option-correct" : "answer-option-wrong"
            }
            data-ocid={`answer-option-${option.letter.toLowerCase()}`}
          >
            <span className="font-bold mr-2">{option.letter}.</span>
            <span>{option.text}</span>
          </div>
        ))}
      </div>

      {/* Collapsible solution */}
      <div>
        <button
          type="button"
          onClick={() => setStepsOpen((v) => !v)}
          className="flex items-center gap-2 text-sm font-medium transition-smooth hover:opacity-70 cursor-pointer w-full"
          style={{ color: "#2DB2ED" }}
          data-ocid="toggle-steps-btn"
        >
          {stepsOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          Step-by-step Solution
        </button>

        {stepsOpen && (
          <ol className="mt-3 space-y-3 pl-1">
            {variation.steps.map((step) => (
              <li
                key={Number(step.stepNumber)}
                className="text-sm rounded-[14px] p-3 neomorph-sunken"
              >
                <div className="flex items-start gap-3">
                  <span
                    className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white"
                    style={{ background: "#2DB2ED" }}
                  >
                    {Number(step.stepNumber)}
                  </span>
                  <div className="min-w-0">
                    <p
                      className="font-medium mb-1"
                      style={{ color: "#303030" }}
                    >
                      {step.description}
                    </p>
                    {step.formula && (
                      <p
                        className="font-mono text-xs mb-1"
                        style={{ color: "#8A8A8A" }}
                      >
                        {step.formula}
                      </p>
                    )}
                    {step.result && (
                      <p
                        className="text-xs font-semibold"
                        style={{ color: "#2DB2ED" }}
                      >
                        = {step.result}
                      </p>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
}
