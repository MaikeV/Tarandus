<template>
    <v-row>
        <v-dialog v-model="documentDialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar v-if="isEdit" color="primary" dark>Rename Document</v-toolbar>
                    <v-toolbar v-else color="primary" dark>New Document</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form>
                                <v-container>
                                    <v-row v-if="isEdit">
                                        <v-col class="">
                                            <p class="blue--text text--darken-4 font-weight-bold pb-0 align-baseline" v-text="module.name  + '/' + document"></p>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col>
                                            <v-text-field v-if="isEdit" v-model="title" :counter="50" label="New Document Title" required ></v-text-field>
                                            <v-text-field v-else v-model="title" :counter="50" label="Document Title" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="isDuplicateDocument">
                                        <v-col class="mt-0">
                                            <p class="red--text text--darken-4">A document with this name already exists in this module</p>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col class="d-flex justify-end">
                                            <v-btn v-if="isEdit" :disabled="isDuplicateDocument" color="primary" @click="renameDocument" class="mr-2">Save</v-btn>
                                            <v-btn v-else :disabled="isDuplicateDocument" color="primary" @click="addDocument" class="mr-2">Save</v-btn>
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
            document: {
                get() {
                    return store.state.module.selectedDocument.title
                },
                set(value) {
                    store.state.commit('module/setSelectedDocumentTitle', value)
                }
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
            isEdit() {
                return store.state.module.isEdit
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
                store.commit('module/resetSelectedModule')
                store.commit('module/resetSelectedDocument')
                store.commit('module/resetNewDocument')
            },
            addDocument() {
                store.dispatch('module/postDocumentSelected')
            },
            renameDocument() {
                store.dispatch('module/renameSelectedDocument')
            }
        }
    }
</script>

<style scoped>

</style>