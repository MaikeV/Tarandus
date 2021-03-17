<template>
    <v-container fluid class="content">
        <v-row >
            <v-col cols="2"></v-col>
            <v-col>
                <v-btn dark @click="openDialogue()">New Module</v-btn>
            </v-col>
            <v-col></v-col>
        </v-row>
        <v-row>
            <v-col cols="2"></v-col>
            <v-col cols="8">
                <template v-for="(module) in modules">
                <v-card :key="module.title" class="ma-2">
                    <v-expansion-panels v-model="panel" :disabled="disabled" multiple>
                        <v-expansion-panel>
                            <v-expansion-panel-header v-text="module.title"></v-expansion-panel-header>
                            <v-expansion-panel-content>
                                <v-list two-line>
                                    <v-list-item-group v-model="selected" active-class="blue--text">
                                        <template v-for="(item, index) in items">
                                            <v-list-item :key="item.title">
                                                <v-list-item-content>
                                                    <v-list-item-title v-text="item.title"></v-list-item-title>
                                                </v-list-item-content>
                                                <v-spacer></v-spacer>
                                                <v-btn class="ma-2" icon outlined small fab key="index" @click.stop="switchDialogue( index )">
                                                    <v-icon>mdi-pencil</v-icon>
                                                </v-btn>
                                                <v-btn class="ma-2" icon outlined small fab key="index" @click.stop="switchTrash( index )">
                                                    <v-icon>mdi-trash-can-outline</v-icon>
                                                </v-btn>
                                            </v-list-item>
                                            <v-divider v-if="index < items.length - 1" :key="index"></v-divider>
                                        </template>
                                    </v-list-item-group>
                                </v-list>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card>
            </template>
            </v-col>
            <v-col cols="2"></v-col>
        </v-row>
        <ModuleDialog/>
    </v-container>
</template>

<script>
    import store from '../store'
    import ModuleDialog from "./ModuleDialog";
    export default {
        name: "OverviewList",
        components: {ModuleDialog},
        data: () => ({
            items: [
                {
                    action: 'test action',
                    title: 'Practical 1'
                },{
                    action: 'test action',
                    title: 'Practical 2'
                },
            ],
            modules: [
                {
                    title: 'Module 1'
                },{
                    title: 'Module 2'
                }

            ]
        }),
        methods: {
            openDialogue() {
                store.commit('misc/switch')
            },
        }
    }
</script>

<style scoped>

</style>