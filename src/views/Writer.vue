<template class="noScroll">
    <v-container fluid class=" mb-6 pa-0  fill-height noScroll">
        <v-row no-gutters class="fill-height">
            <v-col :cols="colsChapter">
                <ChapterMenu/>
            </v-col>
            <v-divider vertical/>
            <v-col :cols="colsEditor">
                <Ebitor v-bind:language="german" class="flex-nowrap"/>
            </v-col>
            <v-divider v-if="editorEnglish" vertical/>
            <v-col v-if="editorEnglish" cols="4">
                <keep-alive>
                    <Ebitor v-bind:language="english"></Ebitor>
                </keep-alive>
            </v-col>
            <v-divider vertical/>
            <v-col :cols="colsPreview">
                <Preview class="flex-nowrap"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Ebitor from "./../components/Editor"
    import Preview from "../components/Preview";
    import ChapterMenu from "../components/ChapterMenu";
    import store from '../store'

    export default {
        name: "Editor",
        computed: {
            colsChapter() {
                return store.state.misc.cols.chapter
            },
            colsEditor() {
                return store.state.misc.cols.editor
            },
            colsPreview() {
                return store.state.misc.cols.preview
            },
            editorEnglish() {
                return store.state.misc.editorEnglish
            }
        },
        data() {
            return {
                english: "english",
                german: "german",
            }
        },
        components: {
            Preview,
            ChapterMenu,
            Ebitor,
        }
    }
</script>

<style scoped>

</style>