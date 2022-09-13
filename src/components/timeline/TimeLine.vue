<template>
  <div class="main-container">
    <div class="left">
      <h1 class="timeline-header">这是固定的表头</h1>
    </div>
    <div class="right">
      <div class="timeline-header timeline-time">
        <div class="timeline-time-item time-second">
          <TimeLineSecond v-for="(e, index) in time" :key="e + index" :width="50" :now="e - 1" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const time = 60;
</script>

<style lang="scss" scoped>
$left-width: 200px;
$left-margin-right: 20px;
.left {
  $width: $left-width;
  margin-right: $left-margin-right;
  width: $left-width;
  min-width: $left-width;
}
.right {
  width: calc(100% - #{$left-width + $left-margin-right});
}
.timeline-header {
  $header-font-size: 18px;
  $height: 40px;
  height: $height;
  line-height: $height;
  font-size: $header-font-size;
}
.timeline-time {
  overflow: hidden;
  .timeline-time-item {
    height: 100%;
  }
  .timeline-time-item {
    width: 3000px;
  }
}
.main-container {
  width: 100%;
  display: flex;
}
</style>
