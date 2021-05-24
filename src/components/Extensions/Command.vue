<template>
    <node-view-wrapper class="code-block">
        <select contenteditable="false" v-model="selectedLanguage">
            <option :value="null">
                auto
            </option>
            <option disabled>
                —
            </option>
            <option v-for="(language, index) in languages" :value="language" :key="index">
                {{ language }}
            </option>
        </select>
        <pre><node-view-content as="code" /></pre>
    </node-view-wrapper>
</template>

<script>
export default {
    name: "Command.vue"
}
</script>

<style scoped>

</style>