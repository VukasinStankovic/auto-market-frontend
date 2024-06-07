import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class EquipmentService {
    static async getAllEquipment(){
        return await useAxiosWithoutAuthorisation('/equipment')
    }

    static async getEquipmentById(id: number){
        return await useAxiosWithoutAuthorisation('/equipment/' + id)
    }
}