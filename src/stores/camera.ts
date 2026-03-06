import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

interface PhotoData {
  base64: string;
  dataUrl: string;
  timestamp: number;
  format: string;
}

export const useCameraStore = defineStore('camera', () => {
  const photos = ref<PhotoData[]>([]);
  const lastPhoto = ref<PhotoData | null>(null);
  const error = ref<string | null>(null);

  // Tomar foto con cámara
  const takePhoto = async (): Promise<PhotoData | null> => {
    try {
      error.value = null;
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera,
      });

      if (image.base64String) {
        const photoData: PhotoData = {
          base64: image.base64String,
          dataUrl: `data:image/${image.format};base64,${image.base64String}`,
          timestamp: Date.now(),
          format: image.format || 'jpeg',
        };

        photos.value.push(photoData);
        lastPhoto.value = photoData;
        return photoData;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al tomar foto';
      console.error('Error taking photo:', err);
    }
    return null;
  };

  // Seleccionar foto de la galería
  const selectPhotoFromGallery = async (): Promise<PhotoData | null> => {
    try {
      error.value = null;
      
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos,
      });

      if (image.base64String) {
        const photoData: PhotoData = {
          base64: image.base64String,
          dataUrl: `data:image/${image.format};base64,${image.base64String}`,
          timestamp: Date.now(),
          format: image.format || 'jpeg',
        };

        photos.value.push(photoData);
        lastPhoto.value = photoData;
        return photoData;
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al seleccionar foto';
      console.error('Error selecting photo:', err);
    }
    return null;
  };

  // Obtener todas las fotos
  const getAllPhotos = () => {
    return photos.value;
  };

  // Eliminar una foto
  const deletePhoto = (index: number) => {
    photos.value.splice(index, 1);
  };

  // Limpiar todas las fotos
  const clearPhotos = () => {
    photos.value = [];
    lastPhoto.value = null;
  };

  // Obtener URL de descarga (para guardar)
  const downloadPhoto = (photoData: PhotoData) => {
    const link = document.createElement('a');
    link.href = photoData.dataUrl;
    link.download = `photo-${photoData.timestamp}.${photoData.format}`;
    link.click();
  };

  return {
    photos,
    lastPhoto,
    error,
    takePhoto,
    selectPhotoFromGallery,
    getAllPhotos,
    deletePhoto,
    clearPhotos,
    downloadPhoto,
  };
});
