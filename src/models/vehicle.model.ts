export interface VehicleModel {
    vehicleId: number,
    name: string,
    numberOfDoors: string,
    numberOfSeats: string,
    price: number,
    mileage: number,
    productionYear: number,
    horsepower: number,
    kilowatts: number,
    createdAt: string,
    updatedAt: string,
    transmission: {
        name: string,
        createdAt: string,
        updatedAt: string,
    },
    fuelType: {
        name: string,
        createdAt: string,
        updatedAt: string,
    },
    model: {
        name: string,
        createdAt: string,
        updatedAt: string,
        brand: {
            name: string,
            createdAt: string,
            updatedAt: string,
        }
    },
    body: {
        name: string,
        createdAt: string,
        updatedAt: string,
    },
    color: {
        name: string,
        createdAt: string,
        updatedAt: string,
    },
    user: {
        username: string,
    },
    vehicleEquipments: {
        equipmentId: number
    },
    vehicleImages: {
        imageId: number
    }
}