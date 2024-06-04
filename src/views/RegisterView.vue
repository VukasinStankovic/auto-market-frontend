<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";

const forename = ref<string>('');
const surename = ref<string>('');
const phone = ref<string>('');
const email = ref<string>('');
const password = ref<string>('');
const confirmPassword = ref<string>('');

const router = useRouter();

// TODO: DOVRSI
function doRegister() {

}
</script>

<template>
  <div class="container">
    <form v-on:submit.prevent="doRegister" class="w-50 mt-5 m-auto p-5 pt-4 border border-warning rounded">
      <h1 class="text-center border-bottom border-warning pb-4 mb-5  ">Registracija</h1>
      <div class="row row-cols-2">
        <div class="mb-3">
          <label for="forename" class="form-label">Ime</label>
          <input type="text" class="form-control" id="forename" placeholder="Unesi ime" v-model="forename">
        </div>
        <div class="mb-3">
          <label for="surename" class="form-label">Prezime</label>
          <input type="text" class="form-control" id="surename" placeholder="Unesi prezime" v-model="surename">
        </div>
      </div>
      <div class="mb-3">
        <label for="email" class="form-label">E-mail adresa</label>
        <input type="email" class="form-control" id="email" placeholder="Unesi e-mail adresu" v-model="email">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Lozinka</label>
        <input type="password" class="form-control" id="password" placeholder="Unesi lozinku" v-model="password">
      </div>
      <div class="mb-3">
        <label for="confirmPassword" class="form-label">Potvrda lozinke</label>
        <input type="password" class="form-control" id="confirmPassword" placeholder="Potvrdi lozinku" v-model="confirmPassword">
      </div>
      <button type="submit" class="btn btn-outline-warning me-3">Submit</button>
      <RouterLink class="link-danger" to="login">Već imaš nalog?</RouterLink>
    </form>
  </div>
</template>

<style scoped>
.form-control:focus {
  border-color: #ffc107;
  box-shadow: inset 0 0.5px 0.5px rgb(255, 193, 7);
}
</style>