<template>
  <p>
    <el-checkbox
      label="Add India State Boundary"
      v-model="indiaStateBoundary"
      @click="addIndiaStateBoundary"
    />
  </p>

  <!-- <div>
    <div>
      <el-select v-model="selectedState" placeholder="Select" size="large" style="width: 240px">
        <el-option v-for="item in statesName" :key="item" :label="item" :value="item" />
      </el-select>
      <p><el-button type="primary" @click="getSelectedState">Filter Selected State</el-button></p>

      {{ selectedState }}
    </div>
  </div> -->
  <div id="mapRef"></div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { ElMessage } from 'element-plus'

const map = ref(null)
const indiaStateBoundary = ref(false)
const selectedState = ref('')

const statesName = ['SIKKIIM', 'MANIPUR', 'KERALA', 'WEST BENGAL']

const isLayerLoading = ref(false)

// Access the environment variable
const mbAccessToken = import.meta.env.VITE_MAPBOX_API_KEY

// Get selected state and filter layer
const getSelectedState = () => {
  if (selectedState.value) {
    ElMessage.info(`Selected State: ${selectedState.value}`)

    // Query the features from the 'my-layer' layer
    const features = map.value.queryRenderedFeatures({ layers: ['my-layer'] })

    console.log('FEature', features)

    // Filter features based on the selected state's name
    const selectedStateFeature = features.filter(
      (feature) => feature.properties.STATE === selectedState.value,
    )

    console.log('S S F', selectedStateFeature)

    if (selectedStateFeature.length > 0) {
      // Highlight the selected state by setting a feature state
      selectedStateFeature.forEach((feature) => {
        map.value.setFeatureState(
          { source: 'india_states-1p7tlu', sourceLayer: 'india_states-1p7tlu', id: feature.id },
          { highlighted: true },
        )
      })

      // Optionally, change the fill color of the layer for highlighted states
      map.value.setPaintProperty('my-layer', 'fill-color', [
        'case',
        ['boolean', ['feature-state', 'highlighted'], false],
        'yellow',
        'red', // Yellow for highlighted, red for others
      ])
    }
  } else {
    ElMessage.info('Please select a state')
  }
}

const addIndiaStateBoundary = () => {
  if (!indiaStateBoundary.value) {
    ElMessage.info('Zoom In to see the Layer')

    // Add source from your tileset
    map.value.addSource('india_states-1p7tlu', {
      type: 'vector',
      url: 'mapbox://hasem08.cgor9wry',
    })

    map.value.addLayer({
      id: 'my-layer',
      type: 'fill',
      source: 'india_states-1p7tlu',
      'source-layer': 'india_states-1p7tlu',
      paint: {
        'fill-color': 'red',
        'fill-opacity': 0.1,
        'line-width': 2,
        'line-color': 'green',
        'line-dasharray': [2, 4], // Optional: dashed border
      },
    })
  } else {
    ElMessage.info('not adding state')
  }
}

const initMap = () => {
  mapboxgl.accessToken = mbAccessToken
  map.value = new mapboxgl.Map({
    container: 'mapRef', // Make sure this matches your HTML id
    center: [82, 23],
    zoom: 3,
  })
}

onMounted(() => {
  initMap()
})
</script>

<style scoped>
#mapRef {
  margin-left: 25%;
  height: 400px;
  width: 500px;
}

p {
  margin-left: 25%;
}
</style>
