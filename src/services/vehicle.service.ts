import {useAxiosWithoutAuthorisation} from "@/services/main.service";
import type {FilterModel} from "@/models/filter.model";
import type {VehicleModel} from "@/models/vehicle.model";
import type {NewImageModel} from "@/models/newImage.model";
import type {SelectedEquipmentModel} from "@/models/selectedEquipment.model";

export class VehicleService{
    static async getAllVehicles(){
        return await useAxiosWithoutAuthorisation('/vehicle')
    }

    static async getVehicleByFilters(filters: FilterModel){
        return await useAxiosWithoutAuthorisation('/vehicle/filtered', "post", filters)
    }

    static async getVehicleById(id: number){
        return await useAxiosWithoutAuthorisation('/vehicle/' + id)
    }

    static async saveVehicle(vehicle: VehicleModel, images: NewImageModel[], equipments: SelectedEquipmentModel[]) {
        return await useAxiosWithoutAuthorisation('/vehicle', 'post', {vehicle: vehicle, images: images, equipments: equipments})
    }
}

