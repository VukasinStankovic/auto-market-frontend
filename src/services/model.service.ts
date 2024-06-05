import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class ModelService{
    static async getAllModels(){
        return await useAxiosWithoutAuthorisation('/model')
    }

    static async getModelById(id: number){
        return await useAxiosWithoutAuthorisation('/model/' + id)
    }
}

