import { useActor } from "@caffeineai/core-infrastructure";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createActor } from "../backend";
import { useVariantStore } from "../store";
import type { CardInput, SavedCard, SolverResult } from "../types";

function useBackendActor() {
  return useActor(createActor);
}

export function useSolveQuestion() {
  const { actor } = useBackendActor();
  const store = useVariantStore();

  return useMutation({
    mutationFn: async ({
      question,
      answerType,
      difficulty,
      variationCount,
    }: {
      question: string;
      answerType: string;
      difficulty: number;
      variationCount: number;
    }): Promise<SolverResult> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.solveQuestion(
        question,
        answerType,
        BigInt(difficulty),
        BigInt(variationCount),
      );
    },
    onMutate: () => {
      store.setLoading(true);
      store.setError(null);
    },
    onSuccess: (data) => {
      store.setVariations(data.variations);
      store.setLoading(false);
    },
    onError: (err: Error) => {
      store.setError(err.message);
      store.setLoading(false);
      toast.error("Failed to generate variations");
    },
  });
}

export function useSavedCards() {
  const { actor, isFetching } = useBackendActor();

  return useQuery<SavedCard[]>({
    queryKey: ["savedCards"],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getSavedCards();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useSaveCard() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  const addSavedCard = useVariantStore((s) => s.addSavedCard);

  return useMutation({
    mutationFn: async (card: CardInput): Promise<string> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.saveCard(card);
    },
    onSuccess: (id, card) => {
      const saved: SavedCard = {
        ...card,
        id,
        savedAt: BigInt(Date.now()),
      };
      addSavedCard(saved);
      queryClient.invalidateQueries({ queryKey: ["savedCards"] });
      toast.success("Card saved!");
    },
    onError: () => {
      toast.error("Failed to save card");
    },
  });
}

export function useDeleteCard() {
  const { actor } = useBackendActor();
  const queryClient = useQueryClient();
  const removeSavedCard = useVariantStore((s) => s.removeSavedCard);

  return useMutation({
    mutationFn: async (id: string): Promise<boolean> => {
      if (!actor) throw new Error("Actor not ready");
      return actor.deleteCard(id);
    },
    onSuccess: (_, id) => {
      removeSavedCard(id);
      queryClient.invalidateQueries({ queryKey: ["savedCards"] });
      toast.success("Card removed");
    },
    onError: () => {
      toast.error("Failed to delete card");
    },
  });
}
