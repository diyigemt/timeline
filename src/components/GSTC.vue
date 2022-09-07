<template>
  <div>
    <div class="toolbox">
      <button @click="updateFirstRow">Update first row</button>
      <button @click="changeZoomLevel">Change zoom level</button>
    </div>
    <div ref="gstcElement" class="gstc-wrapper"></div>
  </div>
</template>

<script>
import GSTC from "gantt-schedule-timeline-calendar/dist/gstc.wasm.esm.min.js";
import { Plugin as TimelinePointer } from "gantt-schedule-timeline-calendar/dist/plugins/timeline-pointer.esm.min.js";
import { Plugin as Selection } from "gantt-schedule-timeline-calendar/dist/plugins/selection.esm.min.js";
import { Plugin as ItemResizing } from "gantt-schedule-timeline-calendar/dist/plugins/item-resizing.esm.min.js";
import { Plugin as ItemMovement } from "gantt-schedule-timeline-calendar/dist/plugins/item-movement.esm.min.js";
import { Plugin as Bookmarks } from "gantt-schedule-timeline-calendar/dist/plugins/time-bookmarks.esm.min.js";
import { Plugin as CalendarScroll } from "gantt-schedule-timeline-calendar/dist/plugins/calendar-scroll.esm.min.js";
import { Plugin as DependencyLines } from "gantt-schedule-timeline-calendar/dist/plugins/dependency-lines.esm.min.js";
import "gantt-schedule-timeline-calendar/dist/style.css";
import { ref, onMounted, onBeforeUnmount } from "vue";

// helper functions

function generateRows() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Rows }
   */
  const rows = {};
  for (let i = 0; i < 10; i++) {
    const id = GSTC.api.GSTCID(i.toString());
    rows[id] = {
      id,
      label: `Row ${i}`,
    };
  }
  return rows;
}

function generateItems() {
  /**
   * @type { import("gantt-schedule-timeline-calendar").Items }
   */
  const items = {};
  for (let i = 0; i < 10; i++) {
    const m1 = Math.floor(Math.random() * 150);
    const m2 = Math.floor(Math.random() * 150) + 210;
    const start = GSTC.api.date().startOf("day");
    const id = GSTC.api.GSTCID(i.toString());
    const rowId = GSTC.api.GSTCID(Math.floor(Math.random() * 10).toString());
    items[id] = {
      id,
      label: `Item ${i}`,
      rowId,
      time: {
        start: start.second(m1).valueOf(),
        end: start.minute(0).second(m2).valueOf(),
      },
    };
  }
  return items;
}

// main component

