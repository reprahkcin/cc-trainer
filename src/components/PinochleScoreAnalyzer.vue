<template>
  <div class="pinochle-score-analyzer container">
    <h3>Hand Analysis</h3>
    <button class="btn btn-primary" @click="dealNewHand">Deal New Hand</button
    ><button class="btn btn-primary" @click="sortHand">Sort Hand</button>
    <div class="score">
      <p>Total Score: {{ calculateScore() }}</p>
      <!-- Additional analysis and breakdown can be displayed here -->
    </div>
    <!-- You can iterate over the hand and display each card with Bootstrap Icons -->
    <div class="row gap-0">
      <div
        class="col-1 px-1"
        v-for="(card, i) in isSorted ? sortedHand : hand"
        :key="i"
      >
        <img
          :src="drawnCardImage(card.code)"
          alt=""
          class="img-fluid rounded shadow"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PinochleScoreAnalyzer",

  data() {
    return {
      isSorted: false,
    };
  },
  computed: {
    ...mapGetters({
      orderedDeck: "getUnshuffledPinochle",
      shuffledDeck: "getPinochleDeck",
    }),
    // Computed properties for analyzing the hand
    unsortedHand() {
      const deck = this.shuffledDeck;
      const hand = [];
      for (let i = 0; i < 12; i++) {
        hand.push(deck.pop());
      }
      return hand;
    },
    sortedHand() {
      return [...this.hand].sort((a, b) => a.id - b.id);
    },
  },
  methods: {
    ...mapActions(["shufflePinochleDeck"]),
    hand() {
      return this.isSorted ? this.sortedHand : this.unsortedHand;
    },
    dealNewHand() {
      this.shufflePinochleDeck();
      this.isSorted = false;
    },
    // Methods for specific calculations
    calculateScore() {
      let score = 0;
      // Logic to calculate the score based on the hand
      // This might involve checking for specific combinations, sequences, etc.
      return score;
    },
    drawnCardImage(code) {
      return require(`@/assets/img/cards/${code}.png`);
    },
    // Method to sort the hand by suit and rank
    sortHand() {
      // Compare hand to the ordered deck to sort the hand
      this.sortedHand = [...this.hand].sort((a, b) => a.id - b.id);
      this.$nextTick(() => {
        this.isSorted = true;
      });
    },
  },
  created() {
    this.sortHand();
  },
};
</script>

<style scoped>
.playing-card {
  width: 100px;
  height: 150px;
  margin: 5px;
}
</style>
