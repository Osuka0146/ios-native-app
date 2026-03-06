# 📱 Hardware del Dispositivo - Guía de Uso

## Descripción General

La aplicación Riksiri ha sido actualizada con soporte para acceder al hardware del dispositivo, incluyendo:

- **GPS / Geolocalización** 📍
- **Cámara** 📷

## Funcionalidades Implementadas

### 1. GPS / Geolocalización 📍

#### Características:
- **Obtener ubicación actual**: Obtiene tu posición GPS actual con precisión
- **Monitorear ubicación**: Monitorea tu ubicación en tiempo real
- **Información detallada**:
  - Latitud y Longitud
  - Precisión (en metros)
  - Altitud (si disponible)
  - Velocidad (si disponible)
  - Hora de la lectura

#### Funciones especiales:
- **Ver en Google Maps**: Abre tu ubicación en Google Maps directamente
- **Calcular distancia**: Función para calcular la distancia entre dos puntos usando la fórmula de Haversine

#### Permisos requeridos:
- `ACCESS_FINE_LOCATION` (Android)
- `ACCESS_COARSE_LOCATION` (Android)
- `NSLocationWhenInUseUsageDescription` (iOS)
- `NSLocationAlwaysAndWhenInUseUsageDescription` (iOS)

---

### 2. Cámara 📷

#### Características:
- **Tomar foto**: Abre la cámara para capturar una nueva foto
- **Seleccionar de galería**: Selecciona una foto almacenada en tu dispositivo
- **Edición**: Posibilidad de editar la foto antes de guardarla
- **Galería integrada**: Visualiza todas las fotos capturadas

#### Funciones:
- Ver la última foto capturada
- Galería de miniaturas de todas las fotos
- Descargar fotos (guardar en tu dispositivo)
- Eliminar fotos individuales
- Limpiar toda la galería

#### Permisos requeridos:
- `CAMERA` (Android)
- `NSCameraUsageDescription` (iOS)

---

## Cómo Acceder

1. Abre la aplicación Riksiri
2. Inicia sesión con tu cuenta
3. Abre el menú lateral (botón de hamburguesa)
4. Desplázate hasta la opción **"Hardware del Dispositivo"**
5. Haz clic para acceder a la nueva sección

---

## Arquitectura Técnica

### Estructura de Carpetas

```
src/
├── stores/
│   ├── gps.ts          # Store Pinia para GPS
│   └── camera.ts       # Store Pinia para Cámara
├── components/
│   ├── GpsComponent.vue        # Componente de GPS
│   └── CameraComponent.vue     # Componente de Cámara
└── views/
    └── DeviceHardware.vue      # Vista principal
```

### Tecnologías Utilizadas

- **Capacitor**: Framework para acceso a hardware nativo
  - `@capacitor/geolocation`: Plugin para GPS
  - `@capacitor/camera`: Plugin para Cámara

- **Pinia**: State management
- **Vue 3**: Framework Frontend
- **Ionic**: Componentes UI

---

## Ejemplos de Uso

### En el Store de GPS

```typescript
import { useGpsStore } from '@/stores/gps';

const gpsStore = useGpsStore();

// Obtener ubicación actual
const location = await gpsStore.getCurrentLocation();

// Monitorear en tiempo real
await gpsStore.watchPosition();

// Detener monitoreo
await gpsStore.stopWatching();

// Calcular distancia
const distance = gpsStore.calculateDistance(lat1, lon1, lat2, lon2);

// Obtener URL de Google Maps
const mapsUrl = gpsStore.getMapsUrl();
```

### En el Store de Cámara

```typescript
import { useCameraStore } from '@/stores/camera';

const cameraStore = useCameraStore();

// Tomar foto
const photo = await cameraStore.takePhoto();

// Seleccionar de galería
const photo = await cameraStore.selectPhotoFromGallery();

// Obtener todas las fotos
const allPhotos = cameraStore.getAllPhotos();

// Descargar una foto
cameraStore.downloadPhoto(photo);

// Eliminar una foto
cameraStore.deletePhoto(index);

// Limpiar todo
cameraStore.clearPhotos();
```

---

## Permisos en el Dispositivo

### Android (AndroidManifest.xml)

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
```

### iOS (Info.plist)

```xml
<key>NSCameraUsageDescription</key>
<string>La aplicación necesita acceso a la cámara para capturar fotos</string>

<key>NSLocationWhenInUseUsageDescription</key>
<string>La aplicación necesita acceso a tu ubicación para mostrar tu posición actual</string>

<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>La aplicación necesita acceso continuo a tu ubicación</string>
```

---

## Solución de Problemas

### La ubicación no se obtiene
1. Verifica que los permisos estén habilitados en tu dispositivo
2. Asegúrate de tener activado el GPS en tu dispositivo
3. Espera unos segundos para que el GPS se calibre

### La cámara no funciona
1. Verifica que el permiso de cámara esté habilitado
2. Cierra otras aplicaciones que puedan estar usando la cámara
3. Reinicia la aplicación

### Las fotos no se guardan
1. Verifica que haya espacio disponible en el dispositivo
2. Revisa los permisos de almacenamiento

---

## Próximos Pasos

Algunas mejoras futuras podrían incluir:

- ✅ Compartir ubicación en tiempo real
- ✅ Guardar fotos en la nube
- ✅ Crear rutas con histórico de GPS
- ✅ Filtros y edición de fotos avanzada
- ✅ Galería sincronizada entre dispositivos

---

## Soporte

Si tienes problemas o sugerencias, por favor contacta al equipo de desarrollo.

**Versión**: 1.0.0  
**Última actualización**: Marzo 2026
