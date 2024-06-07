<script setup lang="ts">
import {ref} from "vue";
import type {BrandModel} from "@/models/brand.model";
import {BrandService} from "@/services/brand.service";
import type {ModelModel} from "@/models/model.model";
import {ModelService} from "@/services/model.service";
import type {BodyModel} from "@/models/body.model";
import {BodyService} from "@/services/body.service";
import type {FuelTypeModel} from "@/models/fuelType.model";
import {FuelTypeService} from "@/services/fuelType.service";
import type {ColorModel} from "@/models/color.model";
import {ColorService} from "@/services/color.service";
import type {EquipmentModel} from "@/models/equipment.model";
import {EquipmentService} from "@/services/equipment.service";
import {VehicleService} from "@/services/vehicle.service";
import type {NewVehicleModel} from "@/models/newVehicle.model";
import {TransmissionService} from "@/services/transmission.service";
import type {TransmissionModel} from "@/models/transmission.model";
import type {NewImageModel} from "@/models/newImage.model";
import type {SelectedEquipmentModel} from "@/models/selectedEquipment.model";
import { useRouter } from 'vue-router';

const router = useRouter()

// BRANDS
const brands = ref<BrandModel[]>([]);
const selectedBrand = ref<number>(null);
BrandService.getAllBrands().then(res => {
  brands.value = res.data;
  brands.value.sort((a, b) => a.name.localeCompare(b.name));
});

// MODELS
const models = ref<ModelModel[]>([]);
const filteredModels = ref<ModelModel[]>([]);
const selectedModel = ref<number>(null);
ModelService.getAllModels().then(res => {
  models.value = res.data;
  models.value.sort((a, b) => a.name.localeCompare(b.name));
});

function filterModels() {
  selectedModel.value = null;
  filteredModels.value = models.value.filter(model => {
    return model.brand.brandId == selectedBrand.value;
  });
}

// BODY
const bodies = ref<BodyModel[]>([]);
const selectedBody = ref<number>(null);
BodyService.getAllBodies().then(res => {
  bodies.value = res.data;
});

//FUELTYPE
const fuelTypes = ref<FuelTypeModel[]>([]);
const selectedFuelType = ref<number>(null);
FuelTypeService.getAllFuelTypes().then(res => {
  fuelTypes.value = res.data;
});

// YEARS
let years: number[] = generateYears(new Date().getFullYear() - 100);
const selectedYear = ref<number>(null);

function generateYears(startYear: number): number[] {
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = startYear; year <= currentYear; year++) {
    years.push(year);
  }
  return years.reverse();
}

// POST TITLE
const selectedPostTitle = ref<string>('');

// COLOR
const colors = ref<ColorModel[]>([]);
const selectedColor = ref<number>(null);
ColorService.getAllColors().then(res => {
  colors.value = res.data;
});

// MILEAGE
const selectedMileage = ref<number>(null);

// HORSEPOWER && KILOWATTS
const selectedHorsepower = ref<number>(null);
const selectedKilowatts = ref<number>(null);

function convertToHorsepower() {
  // Konverzija kW u KS
  if (selectedKilowatts != null) {
    selectedHorsepower.value = Math.round(selectedKilowatts.value * 1.35962); // Formula za konverziju
  }
}

function convertToKilowatts() {
  // Konverzija KS u kW
  if (selectedHorsepower.value != null) {
    selectedKilowatts.value = Math.round(selectedHorsepower.value / 1.35962); // Formula za konverziju
  }
}

// NUMBER OF SEATS
const selectedNumberOfSeats = ref<string>(null);
const numberOfSeats = generateNumberOfSeats();

function generateNumberOfSeats() {
  const seats = [];
  for (let i = 2; i <= 9; i++) {
    seats.push(`${i} sedišta`);
  }
  return seats;
}

// NUMBER OF DOORS
const numberOfDoors = ["2/3 vrata", "4/5 vrata"];
const selectedNumberOfDoors = ref<string>(null);

// TRANSMISSION
const selectedTransmission = ref<number>(null);
const allTransmission = ref<TransmissionModel[]>([]);
TransmissionService.getAllTransmissions().then(res => {
  allTransmission.value = res.data;
});

// PICTURES
let selectedPictures = [];

function showData(event) {
  selectedPictures = event.target.files;
  console.log(selectedPictures[0]);
}

// EQUIPMENT
const allEquipment = ref<EquipmentModel[]>([]);
const selectedEquipment = ref<number[]>([]);
EquipmentService.getAllEquipment().then(res => {
  allEquipment.value = res.data;
});

