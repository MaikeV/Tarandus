<template>
    <v-container class="pa-0 ma-0">
        <v-app-bar color="blue darken-3">
            <v-btn icon @click="getDocumentContent()">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-toolbar-title>Preview</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-app-bar>
<!--        <div class="export">-->
<!--            <h3>JSON</h3>-->
<!--            <pre><code v-html="json"></code></pre>-->
<!--        </div>-->
    </v-container>
</template>

<script>
    import store from '../store'

    export default {
        name: "Preview",
        computed: {
            documentContent() {
                return store.state.document.activeDocument.content
            }
        },
        methods: {
            getDocumentContent() {
                this.json = this.documentContent
            }
        },
        data() {
            return {
                json: store.state.document.activeDocument.content,
            }
        },
    }
</script>

<style scoped>

</style>