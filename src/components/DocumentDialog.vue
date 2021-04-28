<template>
    <v-row>
        <v-dialog v-model="documentDialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar color="primary" dark>New Document</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form>
                                <v-container>
                                    <v-row class="">
                                        <v-col>
                                            <v-text-field v-model="title" :counter="50" label="Document Title" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="isDuplicateDocument">
                                        <v-col class="mt-0">
                                            <p class="red--text text--darken-4">A document with this name already exists in this module</p>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col class="d-flex justify-end">
                                            <v-btn :disabled="isDuplicateDocument" color="primary" @click="addDocument" class="mr-2">Save</v-btn>
                                            <v-btn @click="switchDocumentDialog">Close</v-btn>
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
        name: "DocumentDialog",
        computed: {
            title: {
                get() {
                    return store.state.module.newDocument.title
                },
                set(value) {
                    store.state.module.newDocument.title = value
                },
            },
            module() {
                return store.state.module.selectedModule
            },
            documentDialog() {
                return store.state.misc.documentDialog
            },
            documents() {
                return store.state.module.selectedModule.documents
            },
            isDuplicateDocument() {
                let dup = this.module.documents.filter((elem) => {
                    if(elem.title === this.title) return elem
                })

                return dup.length > 0;
            }
        },
        methods: {
            switchDocumentDialog() {
                store.commit('misc/switchDocumentDialog')
            },
            addDocument() {
                store.dispatch('module/postDocumentSelected')
            },
        }
    }
</script>

<style scoped>

</style>