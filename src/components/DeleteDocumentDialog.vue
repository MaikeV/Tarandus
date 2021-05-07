<template>
    <v-row>
        <v-dialog v-model="deleteDocumentDialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar color="primary" dark>Delete Document</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form>
                                <v-container>
                                    <v-row>
                                        <v-col class="mt-0">
                                            <p class="red--text text--darken-4 font-weight-bold" v-text="warning"></p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col class="mt-0">
                                            <p class="">Are you sure you want to delete this document? You will not be able to revert this action.</p>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col class="d-flex justify-end">
                                            <v-btn color="error" @click="deleteDocument()" class="mr-2">Yes</v-btn>
                                            <v-btn @click="switchDialog">No</v-btn>
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
        name: "DeleteDocumentDialog",
        computed: {
            warning() {
                return this.module.name + '/' + this.document.title
            },
            deleteDocumentDialog() {
                return store.state.misc.deleteDocumentDialog
            },
            document() {
                return store.state.module.selectedDocument
            },
            module() {
                return store.state.module.selectedModule
            }
        },
        methods: {
            switchDialog() {
                store.commit('misc/switchDeleteDocumentDialog')
                store.commit('module/resetSelectedModule')
                store.commit('module/resetSelectedDocument')
            },
            deleteDocument() {
                store.dispatch('module/deleteSelectedDocument')
            }
        }
    }
</script>

<style scoped>

</style>