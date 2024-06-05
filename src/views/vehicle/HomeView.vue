<script setup lang="ts">

import {VehicleService} from "@/services/vehicle.service";
import type {VehicleModel} from "@/models/vehicle.model";
import {ref} from "vue";
import {useRouter} from "vue-router";
import {BodyService} from "@/services/body.service";
import type {BrandModel} from "@/models/brand.model";
import {FuelTypeService} from "@/services/fuelType.service";
import type {ModelModel} from "@/models/model.model";
import {ModelService} from "@/services/model.service";
import {BrandService} from "@/services/brand.service";
import type {BodyModel} from "@/models/body.model";
import type {FuelTypeModel} from "@/models/fuelType.model";
import type {FilterModel} from "@/models/filter.model";

// TODO: za selektovanu marku prikazati modele
// Fill in the filters with data from endpoints
const router = useRouter();
const vehicles = ref<VehicleModel[]>([]);
const models = ref<ModelModel[]>([]);
const filteredModels = ref<ModelModel[]>([]);
const brands = ref<BrandModel[]>([]);
const bodies = ref<BodyModel[]>([]);
const fuelTypes = ref<FuelTypeModel[]>([]);
let years: number[] = generateYears(new Date().getFullYear() - 100);

VehicleService.getAllVehicles().then(rsp => {
  vehicles.value = rsp.data;
});
BodyService.getAllBodies().then(res => {
  bodies.value = res.data;
});
FuelTypeService.getAllFuelTypes().then(res => {
  fuelTypes.value = res.data;
});
ModelService.getAllModels().then(res => {
  models.value = res.data;
  models.value.sort((a, b) => a.name.localeCompare(b.name));
});
BrandService.getAllBrands().then(res => {
  brands.value = res.data;
  brands.value.sort((a, b) => a.name.localeCompare(b.name));
});

// Selected values
const selectedBrand = ref<number>(null);
const selectedModel = ref<number>(null);
const selectedFromYear = ref<number>(null);
const selectedToYear = ref<number>(null);
const selectedPrice = ref<number>(null);
const selectedBody = ref<number>(null);
const selectedFuelType = ref<number>(null);

// Generate last 100 years for filters
function generateYears(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
}

// Redirect to car details page
function carDetails(id: number) {
  router.push({
    path: `/vehicle-details/${id}`,
  });
}

function filterModels() {
  selectedModel.value = null;
  filteredModels.value = models.value.filter(model => {
    return model.brand.brandId == selectedBrand.value;
  });
}

// Filters
function applyFilters() {
// TODO: dodaj logiku za pretragu filtera
  const filters: FilterModel = {
    priceTo: selectedPrice.value ? selectedPrice.value : undefined,
    yearTo: selectedToYear.value ? selectedToYear.value : years[0],
    yearFrom: selectedFromYear.value ? selectedFromYear.value : years[years.length - 1],
    modelId: selectedModel.value ? selectedModel.value : undefined,
    brandId: selectedBrand.value ? selectedBrand.value : undefined,
    fuelTypeId: selectedFuelType.value ? selectedFuelType.value : undefined,
    bodyId: selectedBody.value ? selectedBody.value : undefined,
  };

  VehicleService.getVehicleByFilters(filters).then(res => {
    vehicles.value = res.data;
    console.log(vehicles.value);
  });
}

</script>

<style>
.cursor {
  cursor: pointer;
}
</style>

