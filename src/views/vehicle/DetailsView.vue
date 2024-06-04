<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import type {VehicleModel} from "@/models/vehicle.model";
import {ref} from "vue";
import {VehicleService} from "@/services/vehicle.service";

const route = useRoute();
const router = useRouter();
const id = Number.parseInt(route.params.id as any);

const vehicle = ref<VehicleModel[]>([]);
VehicleService.getVehicleById(id).then(rsp => {
  vehicle.value = rsp.data;
});
</script>

<template>
  <!--  TITLE  -->
  <div class="container pt-4">
    <div class=" text-center mb-4">
      <h1 class="text-warning">{{ vehicle[0]?.name }}</h1>
    </div>

    <!--  CAROUSEL  -->
    <div id="carouselExample" class="carousel slide" v-if="vehicle">
      <div class="carousel-inner">
        <div v-for="(image, index) in vehicle[0]?.vehicleImages" :key="index"
             :class="{'carousel-item': true, 'active': index === 0}">
          <img :src="image.image.imageUrl" class="w-100 fixed-height" alt="...">
        </div>
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>

    <!--  CAR INFO SECTION  -->
    <div class="row">
      <div class="col">
        <div class="card border-warning mt-4 mb-3">
          <div class="card-body">
            <!--  CAR INFO -->
            <h3 class="card-title text-center border-bottom border-warning pb-3">Informacije o automobilu</h3>
            <div class="row row-cols-1 row-cols-xxl-2 g-4">
              <div class="col border-end border-warning">
                <h5 class="text-center my-3">Opšte informacije</h5>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Marka: <span class="fw-bold">{{
                    vehicle[0]?.model.brand.name
                  }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Model: <span class="fw-bold">{{
                    vehicle[0]?.model.name
                  }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Godište: <span
                    class="fw-bold">{{ vehicle[0]?.productionYear }}.</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Kilometraža: <span
                    class="fw-bold">{{ vehicle[0]?.mileage }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Karoserija: <span
                    class="fw-bold">{{ vehicle[0]?.body.name }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Gorivo: <span
                    class="fw-bold">{{ vehicle[0]?.fuelType.name }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Snaga motora: <span
                    class="fw-bold">{{ vehicle[0]?.kilowatts }}/{{ vehicle[0]?.horsepower }} (kW/KS)</span></p>
              </div>
              <div class="col">
                <h5 class="text-center my-3">Dodatne informacije</h5>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Menjač: <span
                    class="fw-bold">{{ vehicle[0]?.transmission.name }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Broj vrata: <span
                    class="fw-bold">{{ vehicle[0]?.numberOfDoors }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Broj sedišta: <span
                    class="fw-bold">{{ vehicle[0]?.numberOfSeats }}</span></p>
                <p class="card-text m-0 d-flex justify-content-between border-bottom py-2">Boja: <span class="fw-bold">{{
                    vehicle[0]?.color.name
                  }}</span></p>
              </div>
            </div>
            <!--          <p class="card-text"><small>Last updated 3 mins ago</small></p>-->
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card border-warning mt-4 mb-3">
          <div class="card-body">
            <h3 class="card-title text-center border-bottom border-warning pb-3">Oprema</h3>
            <div class="row row-cols-1 row-cols-lg-3 row-cols-xl-4 g-4">
              <p v-for="eq in vehicle[0]?.vehicleEquipments">{{ eq.equipment.name}}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<!--TODO: podesiti fiksnu visinu slike-->
<!--<style scoped>-->
<!--.fixed-height {-->
<!--  width: auto;-->
<!--}-->
<!--</style>-->