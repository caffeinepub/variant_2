import Map "mo:core/Map";
import Types "types/solver";
import Common "types/common";
import SolverApi "mixins/solver-api";

actor {
  let cards = Map.empty<Common.CardId, Types.SavedCardInternal>();

  include SolverApi(cards);
};