// PRICE
const selectedPrice = ref<number>(null);

const updateSelectedEquipment = (equipmentId) => {
  const index = selectedEquipment.value.indexOf(equipmentId);
  if (index === -1) {
    // Dodajemo equipmentId u listu ako nije već selektovan
    selectedEquipment.value.push(equipmentId);
  } else {
    // Uklanjamo equipmentId iz liste ako je već selektovan
    selectedEquipment.value.splice(index, 1);
  }
};


function postVehicle() {
  const newVehicle: NewVehicleModel = {
    fuelTypeId: selectedFuelType.value,
    bodyId: selectedBody.value,
    colorId: selectedColor.value,
    // TODO: promeniti: uz token vratiti email i userID i ovde postaviti userID
    userId: 1,
    transmissionId: selectedTransmission.value,
    modelId: selectedModel.value,
    name: selectedPostTitle.value,
    numberOfDoors: selectedNumberOfDoors.value,
    numberOfSeats: selectedNumberOfSeats.value,
    price: selectedPrice.value,
    mileage: selectedMileage.value,
    productionYear: selectedYear.value,
    horsepower: selectedHorsepower.value,
    kilowatts: selectedKilowatts.value,
  };

  const vehicleImages: NewImageModel[] = [
    {
      imageUrl: "https://t4.ftcdn.net/jpg/04/70/29/97/360_F_470299797_UD0eoVMMSUbHCcNJCdv2t8B2g1GVqYgs.jpg"
    }
  ];

  const vehicleEquipment: SelectedEquipmentModel[] = selectedEquipment.value.map(id => ({ equipmentId: id }));

  VehicleService.saveVehicle(newVehicle, vehicleImages, vehicleEquipment).then(rsp => {
  //   TODO: implementirati da saveVehicle vrati response
  })

  router.push({
    path: '/'
  })
}

</script>


