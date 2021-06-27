<template>
    <v-container class="prevCon pa-0 ma-0">
        <v-app-bar color="blue darken-3">
            <v-toolbar-title class="toolbarTitle">Preview</v-toolbar-title>
            <v-tabs class="tabs" v-model="tab" centered slider-color="yellow">
                <v-tab v-for="lang in language" :key="lang">
                    {{lang}}
                </v-tab>
            </v-tabs>
            <v-spacer></v-spacer>
            <v-btn icon @click="compile">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-btn icon>
                <v-icon>mdi-download</v-icon>
            </v-btn>
        </v-app-bar>
        <v-tabs-items v-model="tab" >
            <v-tab-item v-for="lang in language" :key="lang">
                <keep-alive>
                    <v-container class="scrollyPollyPreview pa-0">
<!--                        <v-card><p>{{lang}}</p></v-card>-->
                        <PreviewContent v-bind:lang="lang" class="preview__content ma-0 pa-0"></PreviewContent>
                    </v-container>
                </keep-alive>
            </v-tab-item>
<!--            <v-tab-item>-->
<!--                <keep-alive>-->
<!--                    <v-container class="scrollyPollyPreview pa-0">-->
<!--                        <PreviewContent v-bind:lang="language.english" class="preview__content ma-0 pa-0"></PreviewContent>-->
<!--                    </v-container>-->
<!--                </keep-alive>-->
<!--            </v-tab-item>-->
        </v-tabs-items>
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
        created() {
            console.log("created Preview" + this.bilingual)
        },
        computed: {
            documentContent() {
                return store.state.document.activeDocument.content
            },
            html() {
                console.log('html: ' + store.state.document.html)
                return store.state.document.html
            },
            bilingual() {
                console.log("test" + store.state.module.selectedModule.bilingual)
                return store.state.module.selectedModule.bilingual
            },
            language() {
                return this.bilingual ? ["german", "english"] : ["german"]
            },
        },
        methods: {
            getDocumentContent() {
                this.json = this.documentContent
            },
            setPreview() {
                console.log('set: ' + this.html)
            },
            compile() {
                store.dispatch('document/sendCompilePost')
            },
        },
        data() {
            return {
                json: store.state.document.activeDocument.content,
                // language:
                // english: "english",
                // german: "german",
                tab: null,
            }
        },
    }
</script>

<style scoped>
    .tabs {
        width: 75%;
    }

    .scrollyPollyPreview {
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