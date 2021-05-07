<template>
    <v-row>
        <v-dialog v-model="deleteModuleDialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar color="primary" dark>Delete Module</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col class="mt-0">
                                            <p class="red--text text--darken-4 font-weight-bold" v-text="module.name"></p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="mt-0">
                                            <p class="">Are you sure you want to delete this module? All underlying documents will be deleted as well! You will not be able to revert this action.</p>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col class="d-flex justify-end">
                                            <v-btn color="error" @click="deleteModule()" class="mr-2">Yes</v-btn>
                                            <v-btn @click="switchDeleteModuleDialog">No</v-btn>
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
        name: "DeleteModuleDialog",
        computed: {
            deleteModuleDialog() {
                return store.state.misc.deleteModuleDialog
            },
            module() {
                return store.state.module.selectedModule
            }
        },
        methods: {
            switchDeleteModuleDialog() {
                store.commit('misc/switchDeleteModuleDialog')
                store.commit('module/resetSelectedModule')
            },
            deleteModule() {
                store.dispatch('module/deleteSelectedModule')
            }
        }
    }
</script>

<style scoped>

</style>