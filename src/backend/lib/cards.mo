import Map "mo:core/Map";
import List "mo:core/List";
import Array "mo:core/Array";
import Int "mo:core/Int";
import Order "mo:core/Order";
import Types "../types/solver";
import Common "../types/common";

module {
  public func addCard(
    store : Map.Map<Common.CardId, Types.SavedCardInternal>,
    id : Common.CardId,
    card : Types.SavedCardInternal,
  ) {
    store.add(id, card);
  };

  public func getAll(store : Map.Map<Common.CardId, Types.SavedCardInternal>) : [Types.SavedCard] {
    let all = List.empty<Types.SavedCard>();
    for ((_, card) in store.entries()) {
      all.add({
        id = card.id;
        question = card.question;
        variationQuestion = card.variationQuestion;
        answerOptions = card.answerOptions;
        steps = card.steps;
        confidence = card.confidence;
        savedAt = card.savedAt;
      });
    };
    // Sort newest first (descending by savedAt)
    let arr = all.toArray();
    arr.sort(func(a : Types.SavedCard, b : Types.SavedCard) : Order.Order {
      Int.compare(b.savedAt, a.savedAt)
    })
  };

  public func removeCard(
    store : Map.Map<Common.CardId, Types.SavedCardInternal>,
    id : Common.CardId,
  ) : Bool {
    switch (store.get(id)) {
      case (?_) {
        store.remove(id);
        true
      };
      case null false;
    }
  };
};
