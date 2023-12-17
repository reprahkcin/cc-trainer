<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <!-- Display card image here -->
          <img :src="drawnCardImage" alt="" class="playing-card" />
        </div>
        <div>
          <button
            v-if="deck.length > 0"
            class="btn btn-primary"
            @click="drawAndDisplayCard"
          >
            Draw Card
          </button>
          <button v-else class="btn btn-primary" @click="resetDeck">
            Shuffle Deck
          </button>
        </div>
      </div>
      <div class="col">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Running Count</h5>
            <p class="card-text">{{ runningCount }}</p>
            <h5 class="card-title">Cards Left</h5>
            <p class="card-text">{{ deck.length }}</p>
          </div>
        </div>
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">Played Cards</h5>
            <p class="card-text">
              <ul>
                <li v-for="card in playedCards" :key="card.code">
                  {{ card.value }} of {{ card.suit }}
                </li>
              </ul>
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawnCard: null,
      playedCards: [],
      deck: [],
      isDrawing: false,
      runningCount: 0
    };
  },
  computed: {
    ...mapGetters(["getShuffledDeck"]),
    drawnCardImage() {
      if (this.drawnCard) {
        return require(`@/assets/img/cards/${this.drawnCard.code}.png`);
      }
      return ""; // Return an empty string if no card is drawn
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

  },
};
</script>

<style>
.playing-card {
  width: 200px;
  height: 300px;
}
</style>
