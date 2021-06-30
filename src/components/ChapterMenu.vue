<template>
    <v-container class="ma-0 pa-0">
        <v-app-bar clipped-left collapse-on-scroll color="blue darken-3">
            <v-toolbar-title>Chapter</v-toolbar-title>
        </v-app-bar>
        <v-container :class="scrollyClass" id="scrollContainer">
            <v-treeview v-model="tree" :items="buildTree" item-key="content.text" item-text="content" open-on-click dark color="blue darken-4" selected-color="blue darken-4">
                <template v-slot:prepend="{ item }">
                    <v-icon v-if="item.type === 'codeBlock'" class="ml-2">mdi-code-tags</v-icon>
                    <v-icon v-else-if="item.type === 'heading'">mdi-bookmark-outline</v-icon>
                    <v-icon v-else-if="item.type === 'orderedList'" class="ml-2">mdi-format-list-numbered</v-icon>
                    <v-icon v-else-if="item.type === 'bulletList'" class="ml-2">mdi-format-list-bulleted</v-icon>
                    <v-icon v-else-if="item.type === 'expansionPanel'" class="ml-2">mdi-chevron-down</v-icon>
                    <v-icon v-else-if="item.type === 'snippet'" class="ml-2">mdi-slash-forward</v-icon>
                    <v-icon v-else-if="item.type === 'command'" class="ml-2">mdi-language-python</v-icon>
                    <v-icon v-else>mdi-card-text-outline</v-icon>
                </template>
            </v-treeview>
        </v-container>
    </v-container>
</template>

<script>
    import store from '../store'
    import Ebitor from './Editor'

    export default {
        name: "FileMenu",
        computed: {
            chapter() {
                return store.state.document.activeDocument.content.content
            },
            editorEnglish() {
                return store.state.misc.editorEnglish
            },
            buildTree() {
                let chapters = store.state.document.activeDocument.content.content

                let a =this.buildEnhancedChapterTree(chapters)
                console.log(a)
                return a
            }
        },
        methods: {
            buildEnhancedChapterTree(lst, mode){
                if(lst.length === 0 ){
                    return []
                }
                if (lst.length === 1){
                    return [lst[0]]
                }

                let [head, ...tail] = lst

                if(head.type === 'heading'){
                    if (mode) {
                        return []
                    }

                    head.children = this.buildEnhancedChapterTree(tail, true)
                    tail = tail.slice(head.children.length)

                    if(tail.length > 0 ) {
                        return [head, ...this.buildEnhancedChapterTree(tail, false)]
                    }
                    
                    return [head]
                }

                return [head, ...this.buildEnhancedChapterTree(tail, mode)]
            },

            buildChapterTree(lst) {
                if(lst.length === 1) {
                    return [lst[0]]
                }

                let [head, ...tail] = lst

                if (head.type === 'heading') {
                    head.children = this.buildChapterTree(tail)
                    return [head]
                }

                let res = this.buildChapterTree(tail)
                res.unshift(head)
                return res
            },
            parseChapters() {
                // console.log(JSON.parse(this.chapter.content).text)
                return JSON.parse(this.chapter.content).text
            },
            changeStyle(val) {
                if(val) {
                    document.getElementById('scrollContainer').classList.add("scrollyPollyChaptersEn")
                    document.getElementById('scrollContainer').classList.remove("scrollyPollyChapters")
                } else {
                    document.getElementById('scrollContainer').classList.remove("scrollyPollyChaptersEn")
                    document.getElementById('scrollContainer').classList.add("scrollyPollyChapters")
                }
            }
        },
        watch: {
            editorEnglish(val) {
                this.changeStyle(val)
            }
        },
        data() {
            return {
                tree: [],
                scrollyClass: store.state.misc.editorEnglish ? "scrollyPollyChaptersEn" : "scrollyPollyChapters",
                documentTitle: store.state.document.activeDocument.title,
                onUpdate: () => {
                    Ebitor.getDocumentContent()
                }
            }
        }
    }
</script>

<style scoped>
    .scrollyPollyChapters {
        overflow-y: scroll;
        position: fixed;
        height: 87%;
        width: 16.5%;
    }

    .scrollyPollyChaptersEn {
        overflow-y: scroll;
        position: fixed;
        height: 87%;
        width: 8.2%;
    }
</style>