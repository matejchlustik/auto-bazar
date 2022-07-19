<template>
    <div class="card">
        <h2>{{ offer.make }} {{ offer.model }}</h2>
        <span>cena: {{ offer.price }} €</span>
        <span>kilometre: {{ offer.km }} km</span>
        <span>tel: {{ offer.contact.number }}</span>
        <img :src="offer.images[0]">
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
}

span {
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
</style>