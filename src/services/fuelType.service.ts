import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class FuelTypeService{
    static async getAllFuelTypes(){
        return await useAxiosWithoutAuthorisation('/fuel-type')
    }

    static async getFuelTypesById(id: number){
        return await useAxiosWithoutAuthorisation('/fuel-type/' + id)
    }
}