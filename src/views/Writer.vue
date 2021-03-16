<template>
    <v-container fluid class="fill-height mb-6 pa-0">
        <v-row no-gutters class="fill-height">
            <v-col cols="1">
                <FileMenu/>
            </v-col>
            <v-divider vertical/>
            <v-col>
                <Ebitor/>
            </v-col>
            <v-divider vertical/>
            <v-col>
                <Preview/>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import Ebitor from "./../components/Editor"
    import FileMenu from "../components/FileMenu";
    import Preview from "../components/Preview";
    export default {
        name: "Editor",
        components: {
            Preview,
            FileMenu,
            Ebitor
        }
    }
</script>

<style scoped>

</style>