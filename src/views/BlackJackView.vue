<template>
<div class="container">
    <div class="row">
      <div class="col">
        <div class="card d-inline-block w-100 text-center mb-3">
          <div v-if="!drawnCardImage" class="playing-card">
            <div class="playing-card rounded my-3 shadow text-center">
              
                <p>Draw a Card</p>
              
            </div>
          </div>
          <img v-else :src="drawnCardImage" alt="" class="playing-card rounded my-3 shadow" />
        </div>
        <div class="btn-group w-100">
          <button
            :disabled="deck.length <= 0 ? true : false"
            class="btn btn-primary"
            @click="drawAndDisplayCard"
          >
            Draw Card
          </button>
          <button class="btn btn-primary" @click="resetDeck">
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
                  {{ card.value }} of <span :class="suitIcon(card.suit)"></span>
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
  name: "BlackJackView",
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
        if(this.deck.length === 0 || this.deck.length === 52){
          return require('@/assets/img/cards/draw.png');
        } else{
          return require(`@/assets/img/cards/${this.drawnCard.code}.png`);
        } 
      }
      return require('@/assets/img/cards/draw.png'); 
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
      }

  },
};
</script>

<style>
.playing-card {
  width: 200px;
  height: 300px;
  background-color: grey ;
}
.centered-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>