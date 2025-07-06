
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '@/views/HomeView.vue';
import BlackJackView from '@/views/BlackJackView.vue';
import PokerView from '@/views/PokerView.vue';
import PinochleView from '@/views/PinochleView.vue';
import CribbageView from '@/views/CribbageView.vue';

const routes = [
  {
    path: '/',
    name: 'HomeView',
    component: HomeView,
  },
  {
    path: '/blackjack',
    name: 'BlackJackView',
    component: BlackJackView,
  },
  {
    path: '/poker',
    name: 'PokerView',
    component: PokerView,
  },
  {
    path: '/pinochle',
    name: 'PinochleView',
    component: PinochleView,
  },
  {
    path: '/cribbage',
    name: 'CribbageView',
    component: CribbageView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;


