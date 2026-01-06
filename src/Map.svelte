<script>
  import { onMount, onDestroy } from "svelte";
  import { nonpassive } from "svelte/legacy";

  // Properties
  export let center = [40.71955, -74.03457]; // Default to Jersey City Lat, Lng
  export let zoom = 14;
  export let width = "100%";
  export let height = "400px";
  export let markers = [];

  // Customization props
  export let tileProvider = "cartoDB"; // 'osm', 'cartoDB', 'stamen', etc.
  export let theme = "light"; // 'light', 'dark', 'satellite'
  // export let markerColor = "blue"; // Custom marker color
  export let showZoomControl = true;
  export let showScale = true;
  export let minZoom = 10;
  export let maxZoom = 18;
  export let celebrationIcon = "../../photos/celebration_icon.svg";
  export let hotelIcon = "../../photos/hotel_icon.svg";
  export let locationIcon = "../../photos/location_icon.svg";

  let mapElement;
  let map;
  let markerLayer;

  // Tile layer URLs for different providers and themes
  const tileUrls = {
    osm: {
      light: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
      satellite:
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    },
    cartoDB: {
      light: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
      dark: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}.png",
    },
    stamen: {
      light: "https://stamen-tiles.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.png",
      dark: "https://stamen-tiles.a.ssl.fastly.net/toner/{z}/{x}/{y}.png",
      terrain: "https://stamen-tiles.a.ssl.fastly.net/terrain/{z}/{x}/{y}.jpg",
    },
  };

  // Attribution text for different providers
  const attributions = {
    osm: "© OpenStreetMap contributors",
    cartoDB: "© OpenStreetMap contributors, © CARTO",
    stamen: "Map tiles by Stamen Design, under CC BY 3.0",
  };

  function initMap() {
    // Initialize the map
    map = L.map(mapElement, {
      center,
      zoom,
      zoomControl: showZoomControl,
      minZoom,
      maxZoom,
    });

    // Add scale if enabled
    if (showScale) {
      L.control.scale().addTo(map);
    }

    // Add tile layer based on provider and theme
    updateTileLayer();

    // Create a layer group for markers
    markerLayer = L.layerGroup().addTo(map);

    // Add initial markers
    updateMarkers();
  }

  function updateTileLayer() {
    if (!map) return;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Add new tile layers
    const url = tileUrls[tileProvider]?.[theme] || tileUrls.osm.light;
    L.tileLayer(url, {
      attribution: attributions[tileProvider] || attributions.osm,
    }).addTo(map);
  }

  function createCustomIcon(type) {
    let customIcon;
    if (type === "Event Location") {
      customIcon = celebrationIcon;
    } else if (type === "Hotel") {
      customIcon = hotelIcon;
    } else {
      customIcon = locationIcon;
    }
    return L.icon({
      iconUrl: customIcon,
      iconSize: [25, 41],
      // iconAnchor: [12, 41],
      popupAnchor: [1, -10],
    });
  }

  function updateMarkers() {
    if (!markerLayer) return;

    // Clear existing markers
    markerLayer.clearLayers();

    // Add new markers
    markers.forEach((marker) => {
      const icon = createCustomIcon(marker.type);
      const leafletMarker = L.marker(
        [marker.position.lat, marker.position.lng],
        { icon }
      )
        .bindPopup(
          `
          <div class="marker-popup">
            <h3>${marker.name || ""}</h3>
            <p class="detail">${marker.type || ""}</p>
            <p class="detail">${marker.address || ""}</p>
            <a href="${marker.website}" class="detail">Website</a>
            <br>
            <a href="${marker.directions}" class="detail">Directions </a>
          </div>
        `
        )
        .bindTooltip(marker.name, {
          permanent: true,
          direction: "bottom",
          className: "marker-label",
          offset: [0, 5],
        });

      markerLayer.addLayer(leafletMarker);
    });

    // Fit bounds if we have markers
    if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      map.fitBounds(bounds);
    }
  }

  onMount(() => {
    // Add Leaflet CSS
    const linkEl = document.createElement("link");
    linkEl.rel = "stylesheet";
    linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css";
    document.head.appendChild(linkEl);

    // Add Leaflet JS
    const scriptEl = document.createElement("script");
    scriptEl.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js";
    scriptEl.onload = initMap;
    document.head.appendChild(scriptEl);
  });

  // Clean up when component is destroyed
  onDestroy(() => {
    if (map) {
      map.remove();
    }
  });

  // Watch for changes
  $: if (map && (tileProvider || theme)) {
    updateTileLayer();
  }

  $: if (markerLayer && markers) {
    updateMarkers();
  }
</script>

<div
  bind:this={mapElement}
  style="width: {width}; height: {height};"
  class="maps-container"
></div>

<style>
  .maps-container {
    position: relative;
    background-color: #f5f5f5;
  }

  :global(.marker-popup h3) {
    margin: 0 0 8px 0;
    font-size: 16px;
    font-weight: bold;
  }

  :global(.marker-popup p) {
    margin: 0 0 8px 0;
  }

  :global(.marker-popup img) {
    max-width: 100%;
    height: auto;
    margin-top: 8px;
  }

  :global(.marker-label) {
    background: none;
    border: none;
    box-shadow: none;
    font-weight: bold;
    font-size: 12px;
    text-align: center;
    text-shadow: 
      -1px -1px 0 #fff,
      1px -1px 0 #fff,
      -1px 1px 0 #fff,
      1px 1px 0 #fff;
  }
  
  :global(.leaflet-tooltip-bottom:before) {
    display: none;
  }
</style>
