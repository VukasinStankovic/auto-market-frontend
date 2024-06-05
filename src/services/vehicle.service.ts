import {useAxiosWithoutAuthorisation} from "@/services/main.service";
import type {FilterModel} from "@/models/filter.model";

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


}

