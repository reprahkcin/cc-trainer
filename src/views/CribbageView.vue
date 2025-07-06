<template>
  <div class="cribbage-container">
    <div class="container">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="display-5 fw-bold text-danger mb-2">
            <i class="bi bi-4-circle-fill me-3"></i>
            Cribbage Hand Trainer
          </h1>
          <p class="lead text-muted">
            Master hand selection, pegging strategy, and scoring optimization
          </p>
        </div>
      </div>

      <!-- Training Mode Selection -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-danger bg-opacity-10">
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
                    :class="
                      trainingMode === 'hand-selection' ? 'active-mode' : ''
                    "
                    @click="setTrainingMode('hand-selection')"
                  >
                    <i class="bi bi-scissors display-6 text-primary mb-2"></i>
                    <h6 class="fw-bold">Hand Selection</h6>
                    <small class="text-muted">What to keep?</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'pegging' ? 'active-mode' : ''"
                    @click="setTrainingMode('pegging')"
                  >
                    <i
                      class="bi bi-arrow-right display-6 text-success mb-2"
                    ></i>
                    <h6 class="fw-bold">Pegging Strategy</h6>
                    <small class="text-muted">Play to 31</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'scoring' ? 'active-mode' : ''"
                    @click="setTrainingMode('scoring')"
                  >
                    <i class="bi bi-calculator display-6 text-info mb-2"></i>
                    <h6 class="fw-bold">Scoring</h6>
                    <small class="text-muted">Count points</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="
                      trainingMode === 'crib-strategy' ? 'active-mode' : ''
                    "
                    @click="setTrainingMode('crib-strategy')"
                  >
                    <i class="bi bi-box display-6 text-warning mb-2"></i>
                    <h6 class="fw-bold">Crib Strategy</h6>
                    <small class="text-muted">What to discard?</small>
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
            <button class="btn btn-danger btn-lg px-4" @click="dealNewHand">
              <i class="bi bi-shuffle me-2"></i>
              Deal New Hand
            </button>
            <button class="btn btn-success btn-lg px-4" @click="analyzeHand">
              <i class="bi bi-search me-2"></i>
              Analyze Hand
            </button>
            <button
              v-if="trainingMode === 'hand-selection'"
              class="btn btn-warning btn-lg px-4"
              @click="showHandSelection"
            >
              <i class="bi bi-scissors me-2"></i>
              Select Hand
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
              <!-- Total Points -->
              <div class="mb-3">
                <div class="d-flex justify-content-between align-items-center">
                  <span class="small text-muted">Total Points:</span>
                  <span class="badge fs-6" :class="getPointsClass()">
                    {{ totalPoints }}
                  </span>
                </div>
              </div>

              <!-- Point Breakdown -->
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="text-center p-2 bg-success bg-opacity-10 rounded">
                    <small class="text-muted">Fifteens</small>
                    <div class="fw-bold text-success">{{ fifteenPoints }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-primary bg-opacity-10 rounded">
                    <small class="text-muted">Pairs</small>
                    <div class="fw-bold text-primary">{{ pairPoints }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-info bg-opacity-10 rounded">
                    <small class="text-muted">Runs</small>
                    <div class="fw-bold text-info">{{ runPoints }}</div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-warning bg-opacity-10 rounded">
                    <small class="text-muted">Flushes</small>
                    <div class="fw-bold text-warning">{{ flushPoints }}</div>
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
                Scoring Breakdown
              </h6>
            </div>
            <div class="card-body" style="max-height: 300px; overflow-y: auto">
              <div v-if="!handAnalysis" class="text-center text-muted py-3">
                <i class="bi bi-search display-6"></i>
                <p class="mt-2">Click "Analyze Hand" to see details</p>
              </div>
              <div v-else>
                <div v-if="handAnalysis.fifteens.length > 0" class="mb-3">
                  <small class="text-muted d-block mb-2"
                    >Fifteens ({{ fifteenPoints }} pts):</small
                  >
                  <div
                    v-for="(fifteen, index) in handAnalysis.fifteens"
                    :key="index"
                    class="small mb-1"
                  >
                    <i class="bi bi-plus-circle text-success me-1"></i>
                    {{ fifteen.join(" + ") }} = 15
                  </div>
                </div>

                <div v-if="handAnalysis.pairs.length > 0" class="mb-3">
                  <small class="text-muted d-block mb-2"
                    >Pairs ({{ pairPoints }} pts):</small
                  >
                  <div
                    v-for="(pair, index) in handAnalysis.pairs"
                    :key="index"
                    class="small mb-1"
                  >
                    <i class="bi bi-plus-circle text-primary me-1"></i>
                    {{ pair.join(", ") }}
                  </div>
                </div>

                <div v-if="handAnalysis.runs.length > 0" class="mb-3">
                  <small class="text-muted d-block mb-2"
                    >Runs ({{ runPoints }} pts):</small
                  >
                  <div
                    v-for="(run, index) in handAnalysis.runs"
                    :key="index"
                    class="small mb-1"
                  >
                    <i class="bi bi-plus-circle text-info me-1"></i>
                    {{ run.join(" → ") }}
                  </div>
                </div>

                <div v-if="handAnalysis.flushes.length > 0" class="mb-3">
                  <small class="text-muted d-block mb-2"
                    >Flushes ({{ flushPoints }} pts):</small
                  >
                  <div
                    v-for="(flush, index) in handAnalysis.flushes"
                    :key="index"
                    class="small mb-1"
                  >
                    <i class="bi bi-plus-circle text-warning me-1"></i>
                    {{ flush.join(", ") }}
                  </div>
                </div>

                <hr v-if="totalPoints > 0" />
                <div
                  v-if="totalPoints > 0"
                  class="d-flex justify-content-between align-items-center"
                >
                  <span class="fw-bold">Total Score:</span>
                  <span class="badge bg-danger fs-6">{{ totalPoints }}</span>
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
  name: "CribbageView",
  data() {
    return {
      trainingMode: "hand-selection", // hand-selection, pegging, scoring, crib-strategy
      hand: [],
      sortedHand: [],
      ascending: true,
      sortBySuit: false,
      handAnalysis: null,
      totalPoints: 0,
      fifteenPoints: 0,
      pairPoints: 0,
      runPoints: 0,
      flushPoints: 0,
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
      this.handAnalysis = null;
    },

    getContextTitle() {
      const titles = {
        "hand-selection": "Hand Selection",
        pegging: "Pegging Strategy",
        scoring: "Scoring Analysis",
        "crib-strategy": "Crib Strategy",
      };
      return titles[this.trainingMode];
    },

    getContextInstructions() {
      const instructions = {
        "hand-selection":
          "Choose which 4 cards to keep and which 2 to discard to the crib. Consider pegging potential and scoring combinations.",
        pegging:
          "Practice playing cards to 31. Look for opportunities to score points during play.",
        scoring:
          "Learn to quickly count all possible scoring combinations: fifteens, pairs, runs, and flushes.",
        "crib-strategy":
          "Decide what to discard to the crib. Consider whether you're dealing or not dealing.",
      };
      return instructions[this.trainingMode];
    },

    dealNewHand() {
      this.shuffleDeck();
      this.hand = [];
      this.sortedHand = [];
      this.handAnalysis = null;
      this.resetPoints();

      const deck = this.shuffledDeck;
      for (let i = 0; i < 6; i++) {
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

    analyzeHand() {
      this.handAnalysis = this.calculateCribbageScore();
      this.updatePoints();
    },

    calculateCribbageScore() {
      const analysis = {
        fifteens: [],
        pairs: [],
        runs: [],
        flushes: [],
      };

      // Find all possible combinations
      const combinations = this.getCombinations(this.hand, 2, 4);

      // Check for fifteens
      combinations.forEach((combo) => {
        const sum = combo.reduce(
          (total, card) => total + this.getCardValue(card.value),
          0
        );
        if (sum === 15) {
          analysis.fifteens.push(
            combo.map((card) => `${card.value}${card.suit}`)
          );
        }
      });

      // Check for pairs
      const valueCounts = {};
      this.hand.forEach((card) => {
        valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
      });

      Object.entries(valueCounts).forEach(([value, count]) => {
        if (count >= 2) {
          const pairs = this.hand.filter((card) => card.value === value);
          analysis.pairs.push(pairs.map((card) => `${card.value}${card.suit}`));
        }
      });

      // Check for runs
      const sortedValues = this.hand
        .map((card) => this.getCardValue(card.value))
        .sort((a, b) => a - b);
      const runs = this.findRuns(sortedValues);
      runs.forEach((run) => {
        analysis.runs.push(run.map((val) => this.getValueName(val)));
      });

      // Check for flushes
      const suitCounts = {};
      this.hand.forEach((card) => {
        suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
      });

      Object.entries(suitCounts).forEach(([suit, count]) => {
        if (count >= 4) {
          const flush = this.hand.filter((card) => card.suit === suit);
          analysis.flushes.push(
            flush.map((card) => `${card.value}${card.suit}`)
          );
        }
      });

      return analysis;
    },

    getCardValue(value) {
      const values = {
        Ace: 1,
        2: 2,
        3: 3,
        4: 4,
        5: 5,
        6: 6,
        7: 7,
        8: 8,
        9: 9,
        10: 10,
        Jack: 10,
        Queen: 10,
        King: 10,
      };
      return values[value] || 0;
    },

    getValueName(value) {
      const names = {
        1: "A",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        10: "10",
        11: "J",
        12: "Q",
        13: "K",
      };
      return names[value] || value;
    },

    getCombinations(cards, minSize, maxSize) {
      const combinations = [];

      for (let size = minSize; size <= maxSize; size++) {
        this.getCombinationsOfSize(cards, size, [], 0, combinations);
      }

      return combinations;
    },

    getCombinationsOfSize(cards, size, current, start, combinations) {
      if (current.length === size) {
        combinations.push([...current]);
        return;
      }

      for (let i = start; i < cards.length; i++) {
        current.push(cards[i]);
        this.getCombinationsOfSize(cards, size, current, i + 1, combinations);
        current.pop();
      }
    },

    findRuns(values) {
      const runs = [];
      const uniqueValues = [...new Set(values)].sort((a, b) => a - b);

      for (let i = 0; i < uniqueValues.length - 2; i++) {
        for (let j = i + 2; j < uniqueValues.length; j++) {
          const run = uniqueValues.slice(i, j + 1);
          if (this.isConsecutive(run)) {
            runs.push(run);
          }
        }
      }

      return runs;
    },

    isConsecutive(values) {
      for (let i = 0; i < values.length - 1; i++) {
        if (values[i + 1] - values[i] !== 1) return false;
      }
      return true;
    },

    updatePoints() {
      this.fifteenPoints = this.handAnalysis.fifteens.length * 2;
      this.pairPoints = this.handAnalysis.pairs.length * 2;
      this.runPoints =
        this.handAnalysis.runs.length * this.handAnalysis.runs[0]?.length || 0;
      this.flushPoints = this.handAnalysis.flushes.length * 4;
      this.totalPoints =
        this.fifteenPoints +
        this.pairPoints +
        this.runPoints +
        this.flushPoints;
    },

    resetPoints() {
      this.totalPoints = 0;
      this.fifteenPoints = 0;
      this.pairPoints = 0;
      this.runPoints = 0;
      this.flushPoints = 0;
    },

    countCardsBySuit(suit) {
      return this.hand.filter((card) => card.suit === suit).length;
    },

    getPotentialWarnings() {
      const warnings = [];

      if (this.hand.length === 6) {
        if (this.totalPoints < 4) {
          warnings.push("Low scoring hand - consider discarding to crib");
        }
        if (this.handAnalysis?.fifteens.length === 0) {
          warnings.push("No fifteens - weak hand");
        }
        if (this.handAnalysis?.runs.length === 0) {
          warnings.push("No runs - limited scoring potential");
        }
      }

      return warnings;
    },

    getPointsClass() {
      if (this.totalPoints >= 12) return "bg-success";
      if (this.totalPoints >= 8) return "bg-primary";
      if (this.totalPoints >= 4) return "bg-warning";
      return "bg-secondary";
    },

    getCardHighlight(card) {
      // Highlight cards based on training mode
      if (this.trainingMode === "hand-selection") {
        if (this.getCardValue(card.value) === 10)
          return "border border-success border-2";
        if (card.value === "5") return "border border-primary border-2";
      }
      return "";
    },

    showHandSelection() {
      // Placeholder for hand selection feature
      alert("Hand selection feature coming soon!");
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
.cribbage-container {
  padding: 2rem 0;
  min-height: calc(100vh - 76px);
  background: linear-gradient(135deg, #ffebee 0%, #ffcdd2 100%);
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
  border-color: #dc3545;
  background-color: #ffebee;
  box-shadow: 0 5px 15px rgba(220, 53, 69, 0.3);
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
  .cribbage-container {
    padding: 1rem 0;
  }

  .playing-card {
    width: 60px;
    height: 90px;
  }
}
</style>
