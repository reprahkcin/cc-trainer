<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <PinochleScoreAnalyzer :hand="hand" />
      </div>
    </div>
    <div class="row">
      <div class="col text-center">
        <button class="btn btn-primary mt-3" @click="shuffleDeck">
          Deal New Hand
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import PinochleScoreAnalyzer from "@/components/PinochleScoreAnalyzer.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "PinochleView",

  data() {
    return {};
  },
  components: {
    PinochleScoreAnalyzer,
  },
  computed: {
    ...mapGetters(["getShuffledDeck"]),
    hand() {
      const deck = this.getShuffledDeck;
      const hand = [];
      for (let i = 0; i < 12; i++) {
        hand.push(deck.pop());
      }
      return hand;
    },
  },
  methods: {
    ...mapActions(["shuffleDeck"]),
  },
};
</script>
