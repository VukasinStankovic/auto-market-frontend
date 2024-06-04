<script setup lang="ts">
import {useRouter} from "vue-router";
import {AuthService} from "@/services/auth.service";

const router = useRouter();

function logout() {
  AuthService.clearAuth();
  router.push({
    path: '/login'
  });
  // TODO: proveriti da li je ovo ispravno za azuriranje nav-bara
  window.location.reload()
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
            <RouterLink class="nav-link active link-warning" to="login">Prijavi se</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link active link-danger" to="register">Registruj se</RouterLink>
          </li>
        </ul>
      </div>
      <!-- USER SIGNED IN -->
      <div class="collapse navbar-collapse" id="navbarText" v-if="AuthService.hasAuth()">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <button class="nav-link active link-danger" type="button" @click="logout">Izloguj se</button>
          </li>
        </ul>
        <button type="button" class="btn btn-warning">
          <i class="fa-solid fa-plus"></i>
          Postavi oglas
        </button>
      </div>
    </div>
  </nav>
  <RouterView/>
</template>
