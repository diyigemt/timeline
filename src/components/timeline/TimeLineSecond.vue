<template>
  <div class="second-container" :style="style">
    <div class="side">
      <span v-for="(e, index) in millisecond" :key="e + index" class="second-millisecond" />
    </div>
    <div class="time">{{ time }}</div>
  </div>
</template>

<script lang="ts" setup>
import { nowSecond } from "@/utils/time";

const props = defineProps<{
  now: number;
  width: number;
}>();
const millisecond = computed(() => {
  let m = 10;
  if (props.width <= 50) {
    m = 5;
  }
  if (props.width < 20) {
    m = 2;
  }
  return m;
});
const style = computed<Partial<CSSStyleDeclaration>>(() => {
  return {
    width: `${props.width}px`,
    maxWidth: `${props.width}px`,
  };
});
const time = computed(() => nowSecond(props.now));
</script>

<style lang="scss" scoped>
$border-size: 2px;
.second-container {
  width: 100%;
  height: 100%;
  position: relative;
  display: inline-block;
  .time {
    $font-size: 16px;
    width: 100%;
    height: $font-size;
    line-height: $font-size;
    position: absolute;
    text-align: center;
    transform: translateX($border-size);
    top: 0;
    font-size: 14px;
  }
  .side {
    width: 100%;
    height: 100%;
    display: flex;
    .second-millisecond {
      flex: 1;
      height: 100%;
      position: relative;
      &:before {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        height: 25%;
        border-left: $border-size solid black;
      }
      &:first-child:before {
        height: 50%;
      }
    }
  }
}
</style>
