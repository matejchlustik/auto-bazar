<template>
    <div class="search-results">
        <div class="offers-container">
            <div class="flex-offer" v-for="offer in offers" :key="offer._id">
                <router-link :to="{ name: 'offer', params: { id: offer._id } }">
                    <OfferCard :offer="offer" />
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router'

import OfferCard from "../components/OfferCard.vue"

export default {
    components: {
        OfferCard
    },
    setup() {
        const route = useRoute()
        const offers = ref(null)
        const queryString = new URLSearchParams(route.query).toString();

        console.log(offers)

        onMounted(async () => {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/api/offers/search?${queryString}`)
                if (!res.ok) {
                    throw Error("Something went wrong")
                }
                offers.value = await res.json()
            } catch (error) {
                console.log(error);
            }
        })

        return { offers }

    }
}
</script>

<style scoped>
.search-results {
    margin: 0 auto;
    width: 60%;
    box-sizing: border-box;
}

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
</style>