<template>
  <div class="container">
    <div class="row">
      <div class="col h-100">
        <router-view class="card my-3 p-3 h-100"></router-view>
      </div>
    </div>
  </div>
  <div class="container">
    <div class="row">
      <div class="col">
        <div class="card p-3">
          <div class="btn-group">
            <router-link to="/blackjack" class="btn btn-primary my-2">
              BlackJack
            </router-link>
            <router-link to="/poker" class="btn btn-primary my-2">
              Poker
            </router-link>
            <router-link to="/pinochle" class="btn btn-primary my-2">
              Pinochle
            </router-link>
            <router-link to="/cribbage" class="btn btn-primary my-2">
              Cribbage
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>
