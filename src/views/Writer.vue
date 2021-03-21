<template>
    <v-container fluid class="fill-height mb-6 pa-0">
        <v-row no-gutters class="fill-height">
            <v-col cols="1">
                <ChapterMenu/>
            </v-col>
            <v-divider vertical/>
            <v-col cols="6">
                <Ebitor class="flex-nowrap"/>
            </v-col>
            <v-divider vertical/>
            <v-col cols="5">
                <Preview/>
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
            Ebitor
        }
    }
</script>

<style scoped>

</style>