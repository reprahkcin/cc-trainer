<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card p-0">
          <!-- Display card image here -->
          <img :src="drawnCardImage" alt="" class="playing-card" />
        </div>
        <button class="btn btn-primary" @click="drawAndDisplayCard">
          Draw Card
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "App",
  data() {
    return {
      drawnCard: null,
      playedCards: [],
      deck: [],
      isDrawing: false,
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
  },
  methods: {
    drawAndDisplayCard() {
      if (this.deck.length > 0 && !this.isDrawing) {
        this.isDrawing = true;
        // Draw a card from the deck
        const drawnIndex = Math.floor(Math.random() * this.deck.length);
        this.drawnCard = this.deck[drawnIndex];

        // Add the card to the playedCards array
        this.playedCards.push(this.drawnCard);

        // Remove the card from the deck
        this.deck.splice(drawnIndex, 1);

        // Reset the isDrawing flag
        this.isDrawing = false;
      } else {
        return;
      }
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
