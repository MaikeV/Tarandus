<template>
    <v-treeview v-model="tree" :items="chapter" item-key="content.text" item-text="content" open-on-click dark color="blue darken-4" selected-color="blue darken-4">
        <template v-slot:prepend="{ item }">
            <v-icon v-if="item.type === 'codeBlock'">mdi-code-tags</v-icon>
            <v-icon v-else-if="item.type === 'heading'">mdi-bookmark-outline</v-icon>
            <v-icon v-else-if="item.type === 'orderedList'">mdi-format-list-numbered</v-icon>
            <v-icon v-else-if="item.type === 'bulletList'">mdi-format-list-bulleted</v-icon>
            <v-icon v-else-if="item.type === 'expansionPanel'">mdi-chevron-down</v-icon>
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
                return store.state.document.activeDocument.content.content
                // let con = store.state.document.activeDocument.content.content


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
        }
    }
</script>

<style scoped>

</style>