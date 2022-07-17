<template>
    <h1>Hello</h1>
</template>

<script>

import { useRoute } from 'vue-router'

export default {
    setup() {
        const route = useRoute()
        const formData = route.query;

        const searchQuery = {}
        for (const [key, value] of Object.entries(formData)) {
            if (value.length > 0) {
                if (key === "year" || key === "km") {
                    searchQuery[key] = { $gte: value };
                } else if (key === "price") {
                    searchQuery[key] = { $lte: value };
                } else {
                    searchQuery[key] = value;
                }
            }
        }

        // onMounted(async () => {
        //     try {
        //         const res = await fetch("http://localhost:5000/api/offers/search", {
        //             method: "POST",
        //             body: JSON.stringify(searchQuery),
        //             headers: { "Content-type": "application/json" }
        //         })
        //         const data = await res.json()
        //         console.log(data);
        //     } catch (error) {
        //         console.log(error);
        //     }
        // })

        console.log(searchQuery)
    }
}
</script>

<style scoped>
</style>