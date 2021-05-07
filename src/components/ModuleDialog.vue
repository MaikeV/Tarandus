<template>
    <v-row>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar v-if="isEdit" color="primary" dark>Edit Module</v-toolbar>
                    <v-toolbar v-else color="primary" dark>New Module</v-toolbar>
                    <v-card-text>
                        <div>
                            <v-form>
                                <v-container>
                                    <v-row class="">
                                        <v-col>
                                            <v-text-field v-if="isEdit" v-model="editModuleName" :counter="100" label="Module Name" required></v-text-field>
                                            <v-text-field v-else v-model="moduleName" :counter="100" label="Module Name" required></v-text-field>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col>
                                            <v-container fluid class="pa-0">
                                                <v-textarea v-if="isEdit" v-model="editModuleDescription" rows="1" row-height="20" auto-grow label="Module Description" name="moduleDescription"></v-textarea>
                                                <v-textarea v-else v-model="moduleDescription" rows="1" row-height="20" auto-grow label="Module Description" name="moduleDescription"></v-textarea>
                                            </v-container>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col>
                                            <v-checkbox :disabled="isEdit" v-model="bilingual" label="Bilingual?" ></v-checkbox>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="isDuplicateModule">
                                        <v-col class="mt-0">
                                            <p class="red--text text--darken-4">A Module with this Name already exists</p>
                                        </v-col>
                                    </v-row>
                                    <v-row class="mt-0">
                                        <v-col class="d-flex justify-end">
                                            <v-btn v-if="isEdit" :disabled="isDuplicateModule" color="primary" @click="editModule" class="mr-2">Save</v-btn>
                                            <v-btn v-else :disabled="isDuplicateModule" color="primary" @click="addModule" class="mr-2">Save</v-btn>
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
            },
            documentDialog() {
                return store.state.misc.documentDialog;
            },
            moduleName: {
                get() {
                    return store.state.module.selectedModule.name
                },
                set(value) {
                    store.commit('module/updateValue', ['name', value])
                }
            },
            moduleDescription: {
                get() {
                    return store.state.module.selectedModule.description
                },
                set(value) {
                    store.commit('module/updateValue', ['description', value])
                }
            },
            bilingual: {
                get() {
                    return store.state.module.selectedModule.bilingual
                },
                set(value) {
                    store.commit('module/updateValue', ['bilingual', value])
                }
            },
            editModuleName: {
                get() {
                    return store.state.module.editModule.name
                },
                set(value) {
                    store.commit('module/updateEditModule', ['name', value])
                }
            },
            editModuleDescription: {
                get() {
                    return store.state.module.editModule.description
                },
                set(value) {
                    store.commit('module/updateEditModule', ['description', value])
                }
            },
            isEdit() {
                return store.state.module.isEdit
            },
            modules() {
                return store.state.module.modules
            },
            isDuplicateModule() {
                console.log('selected ' + this.moduleName)
                console.log('edit ' + this.editModuleName)

                if (this.isEdit && this.moduleName === this.editModuleName) {
                    return false
                } else if (this.isEdit) {
                    let dup = this.modules.filter((elem) => {
                        if(elem.name === this.editModuleName) {
                            console.log('dups ' + elem.name)
                            return elem
                        }
                    })
                    return dup.length > 0
                } else {
                    let dup = this.modules.filter((elem) => {
                        if(elem.name === this.moduleName) {
                            console.log('dups ' + elem.name)
                            return elem
                        }
                    })

                    return dup.length > 0
                }
            }
        },
        methods: {
            switchDialog() {
                store.commit('misc/switch')
                store.commit('module/resetSelectedModule')
                store.commit('module/resetEditModule')
            },
            addModule() {
                store.dispatch('module/postSelected')
            },
            editModule() {
                store.dispatch('module/editSelectedModule')
            }
        },
        data: () => ({
        })
    }
</script>

<style scoped>

</style>