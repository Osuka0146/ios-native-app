<template>
  <ion-page>
    <ion-menu content-id="main-content">
      <ion-header>
        <ion-toolbar color="tertiary">
          <ion-title>Menu Content</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">
        <ion-list id="inbox-list">
          <ion-item>
            <ion-avatar aria-hidden="true" slot="start">
              <img alt="User" src="https://ionicframework.com/docs/img/demos/avatar.svg" />
            </ion-avatar>
            <ion-label>{{ userStore.user.usuario }}</ion-label>
            <ion-button slot="end" @click="cerrarSesion">Salir</ion-button>
          </ion-item>
          <ion-accordion-group>
            <ion-accordion v-for="(menu, index) in userStore.menu" :key="index">
              <ion-item slot="header" color="light">
                <ion-label><i :class="menu.icon"></i> {{ menu.name }}</ion-label>
              </ion-item>
              <div class="ion-padding" slot="content">
                <ion-menu-toggle :auto-hide="true" v-for="(p, i) in menu.sub" :key="i">
                  <ion-item @click="selectedIndex = i" router-direction="root" :router-link="'/'+p.url" lines="none" :detail="false" class="hydrated" :class="{ selected: selectedIndex === i }">
                  <ion-label>{{ p.name }}</ion-label>
                  </ion-item>
                </ion-menu-toggle>
              </div>
            </ion-accordion>
          </ion-accordion-group>
          <ion-item-divider></ion-item-divider>
          <ion-menu-toggle :auto-hide="true">
            <ion-item router-direction="root" router-link="/seccion/hardware" lines="none" :detail="false">
              <ion-icon :icon="hardwareChipOutline" slot="start"></ion-icon>
              <ion-label>Hardware del Dispositivo</ion-label>
            </ion-item>
          </ion-menu-toggle> 
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-header>
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>Riksiri</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding" id="main-content"> 
        <ion-router-outlet></ion-router-outlet>    
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import { useRouter } from 'vue-router';
const router = useRouter();
const userStore = useUserStore();
// aquí es donde se iomportan las funciones y componentes necesarios 
import { ref } from 'vue';
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonAvatar, IonButton, IonAccordionGroup, IonAccordion, IonItemDivider } from '@ionic/vue';
import {
IonApp,
IonIcon,
IonItem,
IonLabel,
IonList,
IonListHeader,
IonMenuToggle,
IonNote,
IonRouterOutlet,
IonSplitPane,
} from '@ionic/vue';
import {
archiveOutline,
archiveSharp,
bookmarkOutline,
bookmarkSharp,
heartOutline,
heartSharp,
mailOutline,
mailSharp,
paperPlaneOutline,
paperPlaneSharp,
trashOutline,
trashSharp,
warningOutline,
warningSharp,
hardwareChipOutline,
} from 'ionicons/icons';

const selectedIndex = ref(0);

async function cerrarSesion() {
  if(confirm('Seguro desea cerrar sesión?')){
    await userStore.$patch(
      { 
        user: {},
        authToken: null
      }
    );
    sessionStorage.clear();
    localStorage.clear();
    router.push('/login');
  }
  
}
</script>

<style scoped>
  ion-menu::part(backdrop) {
    background-color: rgba(255, 0, 255, 0.5);
  }

  ion-menu::part(container) {
    border-radius: 0 20px 20px 0;

    box-shadow: 4px 0px 16px rgba(255, 0, 255, 0.18);
  }
</style>