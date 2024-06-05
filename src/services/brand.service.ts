import {useAxiosWithoutAuthorisation} from "@/services/main.service";

export class BrandService{
    static async getAllBrands(){
        return await useAxiosWithoutAuthorisation('/brand')
    }

    static async getBrandById(id: number){
        return await useAxiosWithoutAuthorisation('/brand/' + id)
    }
}
