<template>
    <div class="container offer-detail">
        <h2 class="error-message" v-if="pending">Načítavanie...</h2>
        <h2 class="error-message" v-if="error && !pending">{{ error }}</h2>
        <div v-if="offer && !pending" class="single-offer">
            <h1>{{ offer.make }} {{ offer.model }}</h1>
            <div class="info">
                <div class="info-flex-item">
                    <h2>Informácie o aute</h2>
                    <ul>
                        <li>Cena: {{ offer.price }}</li>
                        <li>Najazdené kilometre: {{ offer.km }}</li>
                        <li>Palivo: {{ offer.fuel }}</li>
                        <li>Ročník: {{ offer.year }}</li>
                    </ul>
                </div>
                <div class="info-flex-item">
                    <h2>Kontakt</h2>
                    <ul>
                        <li>Meno: {{ offer.contact.name }}</li>
                        <li>Adresa: {{ offer.contact.street }} {{ offer.contact.house_number }},
                            {{ offer.contact.postal_code }}</li>
                        <li>Tel. číslo: {{ offer.contact.number }}</li>
                        <li>Email: {{ offer.contact.email }}</li>
                    </ul>
                </div>
            </div>
            <div class="images">

            </div>
        </div>
    </div>
</template>

<script>
import useFetch from '@/composables/useFetch'

import { onMounted } from 'vue'

export default {
    props: ["id"],
    setup(props) {

        const { data: offer, pending, error, getData } = useFetch(`${process.env.VUE_APP_API_URL}/api/offers/${props.id}`)

        onMounted(async () => {
            await getData()
        })

        return { offer, pending, error }
    }

}
</script>

<style scoped>
h1 {
    text-align: center;
    margin-bottom: 0;
}

.offer-detail {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
}

.single-offer {
    display: flex;
    flex-direction: column;
    padding: 10px 60px;
}

ul {
    padding: 0;
    list-style-type: none;
}

li {
    margin-bottom: 14px;
}

.info {
    display: flex;
    justify-content: space-evenly;
    box-sizing: border-box;
    padding: 25px;
    padding-top: 0;
}

.info-flex-item {
    box-sizing: border-box;
    padding: 10px;
    margin: 0 15px;
}

@media only screen and (max-width:800px) {
    .info {
        flex-direction: column;
        align-items: center;
    }

    .container {
        width: 85%;
    }
}
</style>