export default {
  name: "GSTC",
  setup() {
    let gstc;
    let state;
    const gstcElement = ref(null);
    class ItemDragEndAction {
      constructor(element, data) {
        this.data = data;
        this.onDrag = this.onDrag.bind(this);
        element.addEventListener("mouseup", this.onDrag);
      }

      update(element, data) {
        this.data = data;
      }

      destroy(element) {
        element.removeEventListener("mouseup", this.onDrag);
      }

      onDrag() {
        console.log(`${this.data.item.id} is drop`);
      }
    }
    onMounted(() => {
      /**
       * @type { import("gantt-schedule-timeline-calendar").Config }
       */
      const config = {
        licenseKey:
          "====BEGIN LICENSE KEY====\nXOfH/lnVASM6et4Co473t9jPIvhmQ/l0X3Ewog30VudX6GVkOB0n3oDx42NtADJ8HjYrhfXKSNu5EMRb5KzCLvMt/pu7xugjbvpyI1glE7Ha6E5VZwRpb4AC8T1KBF67FKAgaI7YFeOtPFROSCKrW5la38jbE5fo+q2N6wAfEti8la2ie6/7U2V+SdJPqkm/mLY/JBHdvDHoUduwe4zgqBUYLTNUgX6aKdlhpZPuHfj2SMeB/tcTJfH48rN1mgGkNkAT9ovROwI7ReLrdlHrHmJ1UwZZnAfxAC3ftIjgTEHsd/f+JrjW6t+kL6Ef1tT1eQ2DPFLJlhluTD91AsZMUg==||U2FsdGVkX1/SWWqU9YmxtM0T6Nm5mClKwqTaoF9wgZd9rNw2xs4hnY8Ilv8DZtFyNt92xym3eB6WA605N5llLm0D68EQtU9ci1rTEDopZ1ODzcqtTVSoFEloNPFSfW6LTIC9+2LSVBeeHXoLEQiLYHWihHu10Xll3KsH9iBObDACDm1PT7IV4uWvNpNeuKJc\npY3C5SG+3sHRX1aeMnHlKLhaIsOdw2IexjvMqocVpfRpX4wnsabNA0VJ3k95zUPS3vTtSegeDhwbl6j+/FZcGk9i+gAy6LuetlKuARjPYn2LH5Be3Ah+ggSBPlxf3JW9rtWNdUoFByHTcFlhzlU9HnpnBUrgcVMhCQ7SAjN9h2NMGmCr10Rn4OE0WtelNqYVig7KmENaPvFT+k2I0cYZ4KWwxxsQNKbjEAxJxrzK4HkaczCvyQbzj4Ppxx/0q+Cns44OeyWcwYD/vSaJm4Kptwpr+L4y5BoSO/WeqhSUQQ85nvOhtE0pSH/ZXYo3pqjPdQRfNm6NFeBl2lwTmZUEuw==\n====END LICENSE KEY====",
        plugins: [
          TimelinePointer(),
          Selection(),
          ItemResizing(),
          ItemMovement(),
          Bookmarks(),
          CalendarScroll(),
          DependencyLines(),
        ],
        list: {
          columns: {
            data: {
              [GSTC.api.GSTCID("id")]: {
                id: GSTC.api.GSTCID("id"),
                width: 60,
                data: ({ row }) => GSTC.api.sourceID(row.id),
                header: {
                  content: "ID",
                },
              },
              [GSTC.api.GSTCID("label")]: {
                id: GSTC.api.GSTCID("label"),
                width: 200,
                data: "label",
                header: {
                  content: "Label",
                },
              },
            },
          },
          rows: generateRows(),
        },
        chart: {
          items: generateItems(),
          time: {
            from: GSTC.api.date().startOf("day").valueOf(),
            to: GSTC.api.date().startOf("day").minute(7).valueOf(),
            zoom: 10,
            calculatedZoomMode: true,
          },
          calendarLevels: [
            [
              {
                zoomTo: 200,
                period: "minute",
                periodIncrement: 1,
                main: true,
                format({ timeStart }) {
                  return timeStart.format("mm:ss");
                },
              },
            ],
            [
              {
                zoomTo: 6,
                period: "second",
                main: true,
                periodIncrement: 1,
                format({ timeStart }) {
                  return timeStart.format("s");
                },
              },
              {
                zoomTo: 200,
                period: "second",
                periodIncrement: 10,
                main: true,
                format({ timeStart }) {
                  return timeStart.format("ss");
                },
              },
            ],
          ],
        },
        actions: {
          "chart-timeline-items-row-item": [ItemDragEndAction],
        },
      };
      state = GSTC.api.stateFromConfig(config);
      globalThis.state = state;
      gstc = GSTC({
        element: gstcElement.value,
        state,
      });
      globalThis.gstc = gstc;
    });
    onBeforeUnmount(() => {
      if (gstc) gstc.destroy();
    });
    function updateFirstRow() {
      state.update(`config.list.rows.${GSTC.api.GSTCID("0")}`, (row) => {
        row.label = "Changed dynamically";
        return row;
      });
    }
    function changeZoomLevel() {
      state.update("config.chart.time.calculatedZoomMode", false);
      state.update("config.chart.time.zoom", 6);
    }
    return {
      gstcElement,
      updateFirstRow,
      changeZoomLevel,
    };
  },
};
</script>
<style scoped>
.gstc-component {
  margin: 0;
  padding: 0;
}
.toolbox {
  padding: 10px;
}
</style>