<template>
  <div class="container pt-4">
    <!--  VEHICLE TABS  -->
    <div class="card text-center mb-5 cursor">
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

          <!-- 1. row -->
          <div class="col-md-4">
            <select class="form-select" v-model="selectedBrand"
                    @change="filterModels">
              <option :value="null" disabled selected hidden>Sve marke</option>
              <option :value="null" :disabled="selectedBrand == null"> Poništi izbor &#10005</option>
              <option v-for="b in brands" :key="b.brandId" :value="b.brandId">{{ b.name }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedModel"
                    :disabled="selectedBrand == null">
              <option :value="null" disabled selected hidden>Svi modeli</option>
              <option v-for="m in filteredModels" :key="m.modelId" :value="m.modelId">{{ m.name }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <div class="input-group">
              <input type="number" class="form-control" placeholder="Cena do" v-model="selectedPrice">
              <span class="input-group-text">€</span>
            </div>
          </div>
          <div class="col-md-2">
            <button type="button" class="btn btn-outline-warning w-100" @click="applyFilters">
              <i class="fa-solid fa-magnifying-glass"></i>
              Pretraga
            </button>
          </div>

          <!-- 2. row -->
          <!-- TODO: dodati funkcionalnost da selectedFromYear ne moze biti vece od selectedToYear -->
          <div class="col-md-2">
            <select class="form-select" v-model="selectedFromYear">
              <option v-if="selectedFromYear == null" :value="null" hidden selected disabled>Godište od</option>
              <option :value="null" :disabled="selectedFromYear == null"> Poništi izbor &#10005</option>
              <option v-for="y in years" :value="y as number">{{ y }}</option>
            </select>
          </div>
          <div class="col-md-2">
            <select class="form-select" v-model="selectedToYear">
              <option v-if="selectedToYear == null" :value="null" disabled selected hidden>do</option>
              <option :value="null" :disabled="selectedToYear == null"> Poništi izbor &#10005</option>
              <option v-for="y in years" :value="y as number">{{ y }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedBody">
              <option v-if="selectedBody == null" :value="null" disabled selected hidden>Karoserija</option>
              <option :value="null" :disabled="selectedBody == null"> Poništi izbor &#10005</option>
              <option :value="body.bodyId" v-for="body in bodies">{{ body.name }}</option>
            </select>
          </div>
          <div class="col-md-4">
            <select class="form-select" v-model="selectedFuelType">
              <option v-if="selectedFuelType == null" :value="null" disabled selected hidden>Vrsta goriva</option>
              <option :value="null" :disabled="selectedFuelType == null"> Poništi izbor &#10005</option>
              <option :value="ft.fuelTypeId" v-for="ft in fuelTypes" :key="ft.fuelTypeId"> {{ ft.name }}</option>
            </select>
          </div>

        </div>
      </div>
    </div>

    <!-- CARS -->
    <div class="row row-cols-1 row-cols-md-3 g-4" v-if="vehicles.length > 0">
      <div class="col-xl-3 col-md-6 col-xl-4 col-xxl-3" v-for="v in vehicles">
        <div class="card mb-3 change-cursor h-100" @click="carDetails(v.vehicleId)">
          <img :src="v.vehicleImages[0].image.imageUrl"
               class="card-img-top fixed-height" alt="...">
          <div class="card-body border-bottom pb-0">
            <h5 class="card-title">{{ v.name }}</h5>
            <p class="card-text fw-bold">{{ v.price }} €</p>
          </div>
          <div class="row" style="height: 40%">
            <div class="col pe-0">
              <ul class="list-group-flush list-group">
                <li class="list-group-item border border-0 pe-0">{{ v.productionYear }}. godište</li>
                <li class="list-group-item border border-0 pe-0">{{ v.mileage }} km</li>
                <li class="list-group-item border border-0 pe-0"> {{ v.horsepower }}KS</li>
                <li class="list-group-item border border-0 pe-0">{{ v.kilowatts }}kW</li>

              </ul>
            </div>
            <div class="col-7 ps-0">
              <ul class="list-group">
                <li class="list-group-item border border-0 ps-0">{{ v.transmission.name }}</li>
                <li class="list-group-item border border-0 ps-0">{{ v.numberOfDoors }} | {{ v.numberOfSeats }}</li>
                <li class="list-group-item border border-0 ps-0">{{ v.fuelType.name }}</li>
                <li class="list-group-item border border-0 ps-0">{{ v.body.name }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="d-flex flex-column align-items-center justify-content-center" v-else-if="vehicles.length == 0" style="height: 50vh">
      <img src="/public/sad-face.svg" alt="..." class="h-50 mb-4">
      <h1 class="text-center">Ne postoji nijedan automobil prema zadatim kriterijumima</h1>
    </div>

    <div class="d-flex align-items-center justify-content-center" v-else
         style="height: 50vh">
      <h1 class="text-center">Učitavanje automobila u toku... Molimo sačekajte!</h1>
    </div>
  </div>

</template>

<style scoped>
.fixed-height {
  height: 200px;
  width: auto;
  object-fit: cover;
}

.change-cursor {
  cursor: pointer;
}
</style>