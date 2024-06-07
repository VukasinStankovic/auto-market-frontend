import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class ColorService{
    static async getAllColors(){
        return await useAxiosWithoutAuthorisation('/color')
    }

    static async getColorById(id: number){
        return await useAxiosWithoutAuthorisation('/color/' + id)
    }
}