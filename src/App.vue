<template>
  <!-- Navigation Header -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
    <div class="container">
      <router-link class="navbar-brand fw-bold" to="/">
        <i class="bi bi-card-text me-2"></i>
        Card Trainer
      </router-link>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="bi bi-house me-1"></i>
              Home
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/blackjack">
              <i class="bi bi-1-circle me-1"></i>
              Blackjack
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/pinochle">
              <i class="bi bi-2-circle me-1"></i>
              Pinochle
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/poker">
              <i class="bi bi-3-circle me-1"></i>
              Poker
            </router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/cribbage">
              <i class="bi bi-4-circle me-1"></i>
              Cribbage
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <!-- Main Content -->
  <main>
    <router-view></router-view>
  </main>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
};
</script>
