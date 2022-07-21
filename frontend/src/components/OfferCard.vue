<template>
    <div class="card">
        <h2>{{ offer.make }} {{ offer.model }}</h2>
        <span>cena: {{ offer.price }} €</span>
        <span>kilometre: {{ offer.km }} km</span>
        <span>ročník: {{ offer.year }}</span>
        <img v-if="offer.images.length > 0" :src="offer.images[0]">
        <div v-else class="no-images">
            <span>Žiadne obrázky</span>
        </div>
    </div>
</template>

<script>

export default {
    props: ["offer"],

}
</script>

<style scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 10px;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.65) 0px 6px 8px;
}

img {
    max-width: 80%;
    height: auto;
    object-fit: scale-down;
    margin: 15px 0px;
    margin-top: auto;
}

span {
    display: block;
    margin: 10px 0px;
    box-sizing: border-box;
    padding: 0px 20px;
    width: 100%;
    text-align: left;
}

h2 {
    margin: 10px 0px;
    box-sizing: border-box;
    padding: 0px 20px;
    width: 100%;
    text-align: left;
    font-size: 22px;
}

.no-images {
    display: flex;
    align-items: center;
    height: 100%;
    width: 100%;
    margin: 10px 0px;
    box-sizing: border-box;
    padding: 0px 20px;
}

.no-images span {
    font-size: 18px;
    padding: 0;
}
</style>