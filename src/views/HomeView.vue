<script setup lang="ts">

import {VehicleService} from "@/services/vehicle.service";
import type {VehicleModel} from "@/models/vehicle.model";
import {ref} from "vue";

// TODO: za selektovanu marku prikazati modele

const vehicles = ref<VehicleModel[]>([]);
const brands = ref<string[]>([]);
const models = ref<string[]>([]);
const bodies = ref<string[]>([]);
const fuelTypes = ref<string[]>([]);
let years: number[] = generateYears(new Date().getFullYear() - 100);
let disabledModels: boolean = true;

// TODO: Promeniti tipove tako da promenljive butu pita BrandModel, ModelModel itd.
// Selected values
const selectedBrand = ref<string>(null);
const selectedModel = ref<string>(null);
const selectedFromYear = ref<number>(null);
const selectedToYear = ref<number>(null);
const selectedPrice = ref<string>(null);
const selectedBody = ref<string>(null);
const selectedFuelType = ref<string>(null);


VehicleService.getAllVehicles().then(rsp => {
  vehicles.value = rsp.data;

  const brandSet = new Set<string>();
  const modelSet = new Set<string>();
  const bodySet = new Set<string>();
  const fuelTypeSet = new Set<string>();

  vehicles.value.forEach(vehicle => {
    brandSet.add(vehicle.model.brand.name);
    modelSet.add(vehicle.model.name);
    bodySet.add(vehicle.body.name);
    fuelTypeSet.add(vehicle.fuelType.name);
  });

  brands.value = Array.from(brandSet);
  models.value = Array.from(modelSet);
  bodies.value = Array.from(bodySet);
  fuelTypes.value = Array.from(fuelTypeSet);
});

// Disable models until brand selection
function updateModels() {
  selectedModel.value = null;
  if (selectedBrand.value == null) {
    disabledModels = true;
    selectedModel.value = null;
  } else {
    disabledModels = false;
  }

  models.value = vehicles.value
      .filter(vehicle => vehicle.model.brand.name === selectedBrand.value)
      .map(vehicle => vehicle.model.name);
}

function generateYears(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
}
</script>

<style>
</style>

<template>
  <div class="container pt-5">
    <div class="card text-center mb-5">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs ">
          <li class="nav-item">
            <RouterLink class="nav-link active" aria-current="true" to="#">
              <i class="fa-solid fa-car-side fa-flip-horizontal fa-2xl"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="#">
              <i class="fa-solid fa-motorcycle fa-flip-horizontal fa-2xl text-warning"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="#">
              <i class="fa-solid fa-truck-moving fa-flip-horizontal fa-2xl text-warning"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="#">
              <i class="fa-solid fa-tractor fa-flip-horizontal fa-2xl text-warning"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="#">
              <i class="fa-solid fa-sailboat fa-flip-horizontal fa-2xl text-warning"></i>
            </RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link" to="#">
              <i class="fa-solid fa-bicycle fa-flip-horizontal fa-2xl text-warning"></i>
            </RouterLink>
          </li>
        </ul>
      </div>

      <!-- FILTERS -->
      <div class="card-body">
        <div class="row g-3">

          <!-- 1. red -->
          <div class="col-md-4">
            <select class="form-select" v-model="selectedBrand"
                    @change="updateModels">
              <option :value="null" hidden selected disabled>Sve marke</option>
              <option :value="null" :disabled="selectedBrand == null"> Poništi izbor &#10005</option>
              <option v-for="b in brands" :key="b">{{ b }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedModel"
                    :disabled="disabledModels">
              <option :value="null" disabled selected hidden>Svi modeli</option>
              <option v-for="m in models" :key="m">{{ m }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Cena do" v-model="selectedPrice">
              <span class="input-group-text">€</span>
            </div>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-outline-warning w-100">
              <i class="fa-solid fa-magnifying-glass"></i>
              Pretraga
            </button>
          </div>

          <!-- 2. red -->
          <div class="col-md-2">
            <select class="form-select" v-model="selectedFromYear">
              <option v-if="selectedFromYear == null" :value="null" hidden selected disabled id="default">Godište od
              </option>
              <option :value="null" :disabled="selectedFromYear == null"> Poništi izbor &#10005</option>
              <option v-for="y in years">{{ y }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" v-model="selectedToYear">
              <option v-if="selectedFromYear == null" :value="null" disabled selected hidden>do</option>
              <option :value="null" :disabled="selectedToYear == null"> Poništi izbor &#10005</option>
              <option v-for="y in years">{{ y }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedBody">
              <option v-if="selectedBody == null" :value="null" disabled selected hidden>Karoserija</option>
              <option :value="null" :disabled="selectedBody == null"> Poništi izbor &#10005</option>
              <option v-for="b in bodies">{{ b }}</option>
            </select>

          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedFuelType">
              <option v-if="selectedFuelType == null" :value="null" disabled selected hidden>Gorivo</option>
              <option :value="null" :disabled="selectedFuelType == null"> Poništi izbor &#10005</option>
              <option v-for="ft in fuelTypes">{{ ft }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>


    <div class="row row-cols-1 row-cols-md-3 g-4">
      <div class="col" v-for="v in vehicles">
        <div class="card mb-3" style="max-width: 540px;">
          <img :src="v.vehicleImages[0].image.imageUrl"
               class="card-img-top" alt="...">
          <div class="card-body border-bottom">
            <h5 class="card-title">{{ v.name }}</h5>
            <p class="card-text fw-bold">{{ v.price }} €</p>
          </div>
          <div class="row">
            <div class="col-4">
              <ul class="list-group-flush list-group">
                <li class="list-group-item border border-0">{{ v.productionYear }}.</li>
                <li class="list-group-item border border-0">{{ v.mileage }} km</li>
                <li class="list-group-item border border-0"> {{ v.horsepower }}KS</li>
                <li class="list-group-item border border-0">{{ v.kilowatts }}kW</li>

              </ul>
            </div>
            <div class="col-8">
              <ul class="list-group">
                <li class="list-group-item border border-0">{{ v.transmission.name }}</li>
                <li class="list-group-item border border-0">{{ v.numberOfDoors }} | {{ v.numberOfSeats }}</li>
                <li class="list-group-item border border-0">{{ v.fuelType.name }}</li>
                <li class="list-group-item border border-0">{{ v.body.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
