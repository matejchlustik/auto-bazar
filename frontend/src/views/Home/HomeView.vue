<template>
    <div class="container">
        <SearchBar />
        <div class="offers-container">
            <h1>Najnovšie inzeráty</h1>
            <h2 class="error-message" v-if="pending">Načítavanie...</h2>
            <h2 class="error-message" v-if="error && !pending">{{ error }}</h2>
            <div v-if="latestOffers && !pending" class="offers">
                <div class="flex-offer" v-for="offer in latestOffers" :key="offer._id">
                    <router-link :to="{ name: 'offer', params: { id: offer._id } }">
                        <OfferCard :offer="offer" />
                    </router-link>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import useFetch from "@/composables/useFetch"
import OfferCard from "@/components/OfferCard"
import SearchBar from "./SearchBar"

import { onMounted } from "vue"

export default {
    components: {
        OfferCard,
        SearchBar
    },
    setup() {
        const { data: latestOffers, pending, error, getData } = useFetch(`api/offers/latest`)

        onMounted(async () => {
            getData()
        })

        return { latestOffers, pending, error }
    }
}
</script>

<style scoped>
.offers-container {
    background-color: #fff;
    border-radius: 10px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.65) 16px 16px 8px;
    margin: 40px 0px;
}

.offers {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    padding-bottom: 10px;
}

.flex-offer {
    box-sizing: border-box;
    margin: 1%;
    flex-basis: 30%
}

h1 {
    text-align: center;
}

a:link {
    text-decoration: none;
    color: inherit;
}

a:visited {
    text-decoration: none;
    color: inherit;
}

@media only screen and (max-width: 1120px) {
    .flex-offer {
        flex-basis: 40%;
    }
}

@media only screen and (max-width: 900px) {
    .offers {
        flex-direction: column;
    }

    .flex-offer {
        width: 75%;
        margin: 3% auto;
    }

    .container {
        width: 85%
    }
}
</style>