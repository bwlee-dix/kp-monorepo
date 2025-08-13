<script setup lang="ts">
import { useGenericLine } from '/@vuero/data/dashboards/billboardjs-demo/genericLine'
import { useRegionLine } from '/@vuero/data/dashboards/billboardjs-demo/regionLine'
import { useAreaSimpleChart } from '/@vuero/data/dashboards/billboardjs-demo/areaSimple'
import { useAreaLineRangeChart } from '/@vuero/data/dashboards/billboardjs-demo/areaLineRange'
import { useBarSimple } from '/@vuero/data/dashboards/billboardjs-demo/barSimple'
import { useBarStacked } from '/@vuero/data/dashboards/billboardjs-demo/barStacked'
import { useStepSimpleChart } from '/@vuero/data/dashboards/billboardjs-demo/stepSimple'
import { useSplineSimple } from '/@vuero/data/dashboards/billboardjs-demo/splineSimple'
import { useBubbleSimple } from '/@vuero/data/dashboards/billboardjs-demo/bubbleSimple'
import { useScatterSimple } from '/@vuero/data/dashboards/billboardjs-demo/scatterSimple'
import { usePieSimple } from '/@vuero/data/dashboards/billboardjs-demo/pieSimple'
import { useDonutSimple } from '/@vuero/data/dashboards/billboardjs-demo/donutSimple'
import { useGaugeSimple } from '/@vuero/data/dashboards/billboardjs-demo/gaugeSimple'
import { useRadarSimple } from '/@vuero/data/dashboards/billboardjs-demo/radarSimple'

const genericLine = reactive(useGenericLine())
const regionLine = reactive(useRegionLine())
const areaSimple = reactive(useAreaSimpleChart())
const areaLineRange = reactive(useAreaLineRangeChart())
const barSimple = reactive(useBarSimple())
const barStacked = reactive(useBarStacked())
const stepSimple = reactive(useStepSimpleChart())
const splineSimple = reactive(useSplineSimple())
const bubbleSimple = reactive(useBubbleSimple())
const scatterSimple = reactive(useScatterSimple())
const pieSimple = reactive(usePieSimple())
const donutSimple = reactive(useDonutSimple())
const gaugeSimple = reactive(useGaugeSimple())
const radarSimple = reactive(useRadarSimple())
</script>

<template>
  <div class="columns is-multiline">
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="genericLine.options"
          @ready="genericLine.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS :options="regionLine.options" />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS :options="areaSimple.options" />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="areaLineRange.options"
          @ready="areaLineRange.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="barSimple.options"
          @ready="barSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="barStacked.options"
          @ready="barStacked.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS :options="stepSimple.options" />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS :options="splineSimple.options" />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="bubbleSimple.options"
          @ready="bubbleSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="scatterSimple.options"
          @ready="scatterSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="pieSimple.options"
          @ready="pieSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="donutSimple.options"
          @ready="donutSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS
          :options="gaugeSimple.options"
          @ready="gaugeSimple.onReady"
        />
      </div>
    </div>
    <div class="column is-6">
      <div class="s-card">
        <VBillboardJS :options="radarSimple.options" />
      </div>
    </div>
  </div>
</template>
