import { Bookmark, ChevronDown, ChevronUp, Copy, X } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useDeleteCard, useSavedCards } from "../hooks/useBackend";
import type { AnswerOption, SavedCard, SolutionStep } from "../types";

function relativeTime(savedAt: bigint): string {
  const ms = Number(savedAt);
  const diff = Date.now() - ms;
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;
  if (hours < 24) return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

function AnswerPills({ options }: { options: AnswerOption[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {options.map((opt) => (
        <div
          key={opt.letter}
          className={
            opt.isCorrect ? "answer-option-correct" : "answer-option-wrong"
          }
          data-ocid={`answer-pill-${opt.letter.toLowerCase()}`}
        >
          <span className="font-semibold mr-1">{opt.letter}.</span>
          {opt.text}
        </div>
      ))}
    </div>
  );
}

function SolutionSteps({ steps }: { steps: SolutionStep[] }) {
  return (
    <ol className="space-y-3 mt-2">
      {steps.map((step) => (
        <li key={String(step.stepNumber)} className="flex gap-3 items-start">
          <span
            className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-accent-foreground
                       text-xs font-bold flex items-center justify-center mt-0.5"
          >
            {String(step.stepNumber)}
          </span>
          <div className="min-w-0">
            <p className="text-sm font-medium text-foreground">
              {step.description}
            </p>
            {step.formula && (
              <p className="text-xs font-mono text-muted-foreground mt-0.5 break-words">
                {step.formula}
              </p>
            )}
            {step.result && (
              <p className="text-xs text-accent font-semibold mt-0.5">
                {step.result}
              </p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}

function SavedCardItem({ card }: { card: SavedCard }) {
  const [expanded, setExpanded] = useState(false);
  const deleteCard = useDeleteCard();

  function handleCopy() {
    const correctOpt = card.answerOptions.find((o) => o.isCorrect);
    const text = [
      card.variationQuestion || card.question,
      "",
      card.answerOptions.map((o) => `${o.letter}. ${o.text}`).join("\n"),
      "",
      `Correct: ${correctOpt?.letter ?? "?"}.  ${correctOpt?.text ?? ""}`,
      "",
      `Confidence: ${Number(card.confidence)}%`,
    ].join("\n");
    navigator.clipboard
      .writeText(text)
      .then(() => toast.success("Copied to clipboard!"));
  }

  function handleDelete() {
    deleteCard.mutate(card.id);
  }

  const confidence = Number(card.confidence);
  const isLowConfidence = confidence < 60;

  return (
    <div className="card-variant" data-ocid="saved-card-item">
      {/* Card Header */}
      <div className="flex items-center justify-between">
        <span className="text-xs text-muted-foreground font-medium">
          Saved {relativeTime(card.savedAt)}
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopy}
            aria-label="Copy card"
            className="w-7 h-7 flex items-center justify-center rounded-[10px] neomorph-raised
                       text-muted-foreground hover:text-foreground transition-smooth"
            data-ocid="saved-card-copy"
          >
            <Copy size={14} />
          </button>
          <button
            type="button"
            onClick={handleDelete}
            aria-label="Remove saved card"
            disabled={deleteCard.isPending}
            className="w-7 h-7 flex items-center justify-center rounded-[10px] neomorph-raised
                       text-muted-foreground hover:text-destructive transition-smooth
                       disabled:opacity-50"
            data-ocid="saved-card-delete"
          >
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Confidence + Warning */}
      <div className="flex items-center gap-2">
        <span className="confidence-badge">{confidence}% confidence</span>
        {isLowConfidence && (
          <span
            className="warning-flag"
            title="Low confidence — verify manually"
          >
            ⚠️
          </span>
        )}
      </div>

      {/* Question text */}
      <p className="text-sm font-medium text-foreground leading-relaxed">
        {card.variationQuestion || card.question}
      </p>

      {/* Answer options */}
      <AnswerPills options={card.answerOptions} />

      {/* Collapsible solution */}
      {card.steps.length > 0 && (
        <div>
          <button
            type="button"
            onClick={() => setExpanded((e) => !e)}
            className="flex items-center gap-2 text-sm font-semibold text-accent
                       hover:opacity-80 transition-smooth w-full text-left"
            data-ocid="saved-card-solution-toggle"
          >
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            {expanded ? "Hide solution" : "Show step-by-step solution"}
          </button>
          {expanded && (
            <div className="mt-3 neomorph-sunken rounded-[14px] p-4">
              <SolutionSteps steps={card.steps} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function EmptyState() {
  return (
    <div
      className="card-variant flex flex-col items-center text-center py-10 gap-4"
      data-ocid="saved-empty-state"
    >
      <div className="w-16 h-16 rounded-[20px] neomorph-raised flex items-center justify-center">
        <Bookmark size={28} className="text-accent" />
      </div>
      <div>
        <p className="font-semibold text-foreground text-base">
          No saved cards yet
        </p>
        <p className="text-sm text-muted-foreground mt-1 max-w-xs">
          Generate some variants and tap the save icon to keep them here.
        </p>
      </div>
    </div>
  );
}

export default function Saved() {
  const { data: savedCards = [], isLoading } = useSavedCards();

  // Sort newest first
  const sorted = [...savedCards].sort(
    (a, b) => Number(b.savedAt) - Number(a.savedAt),
  );

  return (
    <div className="space-y-5 pb-6">
      {/* Header */}
      <div className="flex items-center gap-3" data-ocid="saved-header">
        <h1 className="text-xl font-bold text-foreground">Saved Cards</h1>
        {!isLoading && savedCards.length > 0 && (
          <span
            className="bg-accent text-accent-foreground text-xs font-bold
                       rounded-full px-2.5 py-0.5"
            data-ocid="saved-count-badge"
          >
            {savedCards.length} saved
          </span>
        )}
      </div>

      {/* Loading skeletons */}
      {isLoading && (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card-variant animate-pulse space-y-3">
              <div className="h-3 w-28 bg-muted rounded-full" />
              <div className="h-4 w-20 bg-muted rounded-full" />
              <div className="h-10 w-full bg-muted rounded-[14px]" />
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((j) => (
                  <div key={j} className="h-9 bg-muted rounded-[14px]" />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state */}
      {!isLoading && sorted.length === 0 && <EmptyState />}

      {/* Card list */}
      {!isLoading && sorted.length > 0 && (
        <div className="space-y-4">
          {sorted.map((card) => (
            <SavedCardItem key={card.id} card={card} />
          ))}
        </div>
      )}
    </div>
  );
}
