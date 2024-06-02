import {useAxios} from "@/services/main.service";

export class VehicleService{
    static async getAllVehicles(){
        return await useAxios('/vehicle')
    }
}

