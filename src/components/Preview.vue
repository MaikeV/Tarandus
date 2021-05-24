<template>
    <v-container class="prevCon pa-0 ma-0">
        <v-app-bar color="blue darken-3">
            <div class="menubar">
                <v-container fluid>
                    <v-row>
                        <v-col cols="2" class="align-center">
                            <v-btn icon @click="compile" class="align-center">
                                <v-icon>mdi-refresh</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col cols="8">
                            <v-toolbar-title class="text-start">Preview</v-toolbar-title>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-col cols="2" class="justify-end">
                            <v-btn icon>
                                <v-icon>mdi-download</v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-app-bar>
        <PreviewContent class="preview__content"></PreviewContent>
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