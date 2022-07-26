<template>
    <div class="image-preview">
        <div class="main-image">
            <img :src="main_image" alt="main car image">
        </div>
        <div class="image-selection">
            <div class="select-image" v-for="image in images" :key="image" @click="changeImage(image)">
                <img :src="image" alt="car image">
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ["images"],

    setup(props) {
        const main_image = ref(props.images[0])

        const changeImage = (src) => {
            main_image.value = src
        }

        return { main_image, changeImage }
    }
}
</script>

<style scoped>
.image-preview {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.image-selection {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 20px;
}

.main-image {
    display: flex;
    justify-content: center;
    padding: 15px;
    max-height: 500px;
}

.main-image img {
    max-width: 100%;
    height: auto;
    object-fit: scale-down;
    padding: 10px;
    box-sizing: border-box;
}

.select-image {
    display: flex;
    justify-content: center;
    margin: 8px;
    flex-basis: 20%;
    cursor: pointer;
    max-height: 150px;
}

.select-image img {
    max-width: 100%;
    height: auto;
    object-fit: scale-down;
}
</style>