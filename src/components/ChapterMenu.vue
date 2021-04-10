<template>
<!--    <v-treeview  activatable item-key="name" open-on-click>-->
<!--        <template v-slot:prepend="{ item, open }">-->
<!--            <v-icon v-if="!item.file">-->
<!--                {{ open ? 'mdi-folder-open' : 'mdi-folder' }}-->
<!--            </v-icon>-->
<!--            <v-icon v-else>-->
<!--                {{ files[item.file] }}-->
<!--            </v-icon>-->
<!--        </template>-->
<!--    </v-treeview>-->
    <v-treeview v-model="tree" :items="chapter" item-key="content.text" item-text="content" open-on-click dark color="blue darken-4" selected-color="blue darken-4">
        <template v-slot:prepend="{ item }">
            <v-icon v-if="item.type === 'code_block'">mdi-code-tags</v-icon>
            <v-icon v-else-if="item.type === 'heading'">mdi-bookmark-outline</v-icon>
            <v-icon v-else>mdi-card-text-outline</v-icon>
        </template>
    </v-treeview>
</template>

<script>
    import store from '../store'
    import Ebitor from './Editor'


    export default {
        name: "FileMenu",
        computed: {
            chapter() {
                return store.state.document.selectedDocument.content.content
            }
        },
        methods: {
            parseChapters() {
                console.log(JSON.parse(this.chapter.content).text)
                return JSON.parse(this.chapter.content).text
            }
        },
        data() {
            return {
                tree: [],
                onUpdate: () => {
                    Ebitor.getDocumentContent()

                }
            }
        },
        data2: () => ({
            initiallyOpen: ['public'],
            files: {
                html: 'mdi-language-html5',
                js: 'mdi-nodejs',
                json: 'mdi-code-json',
                md: 'mdi-language-markdown',
                pdf: 'mdi-file-pdf',
                png: 'mdi-file-image',
                txt: 'mdi-file-document-outline',
                xls: 'mdi-file-excel',
            },
            tree: [],
            items: [
                {
                    name: '.git',
                },
                {
                    name: 'node_modules',
                },
                {
                    name: 'public',
                    children: [
                        {
                            name: 'static',
                            children: [{
                                name: 'logo.png',
                                file: 'png',
                            }],
                        },
                        {
                            name: 'favicon.ico',
                            file: 'png',
                        },
                        {
                            name: 'index.html',
                            file: 'html',
                        },
                    ],
                },
                {
                    name: '.gitignore',
                    file: 'txt',
                },
                {
                    name: 'babel.config.js',
                    file: 'js',
                },
                {
                    name: 'package.json',
                    file: 'json',
                },
                {
                    name: 'README.md',
                    file: 'md',
                },
                {
                    name: 'vue.config.js',
                    file: 'js',
                },
                {
                    name: 'yarn.lock',
                    file: 'txt',
                },
            ],
        }),
    }
</script>

<style scoped>

</style>