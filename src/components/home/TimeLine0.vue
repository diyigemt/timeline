<template>
  <div style="width: 100%; height: 90vh" :style="{ cursor: domCursor }">
    <div>{{ edit ? "移动模式" : "编辑模式" }}</div>
    <div ref="outer" class="outer">
      <div ref="container" class="container" :style="containerStyle">
        <slot />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onBeforeRouteLeave } from "vue-router";
import { Ref, useSlots } from "vue";
import { throttle } from "lodash-es";
import { TimeLineIData } from "@/interface";
import { TimeLineProps } from "@/types";
import { extraDomBounding } from "@/utils";

const props = withDefaults(defineProps<TimeLineProps>(), {
  period: "second",
  periodIncrement: (prop: TimeLineProps) => {
    if (prop.period === "millisecond") return 100;
    return 1;
  },
  scale: 30,
  // @ts-ignore
  total: (prop: TimeLineProps) => {
    let returnValue = 5;
    // eslint-disable-next-line default-case
    switch (prop.period) {
      case "millisecond": {
        returnValue = 5 * 1000;
        break;
      }
      case "second": {
        returnValue = 60;
        break;
      }
      case "minute": {
        returnValue = 5;
        break;
      }
    }
    return returnValue;
  },
});
const outer = ref<HTMLElement>() as Ref<HTMLElement>;
const container = ref<HTMLElement>() as Ref<HTMLElement>;
const outerStyle = reactive({
  width: 0,
  height: 0,
});
const data = reactive<TimeLineIData>({
  edit: false,
  startGrab: false,
  offset: 0,
});
const saveMousePos = {
  x: 0,
  y: 0,
};
const domCursor = computed(() => {
  return data.edit && data.startGrab ? "grabbing" : "default";
});
const containerStyle = computed(() => {
  let cursor = "default";
  if (data.edit) {
    cursor = "grab";
    if (data.startGrab) {
      cursor = "grabbing";
    }
  }
  const itemWidth = Math.floor(outerStyle.width / props.scale);
  return {
    cursor,
    width: `${Math.floor(props.total / props.periodIncrement) * itemWidth}px`,
    transform: `translateX(-${data.offset}px)`,
  };
});
function switchEditMode(event: KeyboardEvent) {
  if (event.key.toLowerCase() === "e") {
    data.edit = !data.edit;
  }
}
function startGrab(event: MouseEvent) {
  // 左键被按下 开始拖动
  if (event.button === 0) {
    data.startGrab = true;
    saveMousePos.x = event.clientX;
    saveMousePos.y = event.clientY;
  }
}
function endGrab() {
  data.startGrab = false;
}
function grabbing(event: MouseEvent) {
  if (data.edit && data.startGrab) {
    const cur = saveMousePos.x - event.clientX;
    data.offset = Math.max(0, Math.min(data.offset + cur, Number(containerStyle.value.width.replace("px", "")) - 100));
    saveMousePos.x = event.clientX;
    saveMousePos.y = event.clientY;
  }
}
const grabbingThrottle = throttle(grabbing, 30);
function scrollHorizon(event: WheelEvent) {
  if (!data.edit) {
    return;
  }
  data.offset = Math.max(
    0,
    Math.min(
      data.offset + (event.deltaY / Math.abs(event.deltaY)) * 100,
      Number(containerStyle.value.width.replace("px", "")) - 100,
    ),
  );
}
function updateItemWidth() {
  console.log(1);
}
onMounted(() => {
  document.addEventListener("keypress", switchEditMode);
  container.value.addEventListener("mousedown", startGrab);
  outer.value.addEventListener("wheel", scrollHorizon);
  document.addEventListener("mouseup", endGrab);
  document.addEventListener("mousemove", grabbingThrottle);
  const { width, height } = extraDomBounding(outer.value);
  outerStyle.width = width;
  outerStyle.height = height;
  updateItemWidth();
});
onBeforeRouteLeave((_, __, next) => {
  document.removeEventListener("keypress", switchEditMode);
  container.value.removeEventListener("mousedown", startGrab);
  outer.value.removeEventListener("wheel", scrollHorizon);
  document.removeEventListener("mouseup", endGrab);
  document.removeEventListener("mousemove", grabbingThrottle);
  next();
});
const { edit } = toRefs(data);
</script>

<style lang="scss" scoped>
.outer {
  width: 100%;
  overflow: hidden;
  .container {
    display: flex;
    flex-direction: row;
    user-select: none;
  }
}
</style>
