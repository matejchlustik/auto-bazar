<template>
    <div class="single-offer">Hello</div>
</template>

<script>
import { onMounted, ref } from 'vue'


export default {
    props: ["id"],
    setup(props) {
        const offer = ref(null)

        onMounted(async () => {
            try {
                const res = await fetch(`${process.env.VUE_APP_API_URL}/api/offers/${props.id}`)
                const data = await res.json()
                offer.value = data;
            } catch (error) {
                console.log(error);
            }
        })

        return { offer }
    }

}
</script>

<style scoped>
</style>