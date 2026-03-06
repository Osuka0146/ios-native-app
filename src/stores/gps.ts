import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Geolocation } from '@capacitor/geolocation';

interface LocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
  altitude: number | null;
  speed: number | null;
  timestamp: number;
}

export const useGpsStore = defineStore('gps', () => {
  const location = ref<LocationData | null>(null);
  const isWatching = ref(false);
  const error = ref<string | null>(null);
  const watchId = ref<string | null>(null);

  // Obtener ubicación actual
  const getCurrentLocation = async (): Promise<LocationData | null> => {
    try {
      error.value = null;
      const coordinates = await Geolocation.getCurrentPosition();
      
      location.value = {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude,
        accuracy: coordinates.coords.accuracy || 0,
        altitude: coordinates.coords.altitude,
        speed: coordinates.coords.speed,
        timestamp: coordinates.timestamp,
      };
      
      return location.value;
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al obtener ubicación';
      console.error('Error getting location:', err);
      return null;
    }
  };

  // Monitorear ubicación en tiempo real
  const watchPosition = async () => {
    try {
      error.value = null;
      isWatching.value = true;
      
      watchId.value = await Geolocation.watchPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        },
        (position) => {
          if (position) {
            location.value = {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
              accuracy: position.coords.accuracy || 0,
              altitude: position.coords.altitude,
              speed: position.coords.speed,
              timestamp: position.timestamp,
            };
          }
        }
      );
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Error al monitorear ubicación';
      console.error('Error watching position:', err);
      isWatching.value = false;
    }
  };

  // Detener monitoreo
  const stopWatching = async () => {
    if (watchId.value !== null) {
      try {
        await Geolocation.clearWatch({ id: watchId.value });
        isWatching.value = false;
        watchId.value = null;
      } catch (err) {
        console.error('Error stopping watch:', err);
      }
    }
  };

  // Obtener URL de Google Maps
  const getMapsUrl = (): string => {
    if (!location.value) return '';
    return `https://maps.google.com/?q=${location.value.latitude},${location.value.longitude}`;
  };

  // Calcular distancia entre dos puntos (fórmula de Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radio de la Tierra en km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distancia en km
  };

  return {
    location,
    isWatching,
    error,
    getCurrentLocation,
    watchPosition,
    stopWatching,
    getMapsUrl,
    calculateDistance,
  };
});
