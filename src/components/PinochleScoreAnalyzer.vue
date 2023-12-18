<template>
  <div class="pinochle-score-analyzer container">
    <h3>Hand Analysis</h3>
    <div class="score">
      <p>Total Score: {{ calculateScore() }}</p>
      <!-- Additional analysis and breakdown can be displayed here -->
    </div>
    <!-- You can iterate over the hand and display each card with Bootstrap Icons -->
    <div class="row">
      <div class="col-1" v-for="card in hand" :key="card.code">
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
export default {
  name: "PinochleScoreAnalyzer",
  props: {
    hand: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      // You can define additional data properties if needed
    };
  },
  computed: {
    // Computed properties for analyzing the hand
  },
  methods: {
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
