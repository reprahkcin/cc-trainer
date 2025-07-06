<template>
  <div class="blackjack-container">
    <div class="container">
      <!-- Header -->
      <div class="row mb-4">
        <div class="col-12 text-center">
          <h1 class="display-5 fw-bold text-success mb-2">
            <i class="bi bi-1-circle-fill me-3"></i>
            Blackjack Card Counting Trainer
          </h1>
          <p class="lead text-muted">
            Practice the Hi-Lo card counting system with interactive drills
          </p>

          <!-- Hi-Lo System Instructions -->
          <div class="row justify-content-center mb-4">
            <div class="col-lg-8">
              <div class="card border-0 shadow-sm bg-light">
                <div class="card-body p-3">
                  <h6 class="card-title mb-2">
                    <i class="bi bi-info-circle me-2"></i>
                    Hi-Lo Card Counting System
                  </h6>
                  <p class="card-text small mb-2">
                    <strong>+1:</strong> 2, 3, 4, 5, 6 | <strong>0:</strong> 7,
                    8, 9 | <strong>-1:</strong> 10, J, Q, K, A
                  </p>
                  <p class="card-text small mb-0 text-muted">
                    Keep a running count as cards are drawn. A positive count
                    favors the player, while a negative count favors the dealer.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-lg-8">
          <!-- Card Display Area -->
          <div class="card border-0 shadow-sm mb-4">
            <div class="card-body text-center p-4 bg-success bg-opacity-10">
              <img
                :src="drawnCardImage"
                alt=""
                class="playing-card rounded shadow-lg"
              />
            </div>
          </div>

          <!-- Control Buttons -->
          <div class="d-grid gap-2 d-md-flex justify-content-md-center mb-4">
            <button
              :disabled="deck.length <= 0"
              class="btn btn-success btn-lg px-4"
              @click="drawAndDisplayCard"
            >
              <i class="bi bi-card-text me-2"></i>
              Draw Card
            </button>
            <button
              class="btn btn-outline-secondary btn-lg px-4"
              @click="resetDeck"
            >
              <i class="bi bi-shuffle me-2"></i>
              Shuffle Deck
            </button>
          </div>
        </div>

        <div class="col-lg-4">
          <!-- Stats Cards -->
          <div class="row mb-4">
            <div class="col-6">
              <div class="card border-0 shadow-sm text-center">
                <div class="card-body">
                  <h6 class="card-title text-muted mb-2">
                    <i class="bi bi-calculator me-1"></i>
                    Running Count
                  </h6>
                  <h3
                    class="card-text fw-bold"
                    :class="runningCount >= 0 ? 'text-success' : 'text-danger'"
                  >
                    {{ runningCount }}
                  </h3>
                </div>
              </div>
            </div>
            <div class="col-6">
              <div class="card border-0 shadow-sm text-center">
                <div class="card-body">
                  <h6 class="card-title text-muted mb-2">
                    <i class="bi bi-cards me-1"></i>
                    Cards Left
                  </h6>
                  <h3 class="card-text fw-bold text-primary">
                    {{ deck.length }}
                  </h3>
                </div>
              </div>
            </div>
          </div>

          <!-- Played Cards History -->
          <div class="card border-0 shadow-sm">
            <div class="card-header bg-light">
              <h5 class="mb-0">
                <i class="bi bi-clock-history me-2"></i>
                Played Cards
              </h5>
            </div>
            <div class="card-body" style="max-height: 400px; overflow-y: auto">
              <div
                v-if="playedCards.length === 0"
                class="text-center text-muted py-4"
              >
                <i class="bi bi-card-text display-6"></i>
                <p class="mt-2">No cards drawn yet</p>
              </div>
              <div v-else>
                <div
                  v-for="(card, index) in playedCards.slice().reverse()"
                  :key="`${card.code}-${index}`"
                  class="d-flex align-items-center mb-2 p-2 rounded"
                  :class="index % 2 === 0 ? 'bg-light' : ''"
                >
                  <span class="me-2" :class="suitIcon(card.suit)"></span>
                  <span class="fw-medium"
                    >{{ card.value }} of {{ card.suit }}</span
                  >
                  <small class="text-muted ms-auto">{{
                    playedCards.length - index
                  }}</small>
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
  name: "BlackJackView",
  data() {
    return {
      drawnCard: null,
      playedCards: [],
      deck: [],
      isDrawing: false,
      runningCount: 0,
    };
  },
  computed: {
    ...mapGetters(["getShuffledDeck"]),
    drawnCardImage() {
      if (this.drawnCard) {
        if (this.deck.length === 0 || this.deck.length === 52) {
          return "https://deckofcardsapi.com/static/img/back.png";
        } else {
          return `https://deckofcardsapi.com/static/img/${this.convertCardCode(
            this.drawnCard.code
          )}.png`;
        }
      }
      return "https://deckofcardsapi.com/static/img/back.png";
    },
  },
  created() {
    this.deck = this.getShuffledDeck;
    this.drawAndDisplayCard();
  },
  methods: {
    ...mapActions(["shuffleDeck"]),
    drawAndDisplayCard() {
      if (this.deck.length > 0 && !this.isDrawing) {
        this.isDrawing = true;
        // Draw a card from the deck
        const drawnIndex = Math.floor(Math.random() * this.deck.length);
        this.drawnCard = this.deck[drawnIndex];

        // Add the card to the playedCards array
        this.playedCards.push(this.drawnCard);

        // Update the running count
        this.updateRunningCount(this.drawnCard.countValue);

        // Remove the card from the deck
        this.deck.splice(drawnIndex, 1);

        // Reset the isDrawing flag
        this.isDrawing = false;
      } else {
        return;
      }
    },
    resetDeck() {
      this.shuffleDeck();
      this.deck = this.getShuffledDeck;
      this.drawnCard = null;
      this.playedCards = [];
      this.runningCount = 0;
    },
    updateRunningCount(count) {
      this.runningCount += count;
    },
    suitIcon(suit) {
      switch (suit) {
        case "Hearts":
          return "bi-suit-heart-fill text-danger";
        case "Spades":
          return "bi-suit-spade-fill text-dark";
        case "Clubs":
          return "bi-suit-club-fill text-dark";
        case "Diamonds":
          return "bi-suit-diamond-fill text-danger";
        default:
          return "";
      }
    },

    convertCardCode(code) {
      // Convert T (10) to 0 for the API
      // Handle all 10 cards: TH, TC, TD, TS -> 0H, 0C, 0D, 0S
      return code.replace("T", "0");
    },
  },
};
</script>

<style scoped>
.blackjack-container {
  padding: 2rem 0;
  min-height: calc(100vh - 76px);
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
}

.playing-card {
  width: 200px;
  height: 300px;
  transition: transform 0.3s ease;
}

.playing-card:hover {
  transform: scale(1.05);
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
  .blackjack-container {
    padding: 1rem 0;
  }

  .playing-card {
    width: 150px;
    height: 225px;
  }
}
</style>
