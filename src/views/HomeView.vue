<template>
  <div class="home-container">
    <div class="container">
      <!-- Header Section -->
      <div class="row mb-5">
        <div class="col-12 text-center">
          <h1 class="display-4 fw-bold text-primary mb-3">
            <i class="bi bi-card-text me-3"></i>
            Card Game Memory Trainer
          </h1>
          <p class="lead text-muted">
            Master your card game skills with interactive training tools
          </p>
        </div>
      </div>

      <!-- Game Cards Section -->
      <div class="row g-4">
        <!-- Blackjack Card -->
        <div class="col-lg-6 col-xl-3">
          <div class="card game-card h-100 shadow-sm border-0">
            <div class="card-body text-center p-4">
              <div class="game-icon mb-3">
                <i class="bi bi-1-circle-fill text-success display-4"></i>
              </div>
              <h3 class="card-title h5 fw-bold mb-3">Blackjack</h3>
              <p class="card-text text-muted mb-4">
                Practice the Hi-Lo card counting system with interactive drills
              </p>
              <router-link to="/blackjack" class="btn btn-success btn-lg w-100">
                <i class="bi bi-play-circle me-2"></i>
                Start Training
              </router-link>
            </div>
          </div>
        </div>

        <!-- Pinochle Card -->
        <div class="col-lg-6 col-xl-3">
          <div class="card game-card h-100 shadow-sm border-0">
            <div class="card-body text-center p-4">
              <div class="game-icon mb-3">
                <i class="bi bi-2-circle-fill text-warning display-4"></i>
              </div>
              <h3 class="card-title h5 fw-bold mb-3">Pinochle</h3>
              <p class="card-text text-muted mb-4">
                Analyze hands and practice meld recognition
              </p>
              <router-link to="/pinochle" class="btn btn-warning btn-lg w-100">
                <i class="bi bi-play-circle me-2"></i>
                Start Training
              </router-link>
            </div>
          </div>
        </div>

        <!-- Poker Card -->
        <div class="col-lg-6 col-xl-3">
          <div class="card game-card h-100 shadow-sm border-0">
            <div class="card-body text-center p-4">
              <div class="game-icon mb-3">
                <i class="bi bi-3-circle-fill text-info display-4"></i>
              </div>
              <h3 class="card-title h5 fw-bold mb-3">Poker</h3>
              <p class="card-text text-muted mb-4">
                Hand evaluation and probability training
              </p>
              <router-link to="/poker" class="btn btn-info btn-lg w-100">
                <i class="bi bi-play-circle me-2"></i>
                Start Training
              </router-link>
            </div>
          </div>
        </div>

        <!-- Cribbage Card -->
        <div class="col-lg-6 col-xl-3">
          <div class="card game-card h-100 shadow-sm border-0">
            <div class="card-body text-center p-4">
              <div class="game-icon mb-3">
                <i class="bi bi-4-circle-fill text-danger display-4"></i>
              </div>
              <h3 class="card-title h5 fw-bold mb-3">Cribbage</h3>
              <p class="card-text text-muted mb-4">
                Hand selection and scoring optimization
              </p>
              <router-link to="/cribbage" class="btn btn-danger btn-lg w-100">
                <i class="bi bi-play-circle me-2"></i>
                Start Training
              </router-link>
            </div>
          </div>
        </div>
      </div>

      <!-- Footer Section -->
      <div class="row mt-5">
        <div class="col-12 text-center">
          <div class="card bg-light border-0">
            <div class="card-body py-4">
              <h5 class="card-title mb-3">
                <i class="bi bi-lightbulb me-2"></i>
                Training Tips
              </h5>
              <p class="card-text text-muted mb-0">
                Start with Blackjack card counting to build your foundation.
                Practice regularly for best results!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>

<style scoped>
.home-container {
  min-height: 100vh;
  padding: 2rem 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.game-card {
  transition: all 0.3s ease;
  border-radius: 15px;
  overflow: hidden;
}

.game-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15) !important;
}

.game-icon {
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.card {
  border-radius: 15px;
}

.btn {
  border-radius: 10px;
  font-weight: 600;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.display-4 {
  font-size: 2.5rem;
}

@media (max-width: 768px) {
  .home-container {
    padding: 1rem 0;
  }

  .display-4 {
    font-size: 2rem;
  }
}
</style>
