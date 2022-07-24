<template>
    <div class="input-div">
        <label v-if="label">{{ label }}</label>
        <select v-if="type === 'select'" :value="modelValue" @input="handleInput" :required="required">
            <option value="" selected disabled>Vyberte z možností</option>
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
        <input v-else-if="type === 'text'" type="text" :placeholder="placeholder" :value="modelValue"
            @input="handleInput" :required="required">
        <input v-else type="number" :placeholder="placeholder" :value="modelValue" @input="handleInput"
            :required="required">
        <div class="error" v-if="error">
            <p>{{ error }}</p>
        </div>

    </div>
</template>

<script>
import { ref } from 'vue'

export default {
    props: ["placeholder", "label", "modelValue", "type", "options", "error", "require"],
    setup(props, { emit }) {
        const required = ref(true)
        if (props.require === false) {
            required.value = false
        }

        const handleInput = (e) => {
            emit("update:modelValue", e.target.value)
        }

        return { handleInput, required }
    }
}
</script>
    
<style scoped>
.input-div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
    box-sizing: border-box;
    width: 100%;
}

input,
select {
    border: none;
    padding: 6px;
    width: 100%;
    font-size: 18px;
    border: 0.5px solid rgba(0, 0, 0, 0.374);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.754);
    box-sizing: border-box;
    outline: none;
    background-color: #fff;
}

input:focus {
    outline: rgba(0, 0, 0, 0.628) solid 1px;
}

select:focus {
    outline: rgba(0, 0, 0, 0.628) solid 1px;
}

::placeholder {
    color: rgba(0, 0, 0, 0.15)
}

label {
    margin-bottom: 6px;
    color: black;
    align-self: flex-start;
    text-align: left;
}

.error {
    text-align: left;
    align-self: flex-start;
}

p {
    word-wrap: break-word;
    color: rgb(255, 86, 86);
    margin: 0;
    margin-top: 4px;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
}

input[type=number] {
    -moz-appearance: textfield;
}
</style>