<template>
  <h1>Hello World</h1>
  <TimeLine>
    <div
      v-for="(e, index) in timeLen * 60"
      :key="e * index"
      class="time-item second-item"
      :style="{ '--base-width': baseWidth }"
    >
      {{ e }}
    </div>
  </TimeLine>
</template>

<script setup lang="ts">
const timeLen = 7; // 7分钟
const baseWidth = "30px"; // 默认大小30个像素
</script>

<style lang="scss" scoped>
.time-item {
  display: inline-block;
  height: 200px;
  min-width: var(--base-width);
  background-color: #00000030;
}
</style>
