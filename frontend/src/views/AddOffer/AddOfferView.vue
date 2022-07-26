<template>
  <div class="container form-container">
    <h1>Pridanie inzerátu</h1>
    <form @submit.prevent="handleSubmit" v-if="!err">
      <div class="form-content">
        <div class="form-half">
          <div class="quarter">
            <h2>Informácie o vozidle</h2>
            <FormInput label="Kategória vozidla" type="select" :options="vehicleCategories" :error="formErrors.category"
              v-model="formData.category" />
            <FormInput label="Značka" type="select"
              :options="formData.category === 'Osobné a úžitkové autá' ? carMakes : motorcycleMakes"
              :error="formErrors.category" v-model="formData.make" />
            <FormInput placeholder="Octavia" label="Model" type="text" :error="formErrors.model"
              v-model="formData.model" />
            <FormInput label="Typ paliva" type="select" :options="fuelTypes" :error="formErrors.fuel"
              v-model="formData.fuel" />
            <FormInput placeholder="2010" label="Rok" type="number" :error="formErrors.year" v-model="formData.year" />
            <FormInput placeholder="24000" label="Najazdené kilometre" type="number" :error="formErrors.km"
              v-model="formData.km" />
            <FormInput placeholder="8000" label="Cena" type="number" :error="formErrors.price"
              v-model="formData.price" />
          </div>
          <div class="quarter">
            <h2>Kontaktné informácie</h2>
            <FormInput placeholder="Martin Novák" label="Meno" type="text" :error="formErrors.contact.name"
              v-model="formData.contact.name" />
            <FormInput placeholder="Nitra" label="Mesto" type="text" :error="formErrors.contact.city"
              v-model="formData.contact.city" />
            <FormInput placeholder="Dolná" label="Ulica" type="text" :error="formErrors.contact.street"
              v-model="formData.contact.street" />
            <FormInput placeholder="41" label="Číslo domu" type="text" :error="formErrors.contact.house_number"
              v-model="formData.contact.house_number" />
            <FormInput placeholder="945 22" label="PSČ" type="text" :error="formErrors.contact.postal_code"
              v-model="formData.contact.postal_code" />
            <FormInput placeholder="+421 123 123" label="Tel.číslo" type="text" :error="formErrors.contact.number"
              v-model="formData.contact.number" />
            <FormInput placeholder="abc@gmail.com" label="Email" type="text" :error="formErrors.contact.email"
              v-model="formData.contact.email" />
          </div>
        </div>
        <FileInput @upload="handleUpload" @remove="removeFile" />
      </div>
      <div class="submit-btn">
        <input type="submit" value="Pridať">
      </div>
    </form>
    <h2 class="error-message" v-else>There has been an error</h2>
  </div>
</template>

<script>
import FormInput from "@/components/FormInput"
import getSelectValues from "@/composables/getSelectValues"
import FileInput from "./FileInput"

import { reactive } from 'vue'

export default {
  components: {
    FormInput,
    FileInput
  },
  setup() {
    const { motorcycleMakes, carMakes, vehicleCategories, fuelTypes, err } = getSelectValues()

    const initialFormData = () => ({
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
        street: "",
        house_number: "",
        postal_code: "",
        number: "",
        email: ""
      },
      images: []
    });

    const formData = reactive({ ...initialFormData() })
    const formErrors = reactive({ ...initialFormData() })

    const handleUpload = (file) => {
      formData.images.push({ source: file.source, id: file.id })
    }

    const removeFile = (fileId) => {
      formData.images = formData.images.filter(file => {
        return file.id !== fileId
      })
    }

    const handleSubmit = async () => {
      Object.assign(formErrors, initialFormData());
      if (!formValidation()) {
        return
      }
      try {
        const res = await fetch(`${process.env.VUE_APP_API_URL}/api/offers`, {
          method: "POST",
          body: JSON.stringify(formData),
          headers: { "Content-type": "application/json" }
        })
        if (!res.ok) {
          throw Error("Something went wrong")
        }
        const data = await res.json()
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const formValidation = () => {
      let validation = true
      if (formData.year.length !== 4 || !/^\d+$/.test(formData.year)) {
        formErrors.year = "Nesprávny rok"
        validation = false
      }
      if (!/^\d+$/.test(formData.km)) {
        formErrors.km = "Nesprávny formát, použite iba celé čísla"
        validation = false
      }
      if (!/^\d+$/.test(formData.price)) {
        formErrors.price = "Nesprávny formát, použite iba celé čísla"
        validation = false
      }
      if (!/^\d{3}\s+\d{2}/.test(formData.contact.postal_code)) {
        formErrors.contact.postal_code = "Nesprávny formát "
        validation = false
      }
      if (!/^[+]?[()/0-9. -]{9,}$/.test(formData.contact.number)) {
        formErrors.contact.number = "Nesprávny formát čísla"
        validation = false
      }
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.contact.email)) {
        formErrors.contact.email = "Nesprávny email"
        validation = false
      }
      return validation
    }

    return { formData, formErrors, vehicleCategories, fuelTypes, carMakes, motorcycleMakes, err, handleUpload, handleSubmit, removeFile }
  }
}
</script>

<style scoped>
.form-container {
  background-color: #fff;
  margin-bottom: 20px;
  padding: 15px 0px;
  text-align: center;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
}

.form-container h1 {
  padding: 24px;
  padding-bottom: 0px;
  margin: 0;
}

.form-content {
  display: flex;
  flex-direction: row;
  width: 95%;
  margin: 0 auto;

}

.form-half {
  margin: 0 auto;
  flex-basis: 50%;
  display: flex;
  flex-direction: row;
}

.quarter {
  flex-basis: 50%;
  padding: 15px;
  margin-right: 30px;
}

.quarter h2 {
  text-align: left;
  padding: 10px;
  margin: 0 auto;
}

.submit-btn {
  padding: 6px;
  margin: 0px 6px;
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

@media only screen and (max-width: 700px) {

  .form-half {
    flex-direction: column;
  }

  .form-container {
    margin: 0 auto;
    width: 85%;
  }
}

@media only screen and (max-width: 1100px) {
  .form-content {
    flex-direction: column;
  }
}
</style>