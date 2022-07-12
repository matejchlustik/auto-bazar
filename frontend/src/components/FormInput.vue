<template>
    <div class="input-div">
        <label>{{ label }}</label>
        <select v-if="type === 'select'" :value="modelValue" @input="handleInput" required>
            <option value="" selected disabled>Vyberte z možností</option>
            <option v-for="option in options" :key="option" :value="option">{{ option }}</option>
        </select>
        <input v-else type="text" :placeholder="placeholder" :value="modelValue" @input="handleInput" required>
    </div>
</template>

<script>
export default {
    props: ["placeholder", "label", "modelValue", "type", "options"],
    setup(_, { emit }) {
        const handleInput = (e) => {
            emit("update:modelValue", e.target.value)
        }

        return { handleInput }
    }
}
</script>
    
<style scoped>
.input-div {
    display: flex;
    flex-direction: column;
    padding: 10px;
    margin: 4px auto;
    align-items: left;
    width: 80%;
}

input,
select {
    border: none;
    padding: 6px 6px 6px 6px;
    width: 95%;
    font-size: 18px;
    border: 0.5px solid rgba(0, 0, 0, 0.374);
    border-radius: 4px;
    color: rgba(0, 0, 0, 0.754);
    box-sizing: border-box;
}

input :focus {
    outline: rgba(0, 0, 0, 0.628) solid 1px;
}

::placeholder {
    color: rgba(0, 0, 0, 0.15)
}

label {
    margin-bottom: 6px;
    font-size: 16px;
    color: black;
    align-self: flex-start;
    text-align: left;
}
</style>