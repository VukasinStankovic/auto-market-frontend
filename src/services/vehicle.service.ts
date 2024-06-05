import {useAxios, useAxiosWithoutAuthorisation} from "@/services/main.service";

export class VehicleService{
    static async getAllVehicles(){
        return await useAxiosWithoutAuthorisation('/vehicle')
    }

    static async getVehicleById(id){
        return await useAxiosWithoutAuthorisation('/vehicle/' + id)
    }
}

