<template>
    <div class="search-bar">
        <h1>Vyhľadávanie</h1>
        <form @submit.prevent="handleSubmit" v-if="!err">
            <div class="form-content">
                <div class="row">
                    <FormInput type="select" label="Kategória vozidla" :options="vehicleCategories"
                        v-model="formData.category" />
                    <FormInput type="select" label="Značka"
                        :options="formData.category === 'Osobné a úžitkové autá' ? carMakes : motorcycleMakes"
                        :require="false" v-model="formData.make" />
                    <FormInput type="text" label="Model" :require="false" v-model="formData.model" />
                    <FormInput type="select" label="Typ Paliva" :options="fuelTypes" :require="false"
                        v-model="formData.fuel" />
                </div>
                <div class="row bottom-row">
                    <FormInput type="number" label="Rok" :require="false" v-model="formData.year" />
                    <FormInput type="number" label="Najazdené kilometre" :require="false" v-model="formData.km" />
                    <FormInput type="number" label="Cena" :require="false" v-model="formData.price" />
                    <div class="submit-btn">
                        <input type="submit" value="Hľadať">
                    </div>
                </div>
            </div>
        </form>
        <h2 class="error-message" v-else>There has been an error</h2>
    </div>
</template>

<script>
import { reactive } from "vue"
import { useRouter } from "vue-router"

import FormInput from "../../components/FormInput"

import getSelectValues from "../../composables/getSelectValues"

export default {
    components: {
        FormInput
    },
    setup() {
        const router = useRouter()
        const { motorcycleMakes, carMakes, vehicleCategories, fuelTypes, err } = getSelectValues()

        const formData = reactive({
            category: "",
            make: "",
            model: "",
            fuel: "",
            year: "",
            km: "",
            price: "",
        })

        const handleSubmit = () => {
            const cleanedQueryString = Object.entries(formData).reduce((acc, [k, v]) => v ? { ...acc, [k]: v } : acc, {})
            router.push({
                name: "searchResults",
                query: { ...cleanedQueryString }
            })
        }

        return { formData, motorcycleMakes, carMakes, vehicleCategories, fuelTypes, err, handleSubmit }
    }
}
</script>

<style scoped>
h1 {
    text-align: center;
}

.row {
    display: flex;
    flex-direction: row;
    padding: 0px 40px;
    justify-content: space-between;
}

.bottom-row {
    margin-bottom: 30px;
}

.form-content {
    display: flex;
    flex-direction: column;
    margin: 0 auto;
}

.search-bar {
    margin: 25px auto;
    background-color: #fff;
    border-radius: 10px;
    padding: 10px 60px;
    box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
}

input[type=submit] {
    color: #fff;
    background-color: rgb(86, 137, 255);
    padding: 8px 24px;
    border-radius: 6px;
    border: none;
    font-size: 18px;
    cursor: pointer;
    outline: none;
}

input[type=submit]:active {
    background-color: rgba(86, 137, 255, 0.493);
}

.submit-btn {
    display: flex;
    align-items: flex-end;
    padding: 10px;
}

@media only screen and (max-width: 1450px) {

    .row {
        flex-wrap: wrap;
    }

    :deep(.input-div) {
        flex-basis: 40%;
    }
}

@media only screen and (max-width: 900px) {
    .row {
        flex-direction: column;
        padding: 0;
    }
}
</style>