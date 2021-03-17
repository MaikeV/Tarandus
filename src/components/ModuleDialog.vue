<template>
    <v-row>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600px">
            <template v-slot:default="dialog">
                <v-card>
                    <v-toolbar color="primary" dark>New Module</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form v-model="valid">
                                <v-container>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-model="ModuleName" :counter="50" label="Module Name" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-checkbox v-model="bilingual" label="Bilingual?"></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn color="primary" @click="addModule"></v-btn>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-btn @click="switchDialog">Close</v-btn>
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>
                        </div>
                    </v-card-text>
                </v-card>
            </template>
        </v-dialog>
    </v-row>
</template>

<script>
    import store from '../store'

    export default {
        name: "ModuleDialog",
        computed: {
            dialog() {
                return store.state.misc.dialog
            }
        },
        methods: {
            switchDialog() {
                store.commit('misc/switch')
            }
        }
    }
</script>

<style scoped>

</style>