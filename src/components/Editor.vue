<template>
    <div class="editor">
        <v-app-bar color="blue darken-3">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">
                    <v-container fluid>
                        <v-row class="pa-0 align-center">
                            <v-col>
                                <v-btn icon small class="menubar_button" @click.stop="commands.undo">
                                    <v-icon>mdi-undo</v-icon>
                                </v-btn>
                                <v-btn icon small class="menubar_button" @click.stop="commands.redo">
                                    <v-icon>mdi-redo</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col>
                                <v-btn-toggle v-model="toggle_multiple" background-color="primary" small dark multiple class="ma-0">
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.bold() }" @click.stop="commands.bold">
                                        <v-icon small>mdi-format-bold</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.italic() }" @click.stop="commands.italic">
                                        <v-icon small>mdi-format-italic</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.underline() }" @click.stop="commands.underline">
                                        <v-icon small>mdi-format-underline</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.strike() }" @click.stop="commands.strike">
                                        <v-icon small>mdi-format-strikethrough</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col>
                                <v-btn-toggle v-model="toggle_one" mandatory background-color="primary" small dark class="ma-0">
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.paragraph() }" @click.stop="commands.paragraph">
                                        <v-icon small>mdi-format-text-variant</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.heading({level: 2}) }" @click.stop="commands.heading({level: 2})">
                                        <v-icon small>mdi-format-header-2</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.heading({level: 3}) }" @click.stop="commands.heading({level: 3})">
                                        <v-icon small>mdi-format-header-3</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.heading({level: 4}) }" @click.stop="commands.heading({level: 4})">
                                        <v-icon small>mdi-format-header-4</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col>
                                <v-btn-toggle v-model="toggle_none" background-color="primary" small dark class="ma-0">
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.code() }" @click.stop="commands.code">
                                        <v-icon small>mdi-code-tags</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.code_block() }" @click.stop="commands.code_block">
                                        <v-icon small>mdi-code-not-equal-variant</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click.stop="commands.blockquote">
                                        <v-icon small>mdi-format-quote-close</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-col>
                                <v-btn-toggle v-model="toggle_none" background-color="primary" small dark class="ma-0">
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click.stop="commands.bullet_list">
                                        <v-icon small>mdi-format-list-bulleted</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click.stop="commands.ordered_list">
                                        <v-icon small>mdi-format-list-numbered</v-icon>
                                    </v-btn>
                                </v-btn-toggle>
                            </v-col>
                            <v-spacer></v-spacer>
                            <v-col>
                                
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
    import {Bold, Italic, Underline, Strike, Code, CodeBlock, Heading, BulletList, OrderedList, ListItem, Blockquote, History} from 'tiptap-extensions'

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
                        new History(),
                        new Bold(),
                        new Italic(),
                        new Underline(),
                        new Strike(),
                        new Code(),
                        new CodeBlock(),
                        new BulletList(),
                        new OrderedList(),
                        new Heading({levels: [2, 3, 4]}),
                        new ListItem(),
                        new Blockquote(),
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