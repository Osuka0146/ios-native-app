<template>
  <div class="device-hardware-page">
    <!-- Título principal -->
    <h1 style="text-align: center; margin-bottom: 20px;">🖥️ Hardware del Dispositivo</h1>

    <!-- GPS Component -->
    <GpsComponent />

    <!-- Camera Component -->
    <CameraComponent />

    <!-- Info Card -->
    <ion-card color="primary">
      <ion-card-header>
        <ion-card-title>ℹ️ Información</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <p>
          Esta aplicación utiliza el hardware del dispositivo para acceder a:
        </p>
        <ul>
          <li><strong>GPS (Geolocalización):</strong> Obtén tu ubicación actual o monitorea tu posición en tiempo real</li>
          <li><strong>Cámara:</strong> Captura fotos o selecciona imágenes de tu galería</li>
        </ul>
        <p style="font-size: 0.85rem; color: var(--ion-color-medium);">
          Requiere permisos de ubicación y cámara en tu dispositivo
        </p>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/vue';
import GpsComponent from '../components/GpsComponent.vue';
import CameraComponent from '../components/CameraComponent.vue';
</script>

<style scoped>
.device-hardware-page {
  padding-top: 10px;
}

ul {
  margin: 10px 0;
  padding-left: 20px;
}

li {
  margin: 8px 0;
}
</style>
