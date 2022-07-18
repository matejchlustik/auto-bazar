import { ref } from "vue"

const getSelectValues = () => {

    const motorcycleMakes = ref(null)
    const carMakes = ref(null)
    const err = ref(null)

    const vehicleCategories = ["Osobné a úžitkové autá", "Motocykle, skútre a štvorkolky"]
    const fuelTypes = ["Benzín", "Diesel", "LPG + benzín", "CNG", "Hybrid", "Elektromotor", "Bioetanol"]

    const getValues = async () => {
        try {
            const motorcycleRes = await fetch("https://raw.githubusercontent.com/evghenix/Cars-Motorcycles-DataBase-JSON/master/moto_brands.json")
            const carRes = await fetch("https://raw.githubusercontent.com/evghenix/Cars-Motorcycles-DataBase-JSON/master/car_brands.json")
            if (!motorcycleRes.ok || !carRes.ok) {
                throw Error("Failed to fetch")
            }
            let motorcycleData = await motorcycleRes.json()
            let carData = await carRes.json()
            motorcycleMakes.value = (Object.values(motorcycleData)[0].map(item => item.name))
            carMakes.value = (Object.values(carData)[0].map(item => item.name))
        } catch (error) {
            err.value = error
        }
    }
    getValues()

    return { motorcycleMakes, carMakes, vehicleCategories, fuelTypes, err }
}

export default getSelectValues
