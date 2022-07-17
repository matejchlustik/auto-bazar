<template>
    <div class="home">
        <SearchBar />
        <div class="offers">
            <OfferCard />
        </div>
    </div>
</template>

<script>
import OfferCard from "../../components/OfferCard"
import SearchBar from "./SearchBar"
export default {
    components: {
        OfferCard,
        SearchBar
    },
}
</script>

<style scoped>
.home {
    margin: 0 auto;
    width: 60%;
    box-sizing: border-box;
}

.offers {
    display: flex;
}
</style>