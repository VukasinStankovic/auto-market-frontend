<script setup lang="ts">
import {ref} from "vue";
import {useRouter} from "vue-router";
import {login} from "@/services/main.service";
import {AuthService} from "@/services/auth.service";

const username = ref<string>('');
const password = ref<string>('');
const router = useRouter();

async function doLogin() {
  try {
    if (username.value == '') return;
    if (password.value == '') return;
    const rsp = await login(username.value, password.value);
    AuthService.saveAuth(rsp.data);
    await router.push({path: '/'});
  } catch (err) {
    alert(err);
  }

  window.location.reload();
}

</script>

<template>
  <div class="container">
    <form v-on:submit.prevent="doLogin" class="w-50 mt-5 m-auto p-5 pt-4 border border-warning rounded">
      <h1 class="text-center border-bottom border-warning pb-4 mb-4">Prijava</h1>
      <div class="mb-3">
        <!--   TODO: Promeniti username u email   -->
        <label for="username" class="form-label">E-mail adresa</label>
        <input type="text" class="form-control" id="username" placeholder="Unesi e-mail adresu" v-model="username">
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Lozinka</label>
        <input type="password" class="form-control" id="password" placeholder="Unesi lozinku" v-model="password">
      </div>
      <button type="submit" class="btn btn-outline-warning me-3">Submit</button>
      <RouterLink class="link-danger" to="register">Nemaš nalog?</RouterLink>
    </form>
  </div>
</template>

<style scoped>
.form-control:focus {
  border-color: #ffc107;
  box-shadow: inset 0 0.5px 0.5px rgb(255, 193, 7);
}
</style>