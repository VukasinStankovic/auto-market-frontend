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

    window.location.reload()
}

</script>

<template>
  <div class="container">
  <form v-on:submit.prevent="doLogin" class="w-50 m-auto pt-5">
    <div class="mb-3">
      <label for="username" class="form-label">Username</label>
      <input type="text" class="form-control" id="username" v-model="username">
    </div>
    <div class="mb-3">
      <label for="password" class="form-label">Password</label>
      <input type="password" class="form-control" id="password" v-model="password">
    </div>
    <button type="submit" class="btn btn-outline-warning">Submit</button>
  </form>
  </div>
</template>

<style scoped>

</style>