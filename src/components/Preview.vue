<template>
    <v-container class="pa-0 ma-0">
        <v-app-bar color="blue darken-3">
            <v-btn icon @click="setContent">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-toolbar-title>Preview</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon>
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-app-bar>
        <div class="export">
            <h3>JSON</h3>
            <pre><code v-html="json"></code></pre>
        </div>
    </v-container>
</template>

<script>
    import store from '../store'
    //import Ebitor from './Editor'

    export default {
        name: "Preview",
        methods: {
            setJson(attr) {
                this.json = attr
            }
        },
        data() {
            return {
                json: store.state.document.selectedDocument.content,
                onUpdate: () => {
                    //this.json = Ebitor.getDocumentContent()

                    // console.log(this.getDocumentContent())
                }

            }
        },
    }
</script>

<style scoped>

</style>