<template>
  <div class="container d-flex justify-content-center pt-5">
    <form class="row g-3 w-75" novalidate>
      <h3 class="text-warning">Marka i model</h3>
      <div class="col-md-6">
        <select
            id="brandSelect"
            class="form-select"
            v-model="selectedBrand"
            @change="filterModels"
            required
            :class="{'is-invalid': selectedBrand == null, 'is-valid': selectedBrand != null}">
          <option :value="null" disabled selected hidden>Sve marke</option>
          <option :value="null" :disabled="selectedBrand == null">Poništi izbor &#10005;</option>
          <option v-for="b in brands" :key="b.brandId" :value="b.brandId">{{ b.name }}</option>
        </select>
      </div>
      <div class="col-md-6">
        <select class="form-select"
                v-model="selectedModel" :disabled="selectedBrand == null" required
                :class="{'is-invalid': selectedModel == null, 'is-valid': selectedModel != null}">
          <option :value="null" disabled selected hidden>Svi modeli</option>
          <option v-for="m in filteredModels" :key="m.modelId" :value="m.modelId">{{ m.name }}</option>
        </select>
      </div>
      <h3 class="text-warning">Osnovne informacije</h3>
      <div class="col-12">
        <label for="inputAddress" class="form-label">Naslov oglasa</label>
        <input type="text"
               class="form-control"
               placeholder="Unesite naslov oglasa"
               required
               v-model="selectedPostTitle"
               :class="{'is-invalid': selectedPostTitle.length == 0, 'is-valid': selectedPostTitle.length > 0}">
      </div>
      <div class="col-md-5">
        <select class="form-select" v-model="selectedBody" required
                :class="{'is-invalid': selectedBody == null, 'is-valid': selectedBody != null}">
          <option v-if="selectedBody == null" :value="null" disabled selected hidden>Tip karoserije</option>
          <option :value="null" :disabled="selectedBody == null"> Poništi izbor &#10005</option>
          <option :value="body.bodyId" v-for="body in bodies">{{ body.name }}</option>
        </select>
      </div>
      <div class="col-md-5">
        <select class="form-select" v-model="selectedFuelType" required
                :class="{'is-invalid': selectedFuelType == null, 'is-valid': selectedFuelType != null}">
          <option :value="null" v-if="selectedFuelType == null" disabled selected hidden>Vrsta goriva</option>
          <option :value="null" :disabled="selectedFuelType == null"> Poništi izbor &#10005</option>
          <option :value="ft.fuelTypeId" v-for="ft in fuelTypes" :key="ft.fuelTypeId"> {{ ft.name }}</option>
        </select>
      </div>
      <div class="col-md-2">
        <select class="form-select" v-model="selectedYear" required
                :class="{'is-invalid': selectedYear == null, 'is-valid': selectedYear != null}">
          <option v-if="selectedYear == null" :value="null" hidden selected disabled>Godište</option>
          <option :value="null" :disabled="selectedYear == null"> Poništi izbor &#10005</option>
          <option v-for="y in years" :value="y as number">{{ y }}</option>
        </select>
      </div>
      <h3 class="text-warning">Dodatne informacije</h3>
      <div class="col-md-3">
        <input type="number" class="form-control" required
               :class="{'is-invalid': selectedKilowatts == null, 'is-valid': selectedKilowatts != null}"
               v-model="selectedKilowatts" @input="convertToHorsepower" placeholder="Snaga (kW)">
      </div>
      <div class="col-md-3">
        <input type="number" class="form-control" required
               :class="{'is-invalid': selectedHorsepower == null, 'is-valid': selectedHorsepower != null}"
               v-model="selectedHorsepower" @input="convertToKilowatts" placeholder="Snaga (KS)">
      </div>
      <div class="col-md-3">
        <input type="number" class="form-control" required
               :class="{'is-invalid': selectedMileage == null, 'is-valid': selectedMileage != null}"
               v-model="selectedMileage" placeholder="Kilometraža"/>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="selectedColor" required
                :class="{'is-invalid': selectedColor == null, 'is-valid': selectedColor != null}">
          <option v-if="selectedColor == null" :value="null" disabled selected hidden>Boja</option>
          <option :value="null" :disabled="selectedColor == null"> Poništi izbor &#10005</option>
          <option :value="c.colorId" v-for="c in colors">{{ c.name }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="selectedNumberOfSeats" required
                :class="{'is-invalid': selectedNumberOfSeats == null, 'is-valid': selectedNumberOfSeats != null}">
          <option v-if="selectedNumberOfSeats == null" :value="null" disabled selected hidden>Broj sedišta</option>
          <option :value="null" :disabled="selectedNumberOfSeats == null"> Poništi &#10005</option>
          <option :value="seats" v-for="seats in numberOfSeats">{{ seats }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="selectedNumberOfDoors" required
                :class="{'is-invalid': selectedNumberOfDoors == null, 'is-valid': selectedNumberOfDoors != null}">
          <option v-if="selectedNumberOfDoors == null" :value="null" disabled selected hidden>Broj vrata</option>
          <option :value="null" :disabled="selectedNumberOfDoors == null"> Poništi &#10005</option>
          <option :value="doors" v-for="doors in numberOfDoors">{{ doors }}</option>
        </select>
      </div>
      <div class="col-md-3">
        <select class="form-select" v-model="selectedTransmission" required
                :class="{'is-invalid': selectedTransmission == null, 'is-valid': selectedTransmission != null}">
          <option v-if="selectedTransmission == null" :value="null" disabled selected hidden>Menjač</option>
          <option :value="null" :disabled="selectedTransmission == null"> Poništi &#10005</option>
          <option :value="t.transmissionId" v-for="t in allTransmission">{{ t.name }}</option>
        </select>
      </div>

      <h3 class="text-warning">Slike</h3>
      <div class="mb-3">
        <label for="formFileMultiple" class="form-label">Unos fotografija</label>
        <input class="form-control" type="file" id="formFileMultiple" multiple @change="showData">
      </div>
      <h3 class="text-warning">Oprema</h3>
      <div class="col-md-2 form-check mx-2" v-for="equipment in allEquipment" :key="equipment.equipmentId">
        <input class="form-check-input"
               type="checkbox"
               :id="'equipment_' + equipment.equipmentId"
               :value="equipment.equipmentId"
               :checked="selectedEquipment.includes(equipment.equipmentId)"
               @change="updateSelectedEquipment(equipment.equipmentId)">
        <label class="form-check-label" :for="'equipment_' + equipment.equipmentId">{{ equipment.name }}</label>
      </div>

      <h3 class="text-warning">Cena</h3>
      <div class="col-md-3 input-group" style="width: 25%;">
        <input type="number" class="form-control" required
               :class="{'is-invalid': selectedPrice == null, 'is-valid': selectedPrice != null}"
               v-model="selectedPrice" placeholder="Cena"/>
        <span class="input-group-text" id="basic-addon1">€</span>
      </div>

      <div class="col-12">
        <button type="button" class="btn btn-success" @click="postVehicle">Postavi oglas</button>
      </div>
    </form>
  </div>
</template>

<style scoped>

</style>