import { ref } from "vue"

const useFetch = (url) => {
    const data = ref(null)
    const pending = ref(true)
    const error = ref(false)

    const getData = async () => {
        try {
            const res = await fetch(url)
            if (!res.ok) {
                throw Error("Could not fetch the data")
            }
            data.value = await res.json()
            pending.value = false
        } catch (err) {
            error.value = err
            pending.value = false
        }
    }

    return { data, pending, error, getData }
}

export default useFetch
