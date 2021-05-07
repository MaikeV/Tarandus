<template>
    <v-container fluid class="content">
        <v-row >
            <v-col cols="2"></v-col>
            <v-col>
                <v-btn dark @click="openDialog()">New Module</v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <template v-for="(module) in modules">
                <v-card :key="module.name" class="ma-2">
                    <v-expansion-panels multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header>
                                <v-fade-transition leave-absolute>
                                    <v-row>
                                        <v-col cols="4" v-text="module.name"></v-col>
                                    </v-row>
                                </v-fade-transition>
                            </v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-row class="mb-2">
                                    <v-col cols="10" class="pa-0 pl-3">
                                        <span class="text--secondary caption" v-text="module.description"></span>
                                    </v-col>
                                    <v-col cols="10">
                                        <span class="text--secondary caption">
                                            DE: <v-icon small class="mb-2 mr-2 pa-0">mdi-check-bold</v-icon>
                                            <v-divider vertical></v-divider>
                                            EN: <v-icon small v-if="module.bilingual">mdi-check-bold</v-icon>
                                            <v-icon v-else>mdi-close-bold</v-icon>
                                        </span>
                                    </v-col>
                                    <v-col cols="2" class="pa-0 d-flex justify-end">
                                        <v-btn icon outlined fab small class="mb-0 mr-2" @click.stop="switchDocumentDialog( module )">
                                            <v-icon class="rotated">mdi-note-plus-outline</v-icon>
                                        </v-btn>
                                        <v-btn icon outlined fab small class="mr-2 ml-2" @click.stop="editModule( module )">
                                            <v-icon>mdi-pencil</v-icon>
                                        </v-btn>
                                        <v-btn icon outlined fab small class="mr-3 ml-2" @click.stop="switchDeleteModuleDialog( module )">
                                            <v-icon>mdi-trash-can-outline</v-icon>
                                        </v-btn>
                                    </v-col>
                                </v-row>
                                <v-divider></v-divider>
                                <v-row>
                                    <v-col>
                                        <v-list two-line>
                                            <v-list-item-group active-class="blue--text">
                                                <template v-for="(document, index) in module.documents">
                                                    <v-list-item :key="document.title" @dblclick="loadDocument(module, document)">
                                                        <v-list-item-content>
                                                            <v-list-item-title v-text="document.title"></v-list-item-title>
                                                        </v-list-item-content>
                                                        <v-spacer></v-spacer>
                                                        <v-btn class="ma-2" icon outlined small fab @click.stop="switchDocumentDialog(module, document)">
                                                            <v-icon>mdi-pencil</v-icon>
                                                        </v-btn>
                                                        <v-btn class="ma-2" icon outlined small fab @click.stop="switchDeleteDocumentDialog( module, document )">
                                                            <v-icon>mdi-trash-can-outline</v-icon>
                                                        </v-btn>
                                                    </v-list-item>
                                                    <v-divider v-if="index < module.documents.length - 1" :key="document.id"></v-divider>
                                                </template>
                                            </v-list-item-group>
                                        </v-list>
                                    </v-col>
                                </v-row>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </template>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <ModuleDialog/>
        <DocumentDialog/>
        <DeleteModuleDialog/>
        <DeleteDocumentDialog/>
    </v-container>
</template>

<script>
    import store from '../store'
    import ModuleDialog from "./ModuleDialog";
    import DocumentDialog from "./DocumentDialog";
    import DeleteModuleDialog from "./DeleteModuleDialog";
    import DeleteDocumentDialog from "./DeleteDocumentDialog";

    export default {
        name: "OverviewList",
        created: function () {
            store.commit('module/resetNewDocument')
            store.commit('module/resetSelectedDocument')
            store.commit('module/resetSelectedModule')
            store.commit('module/resetEditModule')

            store.dispatch('module/getModules')
        },
        components: {
            ModuleDialog,
            DocumentDialog,
            DeleteModuleDialog,
            DeleteDocumentDialog
        },
        computed: {
            modules() {
                return store.state.module.modules
            },
        },
        methods: {
            editModule(module) {
                store.commit('module/setSelectedModule', module)
                store.commit('module/setEdit')

                this.openDialog()
            },
            openDialog() {
                store.commit('misc/switch')
            },
            switchDocumentDialog(module, document) {
                store.commit('module/setSelectedModule', module)

                if(document !== undefined) {
                    store.commit('module/setSelectedDocument', document)
                }

                store.commit('misc/switchDocumentDialog')
            },
            switchDeleteModuleDialog(module) {
                store.commit('module/setSelectedModule', module)
                store.commit('misc/switchDeleteModuleDialog')
            },
            switchDeleteDocumentDialog(module, document) {
                store.commit('module/setSelectedModule', module)
                store.commit('module/setSelectedDocument', document)
                store.commit('misc/switchDeleteDocumentDialog')
            },
            loadDocument(module, document) {
                store.commit('module/setSelectedModule', module)
                store.commit('module/setSelectedDocument', document)
                store.dispatch('module/loadDocument')
            }
        }
    }
</script>

<style scoped>
    .rotated {
        transform: rotate(-90deg) scaleY(-1);
    }
</style>