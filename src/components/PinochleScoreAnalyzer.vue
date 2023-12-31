<template>
  <div class="pinochle-score-analyzer container">
    <h3>Hand Analysis</h3>
    <button class="btn btn-primary" @click="dealNewHand">Deal New Hand</button
    ><button class="btn btn-primary" @click="sortHand">Sort Hand</button>
    <button class="btn btn-primary" @click="scoreHand">Score Hand</button>

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

    <div class="form-group">
      <label for="trumpSuitSelect">Trump Suit:</label>
      <select class="form-control" id="trumpSuitSelect" v-model="trumpSuit">
        <option value="spades">Spades</option>
        <option value="hearts">Hearts</option>
        <option value="clubs">Clubs</option>
        <option value="diamonds">Diamonds</option>
      </select>
    </div>

    <div class="score">
      <p>Meld Points:</p>
      <pre>{{ meldScore }}</pre>
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
      trumpSuit: "",
      containsRun: false,
      containsDoubleRun: false,
      suitScore: {
        spades: 0,
        hearts: 0,
        diamonds: 0,
        clubs: 0,
      },
      meldScore: {
        pinochle: 0,
        doublePinochle: 0,
        acesAround: 0,
        doubleAcesAround: 0,
        kingsAround: 0,
        doubleKingsAround: 0,
        queensAround: 0,
        doubleQueensAround: 0,
        jacksAround: 0,
        doubleJacksAround: 0,
        commonMarriages: 0,
        royalMarriages: 0,
        dix: 0,
        run: 0,
        doubleRun: 0,
      },
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
    scoreHand() {
      // Method to score the hand
      // This method should call all of the other methods to look for the various melds
      // This method should also calculate the score for the hand
      this.lookForPinochles();
      this.lookForDoublePinochles();
      this.lookForAcesAround();
      this.lookForDoubleAcesAround();
      this.lookForKingsAround();
      this.lookForDoubleKingsAround();
      this.lookForQueensAround();
      this.lookForDoubleQueensAround();
      this.lookForJacksAround();
      this.lookForDoubleJacksAround();
      this.lookForCommonMarriages();
      if (this.trumpSuit !== "") {
        // If the trump suit is not set, then the hand is not scored beyond the universal melds
        this.lookForDix();
        this.lookForRun();
        this.lookForDoubleRun();
        this.lookForRoyalMarriages();
      }
    },
    drawnCardImage(code) {
      return require(`@/assets/img/cards/${code}.png`);
    },
    lookForCommonMarriages() {
      // Method to look for a marriage in the hand
      // A marriage is a King and Queen of the same suit
      // A marriage is worth 2 points
      let score = 0;
      const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
      suits.forEach((suit) => {
        const hasKing = this.hand.some(
          (card) => card.value === "King" && card.suit === suit
        );
        const hasQueen = this.hand.some(
          (card) => card.value === "Queen" && card.suit === suit
        );
        if (hasKing && hasQueen) {
          score += 2;
        }
      });
      this.meldScore.commonMarriages = score;
      return score;
    },
    lookForPinochles() {
      // Method to look for a pinochle in the hand
      // A pinochle is a Jack of Diamonds and a Queen of Spades
      // A pinochle is worth 4 points
      const hasJackOfDiamonds = this.hand.some(
        (card) => card.value === "Jack" && card.suit === "Diamonds"
      );
      const hasQueenOfSpades = this.hand.some(
        (card) => card.value === "Queen" && card.suit === "Spades"
      );
      this.meldScore.pinochle = hasJackOfDiamonds && hasQueenOfSpades ? 4 : 0;
      return hasJackOfDiamonds && hasQueenOfSpades ? 4 : 0;
    },
    lookForDoublePinochles() {
      // Method to look for a double pinochle in the hand
      // A double pinochle is two Jacks of Diamonds and two Queens of Spades
      // A double pinochle is worth 30 points
      const countJackOfDiamonds = this.hand.filter(
        (card) => card.value === "Jack" && card.suit === "Diamonds"
      ).length;
      const countQueenOfSpades = this.hand.filter(
        (card) => card.value === "Queen" && card.suit === "Spades"
      ).length;
      this.meldScore.doublePinochle =
        countJackOfDiamonds >= 2 && countQueenOfSpades >= 2 ? 30 : 0;
      return countJackOfDiamonds >= 2 && countQueenOfSpades >= 2 ? 30 : 0;
    },
    lookForAcesAround() {
      // Method to look for Aces Around in the hand
      // An Ace Around is an Ace of each suit
      // An Ace Around is worth 10 points
      const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
      const hasAllAces = suits.every((suit) =>
        this.hand.some((card) => card.value === "Ace" && card.suit === suit)
      );
      this.meldScore.acesAround = hasAllAces ? 10 : 0;
      return hasAllAces ? 10 : 0;
    },
    lookForKingsAround() {
      // Method to look for Kings Around in the hand
      // A King Around is a King of each suit
      // A King Around is worth 8 points
      const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
      const hasAllKings = suits.every((suit) =>
        this.hand.some((card) => card.value === "King" && card.suit === suit)
      );
      this.meldScore.kingsAround = hasAllKings ? 8 : 0;
      return hasAllKings ? 8 : 0;
    },
    lookForQueensAround() {
      // Method to look for Queens Around in the hand
      // A Queen Around is a Queen of each suit
      // A Queen Around is worth 6 points
      const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
      const hasAllQueens = suits.every((suit) =>
        this.hand.some((card) => card.value === "Queen" && card.suit === suit)
      );
      this.meldScore.queensAround = hasAllQueens ? 6 : 0;
      return hasAllQueens ? 6 : 0;
    },
    lookForJacksAround() {
      // Method to look for Jacks Around in the hand
      // A Jack Around is a Jack of each suit
      // A Jack Around is worth 4 points
      const suits = ["Spades", "Hearts", "Diamonds", "Clubs"];
      const hasAllJacks = suits.every((suit) =>
        this.hand.some((card) => card.value === "Jack" && card.suit === suit)
      );
      this.meldScore.jacksAround = hasAllJacks ? 4 : 0;
      return hasAllJacks ? 4 : 0;
    },
    lookForRoyalMarriages() {
      // Method to look for Trump Marriages in the hand
      // A Royal Marriage is a King and Queen of the trump suit
      // A Royal Marriage is worth 4 points
      // if one is found, and this.containsRun is false, then add 4 points to the score
      // if one is found, and this.containsRun is true, add 0 to the score
      // if two are found, and this.containsDoubleRun is false, then add 8 points to the score
      // if two are found, and this.containsDoubleRun is true, add 0 to the score
      let score = 0;
      const hasKing = this.hand.some(
        (card) => card.value === "King" && card.suit === this.trumpSuit
      );
      const hasQueen = this.hand.some(
        (card) => card.value === "Queen" && card.suit === this.trumpSuit
      );
      if (hasKing && hasQueen) {
        score = this.containsRun ? 0 : 4;
        score += this.containsDoubleRun ? 0 : 4; // If double run is not found, add points for each marriage
      }
      this.meldScore.royalMarriages = score;
      return score;
    },
    lookForDix() {
      // Method to look for a Dix in the hand
      // A Dix is the Nine of Trump
      // A Dix is worth 1 point
      this.meldScore.dix = this.hand.some(
        (card) => card.value === "9" && card.suit === this.trumpSuit
      )
        ? 1
        : 0;
      return this.hand.some(
        (card) => card.value === "9" && card.suit === this.trumpSuit
      )
        ? 1
        : 0;
    },
    lookForRun() {
      // Method to look for a Run in the hand
      // A Run is A-10-K-Q-J in the same suit
      // A Run is worth 15 points
      // if found set this.containsRun to true
      const runValues = ["Ace", "10", "King", "Queen", "Jack"];
      const hasRun = runValues.every((value) =>
        this.hand.some(
          (card) => card.value === value && card.suit === this.trumpSuit
        )
      );
      if (hasRun) {
        this.containsRun = true;
        this.meldScore.run = 15;
        return 15;
      }

      return 0;
    },
    lookForDoubleRun() {
      // Method to look for a Double Run in the hand
      // A Double Run is A-A-10-10-K-K-Q-Q-J-J in the same suit
      // A Double Run is worth 150 points
      // if found set this.containsDoubleRun to true
      const runValues = ["Ace", "10", "King", "Queen", "Jack"];
      const hasDoubleRun = runValues.every((value) => {
        const count = this.hand.filter(
          (card) => card.value === value && card.suit === this.trumpSuit
        ).length;
        return count >= 2;
      });
      if (hasDoubleRun) {
        this.containsDoubleRun = true;
        this.meldScore.doubleRun = 150;
        return 150;
      }
      return 0;
    },
    lookForDoubleAcesAround() {
      // Method to look for Double Aces Around in the hand
      // A Double Ace Around is two Aces of each suit
      // A Double Ace Around is worth 100 points
    },
    lookForDoubleKingsAround() {
      // Method to look for Double Kings Around in the hand
      // A Double King Around is two Kings of each suit
      // A Double King Around is worth 80 points
    },
    lookForDoubleQueensAround() {
      // Method to look for Double Queens Around in the hand
      // A Double Queen Around is two Queens of each suit
      // A Double Queen Around is worth 60 points
    },
    lookForDoubleJacksAround() {
      // Method to look for Double Jacks Around in the hand
      // A Double Jack Around is two Jacks of each suit
      // A Double Jack Around is worth 40 points
    },
  },
  created() {
    this.dealNewHand();
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
