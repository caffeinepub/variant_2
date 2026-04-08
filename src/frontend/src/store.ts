import { create } from "zustand";
import type { AnswerType, SavedCard, Variation } from "./types";

interface VariantStore {
  currentVariations: Variation[];
  savedCards: SavedCard[];
  isLoading: boolean;
  error: string | null;
  lastQuestion: string;
  answerType: AnswerType;
  variationCount: number;
  difficulty: number;

  setVariations: (variations: Variation[]) => void;
  setSavedCards: (cards: SavedCard[]) => void;
  addSavedCard: (card: SavedCard) => void;
  removeSavedCard: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  setLastQuestion: (q: string) => void;
  setAnswerType: (type: AnswerType) => void;
  setVariationCount: (count: number) => void;
  setDifficulty: (difficulty: number) => void;
}

export const useVariantStore = create<VariantStore>((set) => ({
  currentVariations: [],
  savedCards: [],
  isLoading: false,
  error: null,
  lastQuestion: "",
  answerType: "Integer",
  variationCount: 3,
  difficulty: 3,

  setVariations: (variations) => set({ currentVariations: variations }),
  setSavedCards: (cards) => set({ savedCards: cards }),
  addSavedCard: (card) =>
    set((state) => ({ savedCards: [...state.savedCards, card] })),
  removeSavedCard: (id) =>
    set((state) => ({
      savedCards: state.savedCards.filter((c) => c.id !== id),
    })),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setLastQuestion: (q) => set({ lastQuestion: q }),
  setAnswerType: (type) => set({ answerType: type }),
  setVariationCount: (count) => set({ variationCount: count }),
  setDifficulty: (difficulty) => set({ difficulty }),
}));
