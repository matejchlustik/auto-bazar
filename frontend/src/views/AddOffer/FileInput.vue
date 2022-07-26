<template>
    <div class="file-input-half">
        <h2>Obrázky</h2>
        <div class="file-input-button-container">
            <label class="file-input-button">
                Nahrať súbory
                <input type="file" @change="fileInputChange" multiple accept="image/*">
            </label>
            <div class="error">
                <p v-if="error">{{ error }}</p>
            </div>
        </div>
        <div class="file-input" :class="{ active: active }" @drop.prevent="onDrop" @dragover.prevent="setActive"
            @dragenter.prevent="setActive" @dragleave.prevent="setInactive">
            <h3 v-if="files.length === 0">Pre nahranie súborov ich potiahnite sem</h3>
            <div v-else class="images">
                <img v-for="file in files" :key="file.id" :src="file.source" alt="car image for upload"
                    @click.right.prevent="removeFile(file.id)" />
            </div>
        </div>
        <div class="delete-message">
            <p>Pre vymazanie súboru naň kliknite pravým talčidlom</p>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {

    setup(_, { emit }) {
        const files = ref([])
        const active = ref(false)
        const error = ref(null)
        let fileId = 1
        let inActiveTimeout = null

        function setActive() {
            active.value = true
            clearTimeout(inActiveTimeout)
        }

        function setInactive() {
            inActiveTimeout = setTimeout(() => { active.value = false }, 50)
        }

        const onDrop = (e) => {
            setInactive()
            Array.from(e.dataTransfer.files).forEach((file) => {
                if (file.type.includes("image")) {
                    let reader = new FileReader()
                    reader.readAsDataURL(file)
                    reader.onloadend = () => {
                        files.value.push({ name: file.name, source: reader.result, id: fileId })
                        emit("upload", { name: file.name, source: reader.result, id: fileId })
                        fileId++;
                    }
                } else {
                    error.value = "Nahrávajte iba obrázky"
                    console.log(error.value)
                }
            })
        }

        const fileInputChange = (e) => {
            Array.from(e.target.files).forEach((file) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => {
                    files.value.push({ name: file.name, source: reader.result, id: fileId })
                    emit("upload", { name: file.name, source: reader.result, id: fileId })
                    fileId++;
                }
            })
        }

        const removeFile = (fileId) => {
            emit("remove", fileId)
            files.value = files.value.filter(file => {
                return file.id !== fileId
            })
        }

        return { files, active, error, onDrop, fileInputChange, setActive, setInactive, removeFile }
    }

}
</script>

<style scoped>
.file-input-half {
    margin: 0px 40px;
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
}

h2 {
    text-align: left;
    padding: 10px;
    margin-top: 16px;
    margin-bottom: 0;
}

input {
    margin: 0 auto;
    padding: 10px;
}

.file-input {
    display: flex;
    margin-top: 3%;
    border: 4px dashed rgb(86, 137, 255);
    border-radius: 4px;
    padding: 12px;
    flex: 1;
    box-sizing: border-box;
}

.active {
    border: 4px dashed rgb(255, 86, 86);
}

h3 {
    color: rgb(86, 137, 255);
    align-self: center;
    margin: 0 auto;
}

.images {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-content: flex-start;
    flex: 1;
}

img {
    margin: 6px;
    max-height: 100px;
}

img:hover {
    cursor: pointer
}

.delete-message {
    text-align: left;
    color: rgb(86, 137, 255);
}

.file-input-button {
    display: inline-block;
    box-sizing: border-box;
    color: #fff;
    background-color: rgb(86, 137, 255);
    padding: 8px 20px 8px 20px;
    border-radius: 6px;
    font-size: 16px;
    cursor: pointer;
}

.file-input-button-container {
    text-align: left;
    margin-top: 15px;
}

.file-input-button:active {
    background-color: rgba(86, 137, 255, 0.493);
}

input[type="file"] {
    display: none;
}

.error {
    text-align: left;
}

.error p {
    word-wrap: break-word;
    color: rgb(255, 86, 86);
    margin: 0;
    margin-top: 14px;
}
</style>