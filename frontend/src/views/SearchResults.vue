<template>
    <div class="container">
        <h2 class="error-message" v-if="pending">Načítavanie...</h2>
        <h2 class="error-message" v-if="error && !pending">{{ error }}</h2>
        <div class="offers-container" v-if="offers && !pending">
            <div class="flex-offer" v-for="offer in offers" :key="offer._id">
                <router-link :to="{ name: 'offer', params: { id: offer._id } }">
                    <OfferCard :offer="offer" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import OfferCard from "@/components/OfferCard.vue"
import useFetch from '@/composables/useFetch';

import { onMounted } from 'vue';
import { useRoute } from 'vue-router'

export default {
    components: {
        OfferCard
    },
    setup() {
        const route = useRoute()
        const queryString = new URLSearchParams(route.query).toString();
        const { data: offers, pending, error, getData } = useFetch(`${process.env.VUE_APP_API_URL}/api/offers/search?${queryString}`)

        onMounted(async () => {
            getData()
        })

        return { offers, pending, error }
    }
}
</script>

<style scoped>
.offers-container {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-bottom: 10px;
    width: 100%;
}

.flex-offer {
    box-sizing: border-box;
    margin: 2%;
    flex-basis: 28%
}

a:link {
    text-decoration: none;
    color: inherit;
}

a:visited {
    text-decoration: none;
    color: inherit;
}

h2 {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
}

@media only screen and (max-width: 1120px) {
    .flex-offer {
        flex-basis: 40%;
    }
}

@media only screen and (max-width: 900px) {
    .container {
        width: 85%
    }
}

@media only screen and (max-width: 550px) {
    .container {
        width: 85%
    }

    .offers-container {
        flex-direction: column;
    }

    .flex-offer {
        margin: 4%
    }
}
</style>