import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class BodyService {
    static async getAllBodies(){
        return await useAxiosWithoutAuthorisation('/body')
    }

    static async getBodyById(id: number){
        return await useAxiosWithoutAuthorisation('/body/' + id)
    }
}