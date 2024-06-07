import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class TransmissionService{
    static async getAllTransmissions(){
        return await useAxiosWithoutAuthorisation('/transmission')
    }

    static async getTransmissionById(id: number){
        return await useAxiosWithoutAuthorisation('/transmission/' + id)
    }
}