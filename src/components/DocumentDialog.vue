<template>
    <v-row>
        <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="600px">
            <template >
                <v-card>
                    <v-toolbar color="primary" dark>New Module</v-toolbar>
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
export default {
    name: "DocumentDialog",
    computed: {

    }
}
</script>

<style scoped>

</style>