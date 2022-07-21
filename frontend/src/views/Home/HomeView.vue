<template>
    <div class="home">
        <SearchBar />
        <div class="offers-container">
            <h1>Najnovšie inzeráty</h1>
            <div class="offers">
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
import { onMounted, ref } from "vue"

import OfferCard from "../../components/OfferCard"
import SearchBar from "./SearchBar"
export default {
    components: {
        OfferCard,
        SearchBar
    },
    setup() {
        const latestOffers = ref(null)

        onMounted(async () => {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/api/offers/latest`)
                const data = await res.json()
                latestOffers.value = data;
            } catch (error) {
                console.log(error);
            }
        })

        return { latestOffers }
    }
}
</script>

<style scoped>
.home {
    margin: 0 auto;
    width: 60%;
    box-sizing: border-box;
}

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
</style>