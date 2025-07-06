<template>
  <div class="poker-container">
    <div class="container">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="display-5 fw-bold text-info mb-2">
            <i class="bi bi-3-circle-fill me-3"></i>
            Poker Hand Evaluation Trainer
          </h1>
          <p class="lead text-muted">
            Master hand rankings, sorting strategies, and avoid common pitfalls
          </p>
        </div>
      </div>

      <!-- Training Mode Selection -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-info bg-opacity-10">
              <h5 class="mb-0">
                <i class="bi bi-gear me-2"></i>
                Training Focus
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'evaluation' ? 'active-mode' : ''"
                    @click="setTrainingMode('evaluation')"
                  >
                    <i class="bi bi-search display-6 text-primary mb-2"></i>
                    <h6 class="fw-bold">Hand Evaluation</h6>
                    <small class="text-muted">What do I have?</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'sorting' ? 'active-mode' : ''"
                    @click="setTrainingMode('sorting')"
                  >
                    <i class="bi bi-grid-3x3 display-6 text-success mb-2"></i>
                    <h6 class="fw-bold">Sorting Strategy</h6>
                    <small class="text-muted">Organize efficiently</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'pitfalls' ? 'active-mode' : ''"
                    @click="setTrainingMode('pitfalls')"
                  >
                    <i
                      class="bi bi-exclamation-triangle display-6 text-warning mb-2"
                    ></i>
                    <h6 class="fw-bold">Common Pitfalls</h6>
                    <small class="text-muted">Avoid mistakes</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'odds' ? 'active-mode' : ''"
                    @click="setTrainingMode('odds')"
                  >
                    <i class="bi bi-percent display-6 text-danger mb-2"></i>
                    <h6 class="fw-bold">Odds & Outs</h6>
                    <small class="text-muted">Calculate probabilities</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Main Content Area -->
      <div class="row">
        <div class="col-lg-8">
          <!-- Hand Display -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light">
              <div class="d-flex justify-content-between align-items-center">
                <h5 class="mb-0">
                  <i class="bi bi-cards me-2"></i>
                  Your Hand ({{ hand.length }} cards)
                </h5>
                <div class="btn-group">
                  <button
                    class="btn btn-outline-primary btn-sm"
                    @click="toggleSortOrder"
                  >
                    <i
                      class="bi"
                      :class="ascending ? 'bi-sort-down' : 'bi-sort-up'"
                    ></i>
                    {{ ascending ? "High to Low" : "Low to High" }}
                  </button>
                  <button
                    class="btn btn-outline-secondary btn-sm"
                    @click="toggleSortBy"
                  >
                    <i
                      class="bi"
                      :class="sortBySuit ? 'bi-grid-3x3' : 'bi-list'"
                    ></i>
                    {{ sortBySuit ? "By Suit" : "By Value" }}
                  </button>
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row g-2">
                <div
                  class="col-auto"
                  v-for="(card, i) in displayHand"
                  :key="`${card.code}-${i}`"
                >
                  <img
                    :src="drawnCardImage(card.code)"
                    alt=""
                    class="playing-card rounded shadow-sm"
                    :class="getCardHighlight(card)"
                  />
                </div>
              </div>
            </div>
          </div>

          <!-- Action Buttons -->
          <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
            <button class="btn btn-info btn-lg px-4" @click="dealNewHand">
              <i class="bi bi-shuffle me-2"></i>
              Deal New Hand
            </button>
            <button class="btn btn-success btn-lg px-4" @click="evaluateHand">
              <i class="bi bi-search me-2"></i>
              Evaluate Hand
            </button>
            <button
              v-if="trainingMode === 'odds'"
              class="btn btn-danger btn-lg px-4"
              @click="showOddsCalculator"
            >
              <i class="bi bi-calculator me-2"></i>
              Calculate Odds
            </button>
          </div>
        </div>

        <div class="col-lg-4">
          <!-- Context Instructions -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light">
              <h6 class="mb-0">
                <i class="bi bi-info-circle me-2"></i>
                {{ getContextTitle() }}
              </h6>
            </div>
            <div class="card-body">
              <p class="small text-muted mb-0">
                {{ getContextInstructions() }}
              </p>
            </div>
          </div>

          <!-- Quick Assessment -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-header bg-light">
              <h6 class="mb-0">
                <i class="bi bi-eye me-2"></i>
                Hand Analysis
              </h6>
            </div>
            <div class="card-body">
              <!-- Hand Rank -->
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small text-muted">Hand Rank:</span>
                  <span class="badge fs-6" :class="getHandRankClass()">
                    {{ handRank }}
                  </span>
                </div>
              </div>

              <!-- Value Distribution -->
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="text-center p-2 bg-success bg-opacity-10 rounded">
                    <small class="text-muted">High Cards</small>
                    <div class="fw-bold text-success">
                      {{ countHighCards() }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-primary bg-opacity-10 rounded">
                    <small class="text-muted">Broadway</small>
                    <div class="fw-bold text-primary">
                      {{ countBroadwayCards() }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-info bg-opacity-10 rounded">
                    <small class="text-muted">Suited</small>
                    <div class="fw-bold text-info">
                      {{ countSuitedCards() }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-warning bg-opacity-10 rounded">
                    <small class="text-muted">Connected</small>
                    <div class="fw-bold text-warning">
                      {{ countConnectedCards() }}
                    </div>
                  </div>
                </div>
              </div>

              <!-- Suit Distribution -->
              <div class="mb-3">
                <small class="text-muted d-block mb-2"
                  >Suit Distribution:</small
                >
                <div class="d-flex justify-content-between">
                  <span class="badge bg-danger"
                    >{{ countCardsBySuit("Hearts") }}♥</span
                  >
                  <span class="badge bg-dark"
                    >{{ countCardsBySuit("Spades") }}♠</span
                  >
                  <span class="badge bg-secondary"
                    >{{ countCardsBySuit("Clubs") }}♣</span
                  >
                  <span class="badge bg-danger"
                    >{{ countCardsBySuit("Diamonds") }}♦</span
                  >
                </div>
              </div>

              <!-- Potential Warnings -->
              <div v-if="getPotentialWarnings().length > 0" class="mb-3">
                <small class="text-muted d-block mb-2">Potential Issues:</small>
                <div
                  v-for="warning in getPotentialWarnings()"
                  :key="warning"
                  class="alert alert-warning alert-sm py-1 mb-1"
                >
                  <small
                    ><i class="bi bi-exclamation-triangle me-1"></i
                    >{{ warning }}</small
                  >
                </div>
              </div>
            </div>
          </div>

          <!-- Hand Details -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-light">
              <h6 class="mb-0">
                <i class="bi bi-list-check me-2"></i>
                Hand Details
              </h6>
            </div>
            <div class="card-body" style="max-height: 300px; overflow-y: auto">
              <div v-if="!handEvaluation" class="text-center text-muted py-3">
                <i class="bi bi-search display-6"></i>
                <p class="mt-2">Click "Evaluate Hand" to see details</p>
              </div>
              <div v-else>
                <div class="mb-3">
                  <h6 class="fw-bold text-primary">
                    {{ handEvaluation.rank }}
                  </h6>
                  <p class="small text-muted mb-2">
                    {{ handEvaluation.description }}
                  </p>
                  <div class="d-flex justify-content-between">
                    <span class="small">Strength:</span>
                    <span
                      class="badge"
                      :class="getStrengthClass(handEvaluation.strength)"
                    >
                      {{ handEvaluation.strength }}/10
                    </span>
                  </div>
                </div>

                <hr />

                <div v-if="handEvaluation.features.length > 0">
                  <small class="text-muted d-block mb-2">Key Features:</small>
                  <div
                    v-for="feature in handEvaluation.features"
                    :key="feature"
                    class="d-flex align-items-center mb-1"
                  >
                    <i class="bi bi-check-circle text-success me-2"></i>
                    <span class="small">{{ feature }}</span>
                  </div>
                </div>

                <div v-if="handEvaluation.warnings.length > 0" class="mt-3">
                  <small class="text-muted d-block mb-2">Warnings:</small>
                  <div
                    v-for="warning in handEvaluation.warnings"
                    :key="warning"
                    class="d-flex align-items-center mb-1"
                  >
                    <i class="bi bi-exclamation-triangle text-warning me-2"></i>
                    <span class="small">{{ warning }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PokerView",
  data() {
    return {
      trainingMode: "evaluation", // evaluation, sorting, pitfalls, odds
      hand: [],
      sortedHand: [],
      ascending: true,
      sortBySuit: false,
      handRank: "Unranked",
      handEvaluation: null,
      // ... existing data properties
    };
  },
  computed: {
    ...mapGetters({
      shuffledDeck: "getShuffledDeck",
    }),
    displayHand() {
      if (this.sortBySuit) {
        return this.sortHandBySuit();
      }
      return this.ascending
        ? this.sortedHand
        : this.sortedHand.slice().reverse();
    },
  },
  methods: {
    ...mapActions(["shuffleDeck"]),

    setTrainingMode(mode) {
      this.trainingMode = mode;
      this.handEvaluation = null;
    },

    getContextTitle() {
      const titles = {
        evaluation: "Hand Evaluation",
        sorting: "Sorting Strategy",
        pitfalls: "Common Pitfalls",
        odds: "Odds & Outs",
      };
      return titles[this.trainingMode];
    },

    getContextInstructions() {
      const instructions = {
        evaluation:
          "Quickly identify your hand rank and strength. Look for pairs, straights, flushes, and other combinations.",
        sorting:
          "Learn efficient hand organization. Sort by value, suit, or potential combinations for faster evaluation.",
        pitfalls:
          "Recognize common mistakes like overvaluing suited cards or underplaying strong hands.",
        odds: "Calculate drawing odds and understand pot odds for better decision making.",
      };
      return instructions[this.trainingMode];
    },

    dealNewHand() {
      this.shuffleDeck();
      this.hand = [];
      this.sortedHand = [];
      this.handRank = "Unranked";
      this.handEvaluation = null;

      const deck = this.shuffledDeck;
      for (let i = 0; i < 5; i++) {
        this.hand.push(deck.pop());
      }
      this.sortHand();
    },

    sortHand() {
      this.sortedHand = [...this.hand].sort(
        (a, b) => this.getCardValue(b.value) - this.getCardValue(a.value)
      );
    },

    sortHandBySuit() {
      const suitOrder = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const valueOrder = [
        "Ace",
        "King",
        "Queen",
        "Jack",
        "10",
        "9",
        "8",
        "7",
        "6",
        "5",
        "4",
        "3",
        "2",
      ];

      return [...this.hand].sort((a, b) => {
        const suitDiff = suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit);
        if (suitDiff !== 0) return suitDiff;
        return valueOrder.indexOf(a.value) - valueOrder.indexOf(b.value);
      });
    },

    toggleSortOrder() {
      this.ascending = !this.ascending;
    },

    toggleSortBy() {
      this.sortBySuit = !this.sortBySuit;
    },

    evaluateHand() {
      this.handEvaluation = this.calculateHandRank();
      this.handRank = this.handEvaluation.rank;
    },

    calculateHandRank() {
      const values = this.hand.map((card) => card.value);
      const suits = this.hand.map((card) => card.suit);
      const valueCounts = this.getValueCounts(values);
      const suitCounts = this.getSuitCounts(suits);
      const sortedValues = values.sort(
        (a, b) => this.getCardValue(b) - this.getCardValue(a)
      );

      // Check for different hand ranks
      if (this.isRoyalFlush(values, suits)) {
        return {
          rank: "Royal Flush",
          description: "Ace-high straight flush",
          strength: 10,
          features: ["Highest possible hand", "Unbeatable"],
          warnings: [],
        };
      } else if (this.isStraightFlush(values, suits)) {
        return {
          rank: "Straight Flush",
          description: "Five consecutive cards of the same suit",
          strength: 9,
          features: ["Very rare hand", "Almost unbeatable"],
          warnings: [],
        };
      } else if (this.isFourOfAKind(valueCounts)) {
        return {
          rank: "Four of a Kind",
          description: "Four cards of the same value",
          strength: 8,
          features: ["Strong hand", "Good kicker important"],
          warnings: ["Watch for higher four of a kind"],
        };
      } else if (this.isFullHouse(valueCounts)) {
        return {
          rank: "Full House",
          description: "Three of a kind plus a pair",
          strength: 7,
          features: ["Strong hand", "Three of a kind rank matters most"],
          warnings: ["Higher full house possible"],
        };
      } else if (this.isFlush(suitCounts)) {
        return {
          rank: "Flush",
          description: "Five cards of the same suit",
          strength: 6,
          features: ["Good hand", "High card matters"],
          warnings: ["Vulnerable to higher flush", "Not connected cards"],
        };
      } else if (this.isStraight(sortedValues)) {
        return {
          rank: "Straight",
          description: "Five consecutive cards",
          strength: 5,
          features: ["Decent hand", "High card matters"],
          warnings: ["Vulnerable to higher straight", "Not suited"],
        };
      } else if (this.isThreeOfAKind(valueCounts)) {
        return {
          rank: "Three of a Kind",
          description: "Three cards of the same value",
          strength: 4,
          features: ["Medium strength", "Kickers important"],
          warnings: ["Vulnerable to higher hands", "Weak kickers"],
        };
      } else if (this.isTwoPair(valueCounts)) {
        return {
          rank: "Two Pair",
          description: "Two different pairs",
          strength: 3,
          features: ["Weak hand", "High pair matters"],
          warnings: ["Very vulnerable", "Easy to beat"],
        };
      } else if (this.isOnePair(valueCounts)) {
        return {
          rank: "One Pair",
          description: "Two cards of the same value",
          strength: 2,
          features: ["Weak hand", "High card important"],
          warnings: ["Very weak", "Easy to beat", "Poor kickers"],
        };
      } else {
        return {
          rank: "High Card",
          description: "No combination, highest card wins",
          strength: 1,
          features: ["Weakest hand", "High card only"],
          warnings: ["Very weak", "Easy to beat", "No combination"],
        };
      }
    },

    getCardValue(value) {
      const values = {
        Ace: 14,
        King: 13,
        Queen: 12,
        Jack: 11,
        10: 10,
        9: 9,
        8: 8,
        7: 7,
        6: 6,
        5: 5,
        4: 4,
        3: 3,
        2: 2,
      };
      return values[value] || 0;
    },

    getValueCounts(values) {
      const counts = {};
      values.forEach((value) => {
        counts[value] = (counts[value] || 0) + 1;
      });
      return counts;
    },

    getSuitCounts(suits) {
      const counts = {};
      suits.forEach((suit) => {
        counts[suit] = (counts[suit] || 0) + 1;
      });
      return counts;
    },

    // Hand checking methods
    isRoyalFlush(values, suits) {
      return (
        this.isStraightFlush(values, suits) &&
        values.includes("Ace") &&
        values.includes("King")
      );
    },

    isStraightFlush(values, suits) {
      return (
        this.isFlush(this.getSuitCounts(suits)) &&
        this.isStraight(
          values.sort((a, b) => this.getCardValue(b) - this.getCardValue(a))
        )
      );
    },

    isFourOfAKind(valueCounts) {
      return Object.values(valueCounts).some((count) => count === 4);
    },

    isFullHouse(valueCounts) {
      const counts = Object.values(valueCounts);
      return counts.includes(3) && counts.includes(2);
    },

    isFlush(suitCounts) {
      return Object.values(suitCounts).some((count) => count === 5);
    },

    isStraight(sortedValues) {
      const values = sortedValues.map((v) => this.getCardValue(v));
      for (let i = 0; i < values.length - 1; i++) {
        if (values[i] - values[i + 1] !== 1) return false;
      }
      return true;
    },

    isThreeOfAKind(valueCounts) {
      return Object.values(valueCounts).some((count) => count === 3);
    },

    isTwoPair(valueCounts) {
      const pairs = Object.values(valueCounts).filter((count) => count === 2);
      return pairs.length === 2;
    },

    isOnePair(valueCounts) {
      return Object.values(valueCounts).some((count) => count === 2);
    },

    countHighCards() {
      return this.hand.filter((card) => this.getCardValue(card.value) >= 10)
        .length;
    },

    countBroadwayCards() {
      return this.hand.filter((card) =>
        ["Ace", "King", "Queen", "Jack"].includes(card.value)
      ).length;
    },

    countSuitedCards() {
      const suitCounts = this.getSuitCounts(this.hand.map((card) => card.suit));
      return Math.max(...Object.values(suitCounts));
    },

    countConnectedCards() {
      const values = this.hand
        .map((card) => this.getCardValue(card.value))
        .sort((a, b) => a - b);
      let connected = 0;
      for (let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] - values[i] <= 2) connected++;
      }
      return connected;
    },

    countCardsBySuit(suit) {
      return this.hand.filter((card) => card.suit === suit).length;
    },

    getPotentialWarnings() {
      const warnings = [];

      // Check for common pitfalls
      if (this.countHighCards() === 0) {
        warnings.push("No high cards - very weak");
      }
      if (this.countSuitedCards() === 2) {
        warnings.push("Only 2 suited cards - low flush potential");
      }
      if (this.countConnectedCards() === 0) {
        warnings.push("No connected cards - low straight potential");
      }

      return warnings;
    },

    getHandRankClass() {
      const strength = this.handEvaluation?.strength || 0;
      if (strength >= 8) return "bg-success";
      if (strength >= 6) return "bg-primary";
      if (strength >= 4) return "bg-warning";
      return "bg-secondary";
    },

    getStrengthClass(strength) {
      if (strength >= 8) return "bg-success";
      if (strength >= 6) return "bg-primary";
      if (strength >= 4) return "bg-warning";
      return "bg-secondary";
    },

    getCardHighlight(card) {
      // Highlight cards based on training mode
      if (this.trainingMode === "evaluation") {
        if (this.getCardValue(card.value) >= 10)
          return "border border-success border-2";
      }
      return "";
    },

    showOddsCalculator() {
      // Placeholder for odds calculator
      alert("Odds calculator feature coming soon!");
    },

    drawnCardImage(code) {
      return `https://deckofcardsapi.com/static/img/${this.convertCardCode(
        code
      )}.png`;
    },

    convertCardCode(code) {
      // Convert T (10) to 0 for the API
      // Handle all 10 cards: TH, TC, TD, TS -> 0H, 0C, 0D, 0S
      return code.replace("T", "0");
    },
  },

  created() {
    this.dealNewHand();
  },
};
</script>

<style scoped>
.poker-container {
  padding: 2rem 0;
  min-height: calc(100vh - 76px);
  background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
}

.training-mode-card {
  transition: all 0.3s ease;
  border: 2px solid transparent;
}

.training-mode-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
}

.training-mode-card.active-mode {
  border-color: #17a2b8;
  background-color: #e3f2fd;
  box-shadow: 0 5px 15px rgba(23, 162, 184, 0.3);
}

.cursor-pointer {
  cursor: pointer;
}

.playing-card {
  width: 80px;
  height: 120px;
  transition: transform 0.2s ease;
}

.playing-card:hover {
  transform: scale(1.1);
  z-index: 10;
}

.card {
  border-radius: 15px;
  transition: all 0.3s ease;
}

.btn {
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.alert-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
}

@media (max-width: 768px) {
  .poker-container {
    padding: 1rem 0;
  }

  .playing-card {
    width: 60px;
    height: 90px;
  }
}
</style>
