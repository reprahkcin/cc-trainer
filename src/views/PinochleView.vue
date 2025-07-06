<template>
  <div class="pinochle-container">
    <div class="container">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="display-5 fw-bold text-warning mb-2">
            <i class="bi bi-2-circle-fill me-3"></i>
            Pinochle Hand Analysis Trainer
          </h1>
          <p class="lead text-muted">
            Develop quick mental algorithms for different game contexts
          </p>
        </div>
      </div>

      <!-- Training Mode Selection -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-warning bg-opacity-10">
              <h5 class="mb-0">
                <i class="bi bi-gear me-2"></i>
                Training Context
              </h5>
            </div>
            <div class="card-body">
              <div class="row g-3">
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'bidding' ? 'active-mode' : ''"
                    @click="setTrainingMode('bidding')"
                  >
                    <i class="bi bi-calculator display-6 text-primary mb-2"></i>
                    <h6 class="fw-bold">Bidding</h6>
                    <small class="text-muted">Should I bid?</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'trump' ? 'active-mode' : ''"
                    @click="setTrainingMode('trump')"
                  >
                    <i class="bi bi-star display-6 text-success mb-2"></i>
                    <h6 class="fw-bold">Trump Selection</h6>
                    <small class="text-muted">What should I call?</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'passing' ? 'active-mode' : ''"
                    @click="setTrainingMode('passing')"
                  >
                    <i
                      class="bi bi-arrow-left-right display-6 text-info mb-2"
                    ></i>
                    <h6 class="fw-bold">Passing</h6>
                    <small class="text-muted">What should I pass?</small>
                  </div>
                </div>
                <div class="col-md-3">
                  <div
                    class="training-mode-card text-center p-3 rounded cursor-pointer"
                    :class="trainingMode === 'speed' ? 'active-mode' : ''"
                    @click="setTrainingMode('speed')"
                  >
                    <i class="bi bi-lightning display-6 text-danger mb-2"></i>
                    <h6 class="fw-bold">Speed Drill</h6>
                    <small class="text-muted">Quick recognition</small>
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
                    {{ ascending ? "Ascending" : "Descending" }}
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
            <button class="btn btn-warning btn-lg px-4" @click="dealNewHand">
              <i class="bi bi-shuffle me-2"></i>
              Deal New Hand
            </button>
            <button class="btn btn-success btn-lg px-4" @click="analyzeHand">
              <i class="bi bi-search me-2"></i>
              Analyze Hand
            </button>
            <button
              v-if="trainingMode === 'speed'"
              class="btn btn-danger btn-lg px-4"
              @click="startSpeedDrill"
            >
              <i class="bi bi-stopwatch me-2"></i>
              Start Timer
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
                Quick Assessment
              </h6>
            </div>
            <div class="card-body">
              <div class="row g-2 mb-3">
                <div class="col-6">
                  <div class="text-center p-2 bg-success bg-opacity-10 rounded">
                    <small class="text-muted">Aces</small>
                    <div class="fw-bold text-success">
                      {{ countCardsByValue("Ace") }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-primary bg-opacity-10 rounded">
                    <small class="text-muted">Kings</small>
                    <div class="fw-bold text-primary">
                      {{ countCardsByValue("King") }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-info bg-opacity-10 rounded">
                    <small class="text-muted">Queens</small>
                    <div class="fw-bold text-info">
                      {{ countCardsByValue("Queen") }}
                    </div>
                  </div>
                </div>
                <div class="col-6">
                  <div class="text-center p-2 bg-warning bg-opacity-10 rounded">
                    <small class="text-muted">Jacks</small>
                    <div class="fw-bold text-warning">
                      {{ countCardsByValue("Jack") }}
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

              <!-- Trump Selection (if applicable) -->
              <div v-if="trainingMode === 'trump'" class="mb-3">
                <label class="form-label small">Suggested Trump:</label>
                <select
                  class="form-select form-select-sm"
                  v-model="suggestedTrump"
                >
                  <option value="">Select suit...</option>
                  <option value="Hearts">Hearts ♥</option>
                  <option value="Spades">Spades ♠</option>
                  <option value="Clubs">Clubs ♣</option>
                  <option value="Diamonds">Diamonds ♦</option>
                </select>
              </div>
            </div>
          </div>

          <!-- Meld Analysis -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-light">
              <h6 class="mb-0">
                <i class="bi bi-list-check me-2"></i>
                Meld Analysis
              </h6>
            </div>
            <div class="card-body" style="max-height: 300px; overflow-y: auto">
              <div
                v-if="Object.keys(meldScore).length === 0"
                class="text-center text-muted py-3"
              >
                <i class="bi bi-search display-6"></i>
                <p class="mt-2">Click "Analyze Hand" to see melds</p>
              </div>
              <div v-else>
                <div
                  v-for="(score, meld) in meldScore"
                  :key="meld"
                  v-show="score > 0"
                  class="d-flex justify-content-between align-items-center mb-2 p-2 rounded"
                  :class="score >= 10 ? 'bg-success bg-opacity-10' : 'bg-light'"
                >
                  <span class="small fw-medium">{{
                    formatMeldName(meld)
                  }}</span>
                  <span
                    class="badge"
                    :class="score >= 10 ? 'bg-success' : 'bg-secondary'"
                  >
                    {{ score }}
                  </span>
                </div>
                <hr v-if="totalMeldScore > 0" />
                <div
                  v-if="totalMeldScore > 0"
                  class="d-flex justify-content-between align-items-center"
                >
                  <span class="fw-bold">Total Meld:</span>
                  <span class="badge bg-primary fs-6">{{
                    totalMeldScore
                  }}</span>
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
  name: "PinochleView",
  data() {
    return {
      trainingMode: "bidding", // bidding, trump, passing, speed
      hand: [],
      sortedHand: [],
      ascending: true,
      sortBySuit: false,
      suggestedTrump: "",
      meldScore: {},
      speedTimer: null,
      speedStartTime: null,
      // ... existing data properties
    };
  },
  computed: {
    ...mapGetters({
      shuffledDeck: "getShuffledPinochleDeck",
    }),
    displayHand() {
      if (this.sortBySuit) {
        return this.sortHandBySuit();
      }
      return this.ascending
        ? this.sortedHand
        : this.sortedHand.slice().reverse();
    },
    totalMeldScore() {
      return Object.values(this.meldScore).reduce(
        (sum, score) => sum + score,
        0
      );
    },
  },
  methods: {
    ...mapActions(["shufflePinochleDeck"]),

    setTrainingMode(mode) {
      this.trainingMode = mode;
      this.suggestedTrump = "";
      this.meldScore = {};
    },

    getContextTitle() {
      const titles = {
        bidding: "Bidding Context",
        trump: "Trump Selection",
        passing: "Passing Strategy",
        speed: "Speed Recognition",
      };
      return titles[this.trainingMode];
    },

    getContextInstructions() {
      const instructions = {
        bidding:
          "Quickly assess your meld potential. Look for Aces Around, Kings Around, and strong suits. Consider bidding if you have 15+ meld points.",
        trump:
          "Analyze suit strength and meld potential. Choose the suit that maximizes your scoring opportunities.",
        passing:
          "Evaluate what to pass to your partner. Consider keeping strong melds and passing weaker cards.",
        speed:
          "Practice rapid meld recognition. Time yourself to improve your mental processing speed.",
      };
      return instructions[this.trainingMode];
    },

    dealNewHand() {
      this.shufflePinochleDeck();
      this.hand = [];
      this.sortedHand = [];
      this.meldScore = {};
      this.suggestedTrump = "";

      const deck = this.shuffledDeck;
      for (let i = 0; i < 12; i++) {
        this.hand.push(deck.pop());
      }
      this.sortHand();
    },

    sortHand() {
      this.sortedHand = [...this.hand].sort((a, b) => a.id - b.id);
    },

    sortHandBySuit() {
      const suitOrder = ["Hearts", "Diamonds", "Clubs", "Spades"];
      const valueOrder = ["Ace", "10", "King", "Queen", "Jack", "9"];

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
      // Use existing scoring logic from PinochleScoreAnalyzer
      this.meldScore = this.calculateMeldScore();

      if (this.trainingMode === "trump") {
        this.suggestedTrump = this.suggestBestTrump();
      }
    },

    calculateMeldScore() {
      // Simplified version - you can integrate the full logic from PinochleScoreAnalyzer
      const score = {};

      // Count cards by value
      const aces = this.hand.filter((card) => card.value === "Ace").length;
      const kings = this.hand.filter((card) => card.value === "King").length;
      const queens = this.hand.filter((card) => card.value === "Queen").length;
      const jacks = this.hand.filter((card) => card.value === "Jack").length;

      // Basic melds
      if (aces >= 4) score.acesAround = 10;
      if (kings >= 4) score.kingsAround = 8;
      if (queens >= 4) score.queensAround = 6;
      if (jacks >= 4) score.jacksAround = 4;

      // Pinochle
      const jackDiamonds = this.hand.filter(
        (card) => card.value === "Jack" && card.suit === "Diamonds"
      ).length;
      const queenSpades = this.hand.filter(
        (card) => card.value === "Queen" && card.suit === "Spades"
      ).length;
      if (jackDiamonds >= 1 && queenSpades >= 1) score.pinochle = 4;
      if (jackDiamonds >= 2 && queenSpades >= 2) score.doublePinochle = 30;

      return score;
    },

    suggestBestTrump() {
      const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
      let bestSuit = "";
      let bestScore = 0;

      suits.forEach((suit) => {
        const suitCards = this.hand.filter((card) => card.suit === suit);
        const score = suitCards.length * 2; // Basic scoring
        if (score > bestScore) {
          bestScore = score;
          bestSuit = suit;
        }
      });

      return bestSuit;
    },

    countCardsByValue(value) {
      return this.hand.filter((card) => card.value === value).length;
    },

    countCardsBySuit(suit) {
      return this.hand.filter((card) => card.suit === suit).length;
    },

    getCardHighlight(card) {
      // Highlight cards based on training mode
      if (this.trainingMode === "bidding") {
        if (card.value === "Ace") return "border border-success border-2";
        if (card.value === "King") return "border border-primary border-2";
      }
      return "";
    },

    formatMeldName(meld) {
      return meld
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase());
    },

    startSpeedDrill() {
      this.speedStartTime = Date.now();
      this.speedTimer = setInterval(() => {
        // Timer logic can be expanded here
        // const elapsed = Math.floor((Date.now() - this.speedStartTime) / 1000);
      }, 1000);
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

  beforeUnmount() {
    if (this.speedTimer) {
      clearInterval(this.speedTimer);
    }
  },
};
</script>

<style scoped>
.pinochle-container {
  padding: 2rem 0;
  min-height: calc(100vh - 76px);
  background: linear-gradient(135deg, #fff3cd 0%, #ffeaa7 100%);
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
  border-color: #ffc107;
  background-color: #fff3cd;
  box-shadow: 0 5px 15px rgba(255, 193, 7, 0.3);
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

@media (max-width: 768px) {
  .pinochle-container {
    padding: 1rem 0;
  }

  .playing-card {
    width: 60px;
    height: 90px;
  }
}
</style>
