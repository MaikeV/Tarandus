<template>
    <v-container class="prevCon pa-0 ma-0">
        <v-app-bar color="blue darken-3">
            <v-toolbar-title >Preview</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="compile">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-app-bar>
        <v-container class="scrollyPollyPreview">
            <PreviewContent class="preview__content"></PreviewContent>
        </v-container>
    </v-container>
</template>

<script>
    import store from '../store'
    import PreviewContent from "./PreviewContent";

    export default {
        name: "Preview",
        components: {
            PreviewContent,
        },
        computed: {
            documentContent() {
                return store.state.document.activeDocument.content
            },
            html() {
                console.log('html: ' + store.state.document.html)
                return store.state.document.html
            }
        },
        methods: {
            getDocumentContent() {
                this.json = this.documentContent
            },
            setPreview() {
                console.log('set: ' + this.html)
                // this.$el.querySelector('.preview').setAttribute('srcdoc', this.html)
            },
            compile() {
                store.dispatch('document/sendCompilePost')
            },
        },
        data() {
            return {
                json: store.state.document.activeDocument.content,
            }
        },
    }
</script>

<style scoped>

    .scrollyPollyPreview {
        overflow-y: scroll;
        position: fixed;
        width: 41.7%;
        height: 87%;
        margin-bottom: 60px;
    }

    .menubar {
        width: 100%;
    }

    .prevCon {
        height: 100%;
    }

    .preview__content {
        height: 100%;
        width: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
    }
</style>