<template>
  <div class="container">
    <div class="row">
      <div class="col">
        <PinochleScoreAnalyzer />
      </div>
    </div>
  </div>
</template>

<script>
import PinochleScoreAnalyzer from "@/components/PinochleScoreAnalyzer.vue";
export default {
  name: "PinochleView",

  data() {
    return {};
  },
  components: {
    PinochleScoreAnalyzer,
  },
};
</script>
