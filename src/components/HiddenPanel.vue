<template>
    <v-expansion-panels>
        <v-expansion-panel>
            <v-expansion-panel-header :contenteditable="false">Show Answer</v-expansion-panel-header>
            <v-expansion-panel-content :contenteditable="false">
                <p ref="content" class="hiddenContent" :contenteditable="true"> </p>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </v-expansion-panels>
</template>

<script>
    export default {
        props: ['node', 'updateAttrs', 'view'],
        computed: {

        },
        methods: {

        },
        name: "HiddenPanel"
    }
</script>

<style scoped>

</style>