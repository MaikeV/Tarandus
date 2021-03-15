<template>
    <div class="editor">
        <v-app-bar color="blue darken-3">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">
                    <v-container>
                        <v-row>
                            <v-col>
                                <v-btn-toggle v-model="toggle_multiple" small dark multiple>
                                    <v-btn icon class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click.stop="commands.bold">
                                        <v-icon>mdi-format-bold</v-icon>
                                    </v-btn>
                                    <v-btn icon class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click.stop="commands.italic">
                                        <v-icon>mdi-format-italic</v-icon>
                                    </v-btn>
                                    <v-btn icon class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click.stop="commands.underline">
                                        <v-icon>mdi-format-underline</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                        </v-row>
                    </v-container>
                </div>
            </editor-menu-bar>
        </v-app-bar>
        <editor-content class="editor__content" :editor="editor"/>
    </div>
</template>

<script>
    import {Editor, EditorContent, EditorMenuBar} from 'tiptap'
    import {Bold, Italic, Underline} from 'tiptap-extensions'

    export default {
        name: "Ebitor",
        components: {
            EditorContent,
            EditorMenuBar,
        },
        data() {
            return {
                editor: new Editor({
                    extensions: [
                        new Bold(),
                        new Italic(),
                        new Underline(),
                    ],
                    content: '<p>Initial editor content</p>'
                })
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>

<style scoped>

</style>