import { createStore } from 'vuex'
import Cards from "@/data/cards.json"
import Pinochle from "@/data/pinochle.json"

export default createStore({
    state: {
        cards: Cards,
        pinochle: Pinochle,
        shuffledDeck: [],
        pinochleDeck: [],
    },
    mutations: {
        SHUFFLE_DECK(state) {
            const deck = [...state.cards];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            state.shuffledDeck = deck;
        },
        SHUFFLE_PINOCHLE(state) {
            const deck = [...state.pinochle];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            state.pinochleDeck = deck;
        }
    },
    actions: {
        shuffleDeck({ commit }) {
            commit('SHUFFLE_DECK')
        },
        shufflePinochle({ commit }) {
            commit('SHUFFLE_PINOCHLE')
        }
    },
    getters: {
        getUnshuffledDeck: (state) => {
            return state.cards
        },
        getShuffledDeck: (state) => {
            return state.shuffledDeck
        },
        getUnshuffledPinochle: (state) => {
            return state.pinochle
        },
        getPinochleDeck: (state) => {
            return state.pinochleDeck
        }

    }
})