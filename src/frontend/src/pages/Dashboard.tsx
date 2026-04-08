import { Loader2, Paperclip } from "lucide-react";
import { useRef, useState } from "react";
import { VariantCard } from "../components/VariantCard";
import { useSolveQuestion } from "../hooks/useBackend";
import { useVariantStore } from "../store";
import type { AnswerType } from "../types";

const ANSWER_TYPES: { label: string; value: AnswerType }[] = [
  { label: "Integer Only", value: "Integer" },
  { label: "Decimal", value: "Decimal" },
  { label: "Any", value: "Any" },
];

const VARIATION_COUNTS = [1, 2, 3, 4, 5];

export default function Dashboard() {
  const [question, setQuestion] = useState("");

  const answerType = useVariantStore((s) => s.answerType);
  const difficulty = useVariantStore((s) => s.difficulty);
  const variationCount = useVariantStore((s) => s.variationCount);
  const currentVariations = useVariantStore((s) => s.currentVariations);
  const isLoading = useVariantStore((s) => s.isLoading);
  const error = useVariantStore((s) => s.error);

  const setAnswerType = useVariantStore((s) => s.setAnswerType);
  const setDifficulty = useVariantStore((s) => s.setDifficulty);
  const setVariationCount = useVariantStore((s) => s.setVariationCount);

  const lastQuestionRef = useRef("");
  const solve = useSolveQuestion();

  function handleGenerate() {
    if (!question.trim()) return;
    lastQuestionRef.current = question;
    solve.mutate({ question, answerType, difficulty, variationCount });
  }

  return (
    <div className="max-w-xl mx-auto px-4 pb-32 pt-6 space-y-6">
      {/* Question input card */}
      <div className="neomorph-raised rounded-[20px] p-5 space-y-5 bg-card">
        {/* Textarea with paperclip */}
        <div className="relative">
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Paste your question here..."
            rows={5}
            className="w-full resize-none rounded-[14px] px-4 py-3 text-sm bg-card neomorph-input outline-none transition-smooth pr-10"
            style={{ color: "#303030", minHeight: 120 }}
            data-ocid="question-input"
          />
          <div
            className="absolute top-3 right-3 pointer-events-none"
            style={{ color: "#8A8A8A" }}
          >
            <Paperclip size={18} />
          </div>
        </div>

        {/* Answer Type */}
        <div className="space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#8A8A8A" }}
          >
            Answer Type
          </p>
          <div className="flex gap-2 flex-wrap">
            {ANSWER_TYPES.map(({ label, value }) => (
              <button
                type="button"
                key={value}
                onClick={() => setAnswerType(value)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-smooth cursor-pointer ${
                  answerType === value ? "pill-active" : "pill-inactive"
                }`}
                style={
                  answerType === value
                    ? {
                        background: "#2DB2ED",
                        color: "#fff",
                        boxShadow:
                          "inset 2px 2px 5px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.3)",
                      }
                    : {}
                }
                data-ocid={`answer-type-${value.toLowerCase()}`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty slider */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p
              className="text-xs font-semibold uppercase tracking-wider"
              style={{ color: "#8A8A8A" }}
            >
              Difficulty
            </p>
            <span className="text-xs font-bold" style={{ color: "#2DB2ED" }}>
              Level {difficulty}
            </span>
          </div>
          <div className="relative flex items-center">
            <input
              type="range"
              min={1}
              max={5}
              value={difficulty}
              onChange={(e) => setDifficulty(Number(e.target.value))}
              className="w-full h-2 rounded-full appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, #2DB2ED 0%, #2DB2ED ${(difficulty - 1) * 25}%, #d1d5db ${(difficulty - 1) * 25}%, #d1d5db 100%)`,
                boxShadow:
                  "inset 2px 2px 5px #babecc, inset -2px -2px 5px #ffffff",
              }}
              data-ocid="difficulty-slider"
            />
          </div>
        </div>

        {/* Variation count */}
        <div className="space-y-2">
          <p
            className="text-xs font-semibold uppercase tracking-wider"
            style={{ color: "#8A8A8A" }}
          >
            Variations
          </p>
          <div className="flex gap-3">
            {VARIATION_COUNTS.map((n) => (
              <button
                type="button"
                key={n}
                onClick={() => setVariationCount(n)}
                className="w-10 h-10 rounded-full text-sm font-bold transition-smooth cursor-pointer flex items-center justify-center"
                style={
                  variationCount === n
                    ? {
                        background: "#2DB2ED",
                        color: "#fff",
                        boxShadow:
                          "inset 2px 2px 5px rgba(0,0,0,0.15), inset -1px -1px 3px rgba(255,255,255,0.3)",
                      }
                    : {
                        background: "#F0F2F5",
                        color: "#303030",
                        boxShadow: "-3px -3px 8px #ffffff, 3px 3px 8px #babecc",
                      }
                }
                data-ocid={`variation-count-${n}`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Generate button */}
        <button
          type="button"
          onClick={handleGenerate}
          disabled={isLoading || !question.trim()}
          className="w-full h-12 rounded-[20px] text-white font-semibold text-base transition-smooth flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            background: "#2DB2ED",
            boxShadow: isLoading
              ? "inset 3px 3px 8px rgba(0,0,0,0.2)"
              : "-3px -3px 8px #ffffff, 3px 3px 8px #babecc, inset 0 1px 4px rgba(255,255,255,0.4)",
          }}
          data-ocid="generate-btn"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Generating…
            </>
          ) : (
            `Generate ${variationCount} Variation${variationCount > 1 ? "s" : ""}`
          )}
        </button>
      </div>

      {/* Error state */}
      {error && (
        <div
          className="card-variant border border-red-200"
          data-ocid="error-state"
        >
          <p className="text-sm font-medium text-red-500">{error}</p>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && currentVariations.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-12 space-y-2"
          data-ocid="empty-state"
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center neomorph-raised"
            style={{ background: "#F0F2F5" }}
          >
            <span className="text-2xl">✦</span>
          </div>
          <p className="text-sm font-medium" style={{ color: "#8A8A8A" }}>
            Your generated variations will appear here
          </p>
          <p className="text-xs" style={{ color: "#8A8A8A" }}>
            Paste a question above and hit Generate
          </p>
        </div>
      )}

      {/* Variant cards */}
      {currentVariations.length > 0 && (
        <div className="space-y-5" data-ocid="variant-cards-list">
          {currentVariations.map((variation, idx) => (
            <VariantCard
              key={variation.id}
              variation={variation}
              index={idx}
              total={currentVariations.length}
              originalQuestion={lastQuestionRef.current || question}
            />
          ))}
        </div>
      )}
    </div>
  );
}
