<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card">
          <!-- Use v-if to ensure the image is only attempted to be loaded when drawnCard exists -->
          <img v-if="drawnCard" :src="drawnCardImage" alt="Drawn Card" />
          <!-- Display the image URL for debugging or additional information -->
          <div v-if="drawnCard">{{ drawnCard.imageURL }}</div>
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
    };
  },
  computed: {
    ...mapGetters(["getShuffledDeck"]),
    drawnCardImage() {
      // Check if drawnCard exists and has an imageURL
      if (this.drawnCard && this.drawnCard.imageURL) {
        // Use require to resolve the path to the actual image in the assets folder
        return require("@/assets/" + this.drawnCard.imageURL); // Adjust the path based on your project structure
      }
      return null; // Return null or a placeholder image if no card is drawn
    },
  },
  created() {
    this.deck = this.getShuffledDeck;
  },
  methods: {
    drawAndDisplayCard() {
      if (this.deck.length > 0) {
        this.drawnCard = this.deck.pop();
        this.playedCards.push(this.drawnCard);
      }
    },
  },
};
</script>
