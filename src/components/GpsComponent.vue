<template>
  <div class="gps-component">
    <ion-card>
      <ion-card-header>
        <ion-card-title>📍 GPS / Ubicación</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <!-- Botones de acción -->
        <div class="button-group">
          <ion-button 
            @click="handleGetCurrentLocation"
            :disabled="gpsStore.isWatching"
            expand="block"
            color="primary"
            class="action-button"
          >
            <ion-icon :icon="locate" slot="start"></ion-icon>
            Obtener Ubicación Actual
          </ion-button>

          <ion-button 
            @click="handleWatchPosition"
            :disabled="gpsStore.isWatching"
            expand="block"
            color="success"
            class="action-button"
          >
            <ion-icon :icon="navigate" slot="start"></ion-icon>
            Monitorear Ubicación
          </ion-button>

          <ion-button 
            v-if="gpsStore.isWatching"
            @click="handleStopWatching"
            expand="block"
            color="danger"
            class="action-button"
          >
            <ion-icon :icon="power" slot="start"></ion-icon>
            Detener Monitoreo
          </ion-button>
        </div>

        <!-- Información de ubicación -->
        <div v-if="gpsStore.location" class="location-info">
          <ion-list>
            <ion-item>
              <ion-label>
                <p class="label">Latitud</p>
                <h2>{{ gpsStore.location.latitude.toFixed(6) }}</h2>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <p class="label">Longitud</p>
                <h2>{{ gpsStore.location.longitude.toFixed(6) }}</h2>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <p class="label">Precisión (metros)</p>
                <h2>{{ Math.round(gpsStore.location.accuracy) }}m</h2>
              </ion-label>
            </ion-item>

            <ion-item v-if="gpsStore.location.altitude">
              <ion-label>
                <p class="label">Altitud</p>
                <h2>{{ gpsStore.location.altitude.toFixed(2) }}m</h2>
              </ion-label>
            </ion-item>

            <ion-item v-if="gpsStore.location.speed">
              <ion-label>
                <p class="label">Velocidad</p>
                <h2>{{ (gpsStore.location.speed * 3.6).toFixed(2) }} km/h</h2>
              </ion-label>
            </ion-item>

            <ion-item>
              <ion-label>
                <p class="label">Hora</p>
                <h2>{{ new Date(gpsStore.location.timestamp).toLocaleTimeString() }}</h2>
              </ion-label>
            </ion-item>
          </ion-list>

          <!-- Enlace a Google Maps -->
          <div class="maps-link">
            <ion-button 
              :href="gpsStore.getMapsUrl()"
              target="_blank"
              expand="block"
              fill="outline"
            >
              <ion-icon :icon="map" slot="start"></ion-icon>
              Ver en Google Maps
            </ion-button>
          </div>
        </div>

        <!-- Mensaje de error -->
        <ion-item v-if="gpsStore.error" color="danger">
          <ion-label>
            <ion-icon :icon="alertCircle"></ion-icon>
            {{ gpsStore.error }}
          </ion-label>
        </ion-item>

        <!-- Estado de monitoreo -->
        <div v-if="gpsStore.isWatching" class="monitoring-status">
          <ion-spinner name="crescent" color="success"></ion-spinner>
          <p>Monitoreando ubicación en tiempo real...</p>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount } from 'vue';
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonSpinner,
} from '@ionic/vue';
import {
  locate,
  navigate,
  power,
  map,
  alertCircle,
} from 'ionicons/icons';
import { useGpsStore } from '../stores/gps';

const gpsStore = useGpsStore();

const handleGetCurrentLocation = async () => {
  await gpsStore.getCurrentLocation();
};

const handleWatchPosition = async () => {
  await gpsStore.watchPosition();
};

const handleStopWatching = async () => {
  await gpsStore.stopWatching();
};

// Limpiar monitoreo al desmontar el componente
onBeforeUnmount(() => {
  if (gpsStore.isWatching) {
    gpsStore.stopWatching();
  }
});
</script>

<style scoped>
.gps-component {
  padding: 10px;
}

.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 15px;
}

.action-button {
  margin: 0;
}

.location-info {
  margin-top: 20px;
}

.label {
  color: var(--ion-color-medium);
  font-size: 0.8rem;
  margin: 0;
}

.maps-link {
  margin-top: 15px;
}

.monitoring-status {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 15px;
  border-radius: 8px;
  background: var(--ion-color-success-tint);
  margin-top: 15px;
}

.monitoring-status p {
  margin: 0;
  color: var(--ion-color-success);
  font-weight: 500;
}
</style>
