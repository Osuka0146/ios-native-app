<template>
  <div class="camera-component">
    <ion-card>
      <ion-card-header>
        <ion-card-title>📷 Cámara</ion-card-title>
      </ion-card-header>
      <ion-card-content>
        <!-- Botones de acción -->
        <div class="button-group">
          <ion-button 
            @click="handleTakePhoto"
            expand="block"
            color="primary"
            class="action-button"
          >
            <ion-icon :icon="camera" slot="start"></ion-icon>
            Tomar Foto
          </ion-button>

          <ion-button 
            @click="handleSelectFromGallery"
            expand="block"
            color="secondary"
            class="action-button"
          >
            <ion-icon :icon="image" slot="start"></ion-icon>
            Seleccionar de Galería
          </ion-button>

          <ion-button 
            v-if="cameraStore.photos.length > 0"
            @click="handleClearPhotos"
            expand="block"
            fill="outline"
            color="danger"
            class="action-button"
          >
            <ion-icon :icon="trash" slot="start"></ion-icon>
            Limpiar Todo
          </ion-button>
        </div>

        <!-- Mensaje de error -->
        <ion-item v-if="cameraStore.error" color="danger" lines="none">
          <ion-label>
            <ion-icon :icon="alertCircle"></ion-icon>
            {{ cameraStore.error }}
          </ion-label>
        </ion-item>

        <!-- Última foto capturada -->
        <div v-if="cameraStore.lastPhoto" class="last-photo-section">
          <h3>Última Foto</h3>
          <img 
            :src="cameraStore.lastPhoto.dataUrl" 
            alt="Última foto"
            class="photo-preview"
          />
          <p class="photo-info">
            {{ new Date(cameraStore.lastPhoto.timestamp).toLocaleString() }}
          </p>
          <ion-button 
            @click="handleDownloadLastPhoto"
            expand="block"
            fill="outline"
            size="small"
          >
            <ion-icon :icon="downloadOutline" slot="start"></ion-icon>
            Descargar
          </ion-button>
        </div>

        <!-- Galería de fotos -->
        <div v-if="cameraStore.photos.length > 0" class="photos-gallery">
          <h3>Galería ({{ cameraStore.photos.length }} fotos)</h3>
          <ion-grid fixed>
            <ion-row>
              <ion-col 
                v-for="(photo, index) in cameraStore.photos"
                :key="index"
                size="6"
                size-sm="4"
                size-lg="3"
              >
                <div class="photo-item">
                  <img 
                    :src="photo.dataUrl" 
                    :alt="`Foto ${index + 1}`"
                    class="gallery-photo"
                  />
                  <div class="photo-actions">
                    <ion-button 
                      @click="handleDownloadPhoto(photo)"
                      size="small"
                      fill="clear"
                      color="primary"
                    >
                      <ion-icon :icon="downloadOutline"></ion-icon>
                    </ion-button>
                    <ion-button 
                      @click="handleDeletePhoto(index)"
                      size="small"
                      fill="clear"
                      color="danger"
                    >
                      <ion-icon :icon="trash"></ion-icon>
                    </ion-button>
                  </div>
                </div>
              </ion-col>
            </ion-row>
          </ion-grid>
        </div>

        <!-- Estado vacío -->
        <div v-if="cameraStore.photos.length === 0" class="empty-state">
          <ion-icon :icon="imagesOutline" class="empty-icon"></ion-icon>
          <p>No hay fotos capturadas aún</p>
        </div>
      </ion-card-content>
    </ion-card>
  </div>
</template>

<script setup lang="ts">
import {
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/vue';
import {
  camera,
  image,
  trash,
  downloadOutline,
  imagesOutline,
  alertCircle,
} from 'ionicons/icons';
import { useCameraStore } from '../stores/camera';

const cameraStore = useCameraStore();

const handleTakePhoto = async () => {
  await cameraStore.takePhoto();
};

const handleSelectFromGallery = async () => {
  await cameraStore.selectPhotoFromGallery();
};

const handleDeletePhoto = (index: number) => {
  cameraStore.deletePhoto(index);
};

const handleClearPhotos = () => {
  cameraStore.clearPhotos();
};

const handleDownloadPhoto = (photo: any) => {
  cameraStore.downloadPhoto(photo);
};

const handleDownloadLastPhoto = () => {
  if (cameraStore.lastPhoto) {
    cameraStore.downloadPhoto(cameraStore.lastPhoto);
  }
};
</script>

<style scoped>
.camera-component {
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

.last-photo-section {
  margin-top: 20px;
  padding: 15px;
  border-radius: 8px;
  background: var(--ion-color-light);
}

.last-photo-section h3 {
  margin-top: 0;
  color: var(--ion-color-dark);
}

.photo-preview {
  width: 100%;
  border-radius: 8px;
  margin: 10px 0;
  max-height: 400px;
  object-fit: cover;
}

.photo-info {
  font-size: 0.85rem;
  color: var(--ion-color-medium);
  margin: 10px 0;
}

.photos-gallery {
  margin-top: 20px;
}

.photos-gallery h3 {
  margin-bottom: 15px;
  color: var(--ion-color-dark);
}

.photo-item {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  background: var(--ion-color-light);
}

.gallery-photo {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.photo-actions {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  transition: opacity 0.3s;
}

.photo-item:hover .photo-actions {
  opacity: 1;
}

.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;
  text-align: center;
  color: var(--ion-color-medium);
}

.empty-icon {
  font-size: 64px;
  margin-bottom: 15px;
  opacity: 0.5;
}

.empty-state p {
  margin: 0;
  font-size: 1.1rem;
}
</style>
