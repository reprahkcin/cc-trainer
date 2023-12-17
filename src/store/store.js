import { createStore } from 'vuex'
import Cards from "@/data/cards.json"

export default createStore({
    state: {
        cards: Cards,
        shuffledDeck: []
    },
    mutations: {
        SHUFFLE_DECK(state) {
            const deck = [...state.cards];
            for (let i = deck.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [deck[i], deck[j]] = [deck[j], deck[i]];
            }
            state.shuffledDeck = deck;
        }
    },
    actions: {
        shuffleDeck({ commit }) {
            commit('SHUFFLE_DECK')
        }
    },
    getters: {
    
        getUnshuffledDeck: (state) => {
            return state.cards
        },
        getShuffledDeck: (state) => {
            return state.shuffledDeck
        }
    }
})