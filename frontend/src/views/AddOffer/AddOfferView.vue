<template>
  <div class="container">
    <h1>Pridanie ponuky</h1>
    <form @submit.prevent="handleSubmit">
      <div class="form-content">
        <div class="form-half">
          <div class="quarter">
            <h2>Informácie o vozidle</h2>
            <FormInput label="Kategória vozidla" type="select" :options="vehicleCategories"
              v-model="formData.category" />
            <FormInput label="Značka" type="select"
              :options="formData.category === 'Osobné a úžitkové autá' ? carMakes : motorcycleMakes"
              v-model="formData.make" />
            <FormInput placeholder="Octavia" label="Model" v-model="formData.model" />
            <FormInput label="Typ paliva" type="select" :options="fuelTypes" v-model="formData.fuel" />
            <FormInput placeholder="2010" label="Rok" v-model="formData.year" />
            <FormInput placeholder="24000" label="Najazdené kilometre" v-model="formData.km" />
            <FormInput placeholder="8000" label="Cena" v-model="formData.price" />
          </div>
          <div class="quarter">
            <h2>Kontaktné informácie</h2>
            <FormInput placeholder="Martin Novák" label="Meno" v-model="formData.contact.name" />
            <FormInput placeholder="Nitra" label="Mesto" v-model="formData.contact.city" />
            <FormInput placeholder="945 22" label="PSČ" v-model="formData.contact.postal_code" />
            <FormInput placeholder="+421 123 123" label="Tel.číslo" v-model="formData.contact.number" />
            <FormInput placeholder="abc@gmail.com" label="Email" v-model="formData.contact.email" />
          </div>
        </div>
        <FileInput @upload="handleUpload" @remove="removeFile" />
      </div>
      <div class="submit-btn">
        <input type="submit" value="Submit">
      </div>
    </form>
  </div>

</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import FormInput from "../../components/FormInput";
import FileInput from "./FileInput"

export default {
  components: {
    FormInput,
    FileInput
  },
  setup() {
    const motorcycleMakes = ref(null)
    const carMakes = ref(null)

    const formData = reactive({
      category: "",
      make: "",
      model: "",
      fuel: "",
      year: "",
      km: "",
      price: "",
      contact: {
        name: "",
        city: "",
        postal_code: "",
        number: "",
        email: ""
      },
      images: []
    });

    const vehicleCategories = ["Osobné a úžitkové autá", "Motocykle, skútre a štvorkolky"]
    const fuelTypes = ["Benzín", "Diesel", "LPG + benzín", "CNG", "Hybrid", "Elektromotor", "Bioetanol"]

    onMounted(async () => {
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
        console.log(error)
      }
    })

    const handleUpload = (file) => {
      formData.images.push({ source: file.source, id: file.id })
    }

    const removeFile = (fileId) => {
      formData.images = formData.images.filter(file => {
        return file.id !== fileId
      })
    }

    const handleSubmit = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/offers", {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-type": "application/json" }
        })
        const data = await res.json()
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    return { formData, vehicleCategories, fuelTypes, carMakes, motorcycleMakes, handleUpload, handleSubmit, removeFile }
  }
}
</script>

<style scoped>
.container {
  background-color: #fff;
  margin: 48px auto;
  width: 75%;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
}

.container h1 {
  padding: 24px;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0 auto;

}

.form-half {
  padding: 20px;
  padding-top: 0px;
  margin: 0 auto;
  flex-basis: 50%;
  display: flex;
  flex-direction: row;
}

.quarter {
  flex-basis: 50%;
  padding: 15px;
  margin: 0 auto
}

h2 {
  text-align: left;
  padding: 10px;
  width: 80%;
  margin: 0 auto;
}

input[type=submit] {
  color: #fff;
  background-color: rgb(86, 137, 255);
  padding: 8px 24px 8px 24px;
  margin: 20px auto;
  margin-bottom: 50px;
  border-radius: 6px;
  border: none;
  font-size: 18px;
  cursor: pointer;
  outline: none;
}

input[type=submit]:active {
  background-color: rgba(86, 137, 255, 0.493);
}

@media only screen and (max-width: 600px) {

  .form-half {
    flex-direction: column;
  }

  .container {
    width: 100%;
    margin: 0;
  }

}

@media only screen and (max-width: 850px) {
  .form-content {
    flex-direction: column;
  }
}
</style>