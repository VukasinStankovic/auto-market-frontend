export interface ModelModel {
    modelId: number,
    name: string,
    createdAt: string | null,
    updatedAt: string | null,
    brand: {
        brandId: number,
        name: string,
        createdAt: string | null,
        updatedAt: string | null
    }
}