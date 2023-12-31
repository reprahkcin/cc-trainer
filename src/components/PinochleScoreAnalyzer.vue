<template>
  <div class="pinochle-score-analyzer container">
    <h3>Hand Analysis</h3>
    <button class="btn btn-primary" @click="dealNewHand">Deal New Hand</button
    ><button class="btn btn-primary" @click="sortHand">Sort Hand</button>

    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        id="ascendingToggle"
        v-model="ascending"
      />
      <label class="form-check-label" for="ascendingToggle">{{
        ascending ? "Ascending" : "Descending"
      }}</label>
    </div>

    <div class="score">
      <p>Meld Points:</p>
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
      isSorting: false,
      hand: [],
      sortedHand: [],
      ascending: true,
    };
  },
  computed: {
    ...mapGetters({
      shuffledDeck: "getShuffledPinochleDeck",
    }),
  },
  methods: {
    ...mapActions(["shufflePinochleDeck"]),
    dealNewHand() {
      // This is the hand as it was dealt, shuffled but not sorted
      this.shufflePinochleDeck(); // Shuffle the deck
      this.isSorted = false; // Reset the sorted flag
      this.hand = []; // Clear the hand
      this.sortedHand = []; // Clear the sorted hand
      const deck = this.shuffledDeck;
      const hand = [];
      for (let i = 0; i < 12; i++) {
        hand.push(deck.pop());
      }
      this.hand = hand;
    },
    sortHand() {
      if (this.ascending) {
        this.sortedHand = this.hand.sort((a, b) => a.id - b.id);
      } else {
        this.sortedHand = this.hand.sort((a, b) => b.id - a.id);
      }
      this.$nextTick(() => {
        this.isSorted = true;
      });
    },
    drawnCardImage(code) {
      return require(`@/assets/img/cards/${code}.png`);
    },
    // Method to sort the hand by suit and rank
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
