<script setup lang="ts">
import {useRouter} from "vue-router";
import {AuthService} from "@/services/auth.service";
import {ref} from "vue";

const router = useRouter();
const darkMode = ref<boolean>(true);

function toggleDarkMode() {
  const htmlTag = document.querySelector('html');
  htmlTag.setAttribute('data-bs-theme', darkMode.value ? 'dark' : 'light');
  console.log("darkMode value: ", darkMode.value);
}

function logout() {
  AuthService.clearAuth();
  router.push({
    path: '/login'
  });
  // TODO: proveriti da li je ovo ispravno za azuriranje nav-bara
  window.location.reload();
}

function redirectToRegister() {
  router.push({
    path: '/register'
  });
}

function redirectToLogin() {
  router.push({
    path: '/login'
  });
}
function redirectToNewVehicle() {
  router.push({
    path: '/new-vehicle'
  });
}

</script>

<template>
  <nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container">
      <!-- LOGO -->
      <RouterLink class="navbar-brand text-warning" to="/">
        AUTO<span class="text-danger">MARKET</span>
      </RouterLink>
      <!-- NAV LINKS -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText"
              aria-controls="navbarText" aria-expanded="false">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- USER LOGGED OUT -->
      <div class="collapse navbar-collapse" id="navbarText" v-if="!AuthService.hasAuth()">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="btn btn-outline-warning me-3" @click="redirectToLogin">Prijavi se</button>
          </li>
          <li class="nav-item">
            <button class="btn btn-outline-danger" @click="redirectToRegister">Registruj se</button>
          </li>
        </ul>
      </div>
      <!-- USER SIGNED IN -->
      <div class="collapse navbar-collapse justify-content-end" id="navbarText" v-if="AuthService.hasAuth()">
        <button type="button" class="btn btn-outline-warning me-3" @click="redirectToNewVehicle">
          <i class="fa-solid fa-plus"></i>
          Postavi oglas
        </button>
        <!--        DROPDOWN-->
        <div class="btn-group">
          <button type="button" class="btn btn-outline-danger" @click="logout">Izloguj se</button>
          <button type="button" class="btn btn-outline-danger dropdown-toggle dropdown-toggle-split" data-bs-toggle="dropdown"
                  aria-expanded="false">
            <span class="visually-hidden">Toggle Dropdown</span>
          </button>
          <ul class="dropdown-menu">
            <li class="ps-3">
              <div class="form-check form-switch text-end">
                <label class="form-check-label me-5 text-nowrap" for="flexSwitchCheckDefault">Promeni temu</label>
                <input class="form-check-input text-danger" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                       v-model="darkMode" @change="toggleDarkMode">
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>

  </nav>
  <RouterView/>
</template>
