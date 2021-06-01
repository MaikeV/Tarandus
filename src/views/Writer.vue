<template class="noScroll">
    <v-container fluid class=" mb-6 pa-0  fill-height noScroll">
        <v-row no-gutters class="fill-height">
            <v-col cols="2">
                <ChapterMenu/>
            </v-col>
            <v-divider vertical/>
            <v-col>
                <Ebitor class="flex-nowrap"/>
            </v-col>
            <v-divider vertical/>
            <v-col>
                <Preview class="flex-nowrap"/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Ebitor from "./../components/Editor"
    import Preview from "../components/Preview";
    import ChapterMenu from "../components/ChapterMenu";

    export default {
        name: "Editor",
        components: {
            Preview,
            ChapterMenu,
            Ebitor,
        }
    }
</script>

<style scoped>

</style>