<template>
    <div class="card">
        <h2>{{ offer.make }} {{ offer.model }}</h2>
        <ul>
            <li>cena: {{ offer.price }} €</li>
            <li>kilometre: {{ offer.km }} km</li>
            <li>ročník: {{ offer.year }}</li>
        </ul>
        <div class="images" v-if="offer.images.length > 0">
            <img :src="offer.images[0]">
        </div>
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
    border-radius: 10px;
    background-color: #fff;
    height: 100%;
    box-sizing: border-box;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.65) 0px 6px 8px;
}

ul {
    padding: 0px 20px;
    list-style-type: none;
}

li {
    margin-bottom: 14px;
}

h2 {
    margin: 10px 0px;
    padding: 0px 20px;
    font-size: 22px;
    text-align: center;
}

.images {
    align-self: center;
    display: flex;
    justify-content: center;
}

img {
    max-width: 80%;
    height: auto;
    object-fit: scale-down;
    margin: 15px 0px;
    margin-top: auto;
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