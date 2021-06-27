<template>
    <v-container class="editor ma-0 pa-0">
        <v-app-bar v-if="editor && language === 'german'" color="blue darken-3">
            <div class="menubar">
                <v-container fluid>
                    <v-row class="pa-0 align-center">
                        <v-col class="ma-0 pa-0">
                            <v-btn icon @click="editor.chain().focus().undo().run()">
                                <v-icon>mdi-undo</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <v-btn icon @click="editor.chain().focus().redo().run()">
                                <v-icon>mdi-redo</v-icon>
                            </v-btn>
                        </v-col>
                        <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                        <v-col class="ma-0 pa-0">
                            <v-btn-toggle v-model="toggleSectionType" background-color="primary" class="menubar__button" mandatory>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn :disabled="sectionType === 'text'" icon small v-bind="attrs" v-on="on" @click="textSectionPressed()">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Text Section</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn :disabled="sectionType === 'code'" small icon class="menubar__button" v-bind="attrs" v-on="on" :class="{ 'is-active': editor.isActive('codeBlock') }" @click="codeSectionPressed()">
                                          <v-icon>mdi-code-not-equal-variant</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Code Section</span>
                                </v-tooltip>
                            </v-btn-toggle>
                        </v-col>
                        <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                        <v-col v-if="activeModuleBilingual && language === 'german'" class="ma-0 pa-0">
                            <v-switch v-model="lang" class="mt-5" color="amber lighten-1" label="English"></v-switch>
                        </v-col>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="reloadContent">
                            <v-icon>mdi-refresh</v-icon>
                        </v-btn>
                    </v-row>
                </v-container>
            </div>
        </v-app-bar>
        <v-app-bar v-if="editorEn && language === 'english'" color="blue darken-3">
            <div class="menubar">
                <v-container fluid>
                    <v-row class="pa-0 align-center">
                        <v-col class="ma-0 pa-0">
                            <v-btn icon @click="editorEn.chain().focus().undo().run()">
                                <v-icon>mdi-undo</v-icon>
                            </v-btn>
                        </v-col>
                        <v-col class="ma-0 pa-0">
                            <v-btn icon @click="editorEn.chain().focus().redo().run()">
                                <v-icon>mdi-redo</v-icon>
                            </v-btn>
                        </v-col>
                        <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                        <v-col class="ma-0 pa-0">
                            <v-btn-toggle v-model="toggleSectionTypeEn" background-color="primary" class="menubar__button" mandatory>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn :disabled="sectionType === 'text'" icon small v-bind="attrs" v-on="on" @click="textSectionPressed()">
                                            <v-icon>mdi-format-text</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Text Section</span>
                                </v-tooltip>
                                <v-tooltip top>
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-btn :disabled="sectionType === 'code'" small icon class="menubar__button" v-bind="attrs" v-on="on" :class="{ 'is-active': editorEn.isActive('codeBlock') }" @click="codeSectionPressed()">
                                            <v-icon>mdi-code-not-equal-variant</v-icon>
                                        </v-btn>
                                    </template>
                                    <span>Code Section</span>
                                </v-tooltip>
                            </v-btn-toggle>
                        </v-col>
                        <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                        <v-col v-if="activeModuleBilingual && language === 'german'" class="ma-0 pa-0">
                            <v-switch v-model="lang" class="mt-5" color="amber lighten-1" label="English"></v-switch>
                        </v-col>
                    </v-row>
                </v-container>
            </div>
        </v-app-bar>
        <bubble-menu id="bubbleMenuGerman" :editor="editor" class="bubble-menu" v-if="editor && sectionType === 'text' && language === 'german'">
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark multiple class="ma-0" v-model="marks">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('bold') }" @click.stop="editor.chain().focus().toggleBold().run()">
                    <v-icon small>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('italic') }" @click.stop="editor.chain().focus().toggleItalic().run()">
                    <v-icon small>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('underline') }" @click.stop="editor.chain().focus().toggleUnderline().run()">
                    <v-icon small>mdi-format-underline</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('strike') }" @click.stop="editor.chain().focus().toggleStrike().run()">
                    <v-icon small>mdi-format-strikethrough</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('code') }" @click.stop="editor.chain().focus().toggleCode().run()">
                    <v-icon small>mdi-code-tags</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('bulletList') }" @click.stop="editor.chain().focus().toggleBulletList().run()">
                    <v-icon small>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('orderedList') }" @click.stop="editor.chain().focus().toggleOrderedList().run()">
                    <v-icon small>mdi-format-list-numbered</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('blockquote') }" @click.stop="editor.chain().focus().toggleBlockquote().run()">
                    <v-icon small>mdi-format-quote-close</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('expansionPanel') }" @click="editor.chain().focus().toggleExpansionPanel().run()">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </v-btn-toggle>
        </bubble-menu>
        <bubble-menu id="bubbleMenuEnglish" :editor="editorEn" class="bubble-menu" v-if="editorEn && sectionType === 'text' && language === 'english'">
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark multiple class="ma-0" v-model="marks">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('bold') }" @click.stop="editorEn.chain().focus().toggleBold().run()">
                    <v-icon small>mdi-format-bold</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('italic') }" @click.stop="editorEn.chain().focus().toggleItalic().run()">
                    <v-icon small>mdi-format-italic</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('underline') }" @click.stop="editorEn.chain().focus().toggleUnderline().run()">
                    <v-icon small>mdi-format-underline</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('strike') }" @click.stop="editorEn.chain().focus().toggleStrike().run()">
                    <v-icon small>mdi-format-strikethrough</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('code') }" @click.stop="editorEn.chain().focus().toggleCode().run()">
                    <v-icon small>mdi-code-tags</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('bulletList') }" @click.stop="editorEn.chain().focus().toggleBulletList().run()">
                    <v-icon small>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('orderedList') }" @click.stop="editorEn.chain().focus().toggleOrderedList().run()">
                    <v-icon small>mdi-format-list-numbered</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('blockquote') }" @click.stop="editorEn.chain().focus().toggleBlockquote().run()">
                    <v-icon small>mdi-format-quote-close</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('expansionPanel') }" @click="editorEn.chain().focus().toggleExpansionPanel().run()">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </v-btn-toggle>
        </bubble-menu>
        <floating-menu id="floatingMenuGerman" :editor="editor" class="floating-menu" v-if="editor && language === 'german'">
            <v-btn-toggle v-if="sectionType === 'text'" mandatory background-color="primary" small dark class="ma-0" v-model="textType">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('paragraph') }" @click.stop="editor.chain().focus().setParagraph().run()">
                    <v-icon small>mdi-format-text-variant</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }" @click.stop="editor.chain().focus().toggleHeading({ level: 2 }).run()">
                    <v-icon small>mdi-format-header-2</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }" @click.stop="editor.chain().focus().toggleHeading({ level: 3 }).run()">
                    <v-icon small>mdi-format-header-3</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }" @click.stop="editor.chain().focus().toggleHeading({ level: 4 }).run()">
                    <v-icon small>mdi-format-header-4</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('code') }" @click.stop="editor.chain().focus().toggleCode().run()">
                    <v-icon small>mdi-code-tags</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('bulletList') }" @click.stop="editor.chain().focus().toggleBulletList().run()">
                    <v-icon small>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('orderedList') }" @click.stop="editor.chain().focus().toggleOrderedList().run()">
                    <v-icon small>mdi-format-list-numbered</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('blockquote') }" @click.stop="editor.chain().focus().toggleBlockquote().run()">
                    <v-icon small>mdi-format-quote-close</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('expansionPanel') }" @click="editor.chain().focus().toggleExpansionPanel().run()">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="administrational">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('snippet') }" @click.stop="editor.chain().focus().toggleSnippet().run()">
                    <v-icon>mdi-slash-forward</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('command') }" @click.stop="editor.chain().focus().toggleCommand().run()">
                    <v-icon>mdi-language-python</v-icon>
                </v-btn>
            </v-btn-toggle>
        </floating-menu>
        <floating-menu id="floatingMenuEnglish" :editor="editorEn" class="floating-menu" v-if="editorEn && language === 'english'">
            <v-btn-toggle v-if="sectionType === 'text'" mandatory background-color="primary" small dark class="ma-0" v-model="textType">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('paragraph') }" @click.stop="editorEn.chain().focus().setParagraph().run()">
                    <v-icon small>mdi-format-text-variant</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('heading', { level: 2 }) }" @click.stop="editorEn.chain().focus().toggleHeading({ level: 2 }).run()">
                    <v-icon small>mdi-format-header-2</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('heading', { level: 3 }) }" @click.stop="editorEn.chain().focus().toggleHeading({ level: 3 }).run()">
                    <v-icon small>mdi-format-header-3</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('heading', { level: 4 }) }" @click.stop="editorEn.chain().focus().toggleHeading({ level: 4 }).run()">
                    <v-icon small>mdi-format-header-4</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('code') }" @click.stop="editorEn.chain().focus().toggleCode().run()">
                    <v-icon small>mdi-code-tags</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('bulletList') }" @click.stop="editorEn.chain().focus().toggleBulletList().run()">
                    <v-icon small>mdi-format-list-bulleted</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('orderedList') }" @click.stop="editorEn.chain().focus().toggleOrderedList().run()">
                    <v-icon small>mdi-format-list-numbered</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('blockquote') }" @click.stop="editorEn.chain().focus().toggleBlockquote().run()">
                    <v-icon small>mdi-format-quote-close</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('expansionPanel') }" @click="editorEn.chain().focus().toggleExpansionPanel().run()">
                    <v-icon>mdi-chevron-down</v-icon>
                </v-btn>
            </v-btn-toggle>
            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="administrational">
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('snippet') }" @click.stop="editorEn.chain().focus().toggleSnippet().run()">
                    <v-icon>mdi-slash-forward</v-icon>
                </v-btn>
                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEn.isActive('command') }" @click.stop="editorEn.chain().focus().toggleCommand().run()">
                    <v-icon>mdi-language-python</v-icon>
                </v-btn>
            </v-btn-toggle>
        </floating-menu>

        <v-container v-on:keydown.ctrl="setSectionType('text')" v-on:click="getSelectedSectionType" id="contentContainer" class="pa-2 fill-height" :class="scrollyClass">
            <editor-content v-if="language === 'german' && editor" class="editor__content" :editor="editor"/>
            <editor-content v-else-if="language === 'english' && editorEn" class="editor__content" :editor="editorEn"/>
        </v-container>
    </v-container>

</template>

<script>
    import {
        Editor,
        EditorContent,
        VueNodeViewRenderer,
        BubbleMenu,
        FloatingMenu,
    } from '@tiptap/vue-2'

    import Document from '@tiptap/extension-document'
    import Paragraph from '@tiptap/extension-paragraph'
    import Text from '@tiptap/extension-text'
    import Bold from '@tiptap/extension-bold'
    import Italic from '@tiptap/extension-italic'
    import Blockquote from '@tiptap/extension-blockquote'
    import ListItem from '@tiptap/extension-list-item'
    import BulletList from '@tiptap/extension-bullet-list'
    import OrderedList from '@tiptap/extension-ordered-list'
    import Strike from '@tiptap/extension-strike'
    import Underline from '@tiptap/extension-underline'
    import History from '@tiptap/extension-history'
    import Heading from '@tiptap/extension-heading'
    import Code from '@tiptap/extension-code'
    import CodeBlock from '@tiptap/extension-code-block'
    import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
    import Focus from '@tiptap/extension-focus'

    import CodeBlockComponent from "./Extensions/CodeBlockComponent";
    import lowlight from 'lowlight'

    import ExpansionPanel from "./Extensions/ExpansionPanel";
    import Snippet from "./Extensions/Snippet.js";
    import Command from "./Extensions/Command.js";

    import store from '../store'

    export default {
        name: "Ebitor",
        components: {
            EditorContent,
            BubbleMenu,
            FloatingMenu,
        },
        created() {
            store.commit('module/setSelectedModuleByName', this.$route.params.moduleName)
            store.commit('module/setSelectedDocumentByTitle', this.$route.params.documentTitle)

            store.dispatch('module/loadDocument')

            console.log("created " + this.language)
        },
        data() {
            return {
                toggleSectionType: store.state.section.activeSection.type === 'text' ? 0 : 1,
                toggleSectionTypeEn: store.state.section.activeSectionEN.type === 'text' ? 0 : 1,
                editor: null,
                editorEn: null,
                marks: [],
                textType: 0,
                specials: null,
                lang: store.state.misc.editorEnglish,
                scrollyClass: store.state.misc.editorEnglish ? 'scrollyPollyEn' : 'scrollyPolly',
                // language: 'german',
                administrational: null,
            }
        },
        props: ['language'],
        watch: {
            lang(val) {
                val ? store.commit('misc/enableEN') : store.commit('misc/disableEN')

                this.changeStyle()
            }
        },
        computed: {
            sectionType() {
                if(this.language === 'german') {
                    return store.state.section.activeSection.type === undefined ? 'text' : store.state.section.activeSection.type;
                } else {
                    return store.state.section.activeSectionEN.type === undefined ? 'text' : store.state.section.activeSectionEN.type
                }
            },
            activeSection() {
                if(this.language === 'german') {
                    return store.state.document.activeSection
                } else {
                    return store.state.document.activeSectionEN
                }
            },
            documentContent() {
                console.log("docCon")
                console.log(store.state.document.activeDocument.content)
                return store.state.document.activeDocument.content
            },
            documentContentEnglish() {
                return store.state.document.activeDocument.contentEnglish
            },
            activeModuleBilingual() {
                return store.state.module.selectedModule.bilingual
            },
            editorEnglish() {
                return store.state.misc.editorEnglish;
            },
        },
        methods: {
            // async getDocumentContent() {
            //     await new Promise(() => this.documentContent !== "").then(() => {
            //         return this.documentContent
            //     })
            // },
            // async getDocumentContentEN() {
            //     await new Promise(() => this.documentContentEnglish !== "").then(() => {
            //         return this.documentContentEnglish
            //     })
            // },
            getSelectedSectionType() {
                if(this.$el.querySelector('.has-focus') === null) return

                if(this.language === 'german') {
                    if (this.$el.querySelector('.has-focus').tagName === 'DIV' && this.editor.isActive('codeBlock')) {
                        this.setSectionType('code')
                    } else{
                        this.setSectionType('text')
                    }
                } else {
                    if (this.$el.querySelector('.has-focus').tagName === 'DIV' && this.editorEn.isActive('codeBlock')) {
                        this.setSectionType('code')
                    } else{
                        this.setSectionType('text')
                    }
                }
            },
            setSectionType(attr) {
                store.commit('section/set', [attr, this.language])
                if (attr === 'text') {
                    return this.toggleSectionType = 0
                }
                else {
                    return this.toggleSectionType = 1
                }
            },
            setDocumentContent(content) {
                store.commit('document/setContent2', [content, this.language])
            },
            codeSectionPressed() {
                if(this.sectionType === 'code') return

                if(this.language === 'german') {
                    this.editor.chain().focus().setCodeBlock().run()
                    this.setSectionType('code')
                    this.editor.view.dom.focus()
                } else {
                    this.editorEn.chain().focus().setCodeBlock().run()
                    this.setSectionType('code')
                    this.editorEn.view.dom.focus()
                }
            },
            textSectionPressed() {
                if(this.sectionType === 'text') return

                if(this.language === 'german') {
                    if(this.sectionType === 'code') {
                        this.editor.chain().focus().setCodeBlock().run()
                    }

                    this.setSectionType('text')
                    this.editor.view.dom.focus()
                } else {
                    if(this.sectionType === 'code') {
                        this.editorEn.chain().focus().setCodeBlock().run()
                    }

                    this.setSectionType('text')
                    this.editorEn.view.dom.focus()
                }
            },
            saveDocument() {
                store.dispatch('document/saveDoc')
            },
            setHtml(value) {
                store.commit('document/setHTML', [value, this.language])
            },
            changeStyle() {
                if (this.editorEnglish || this.language === "english") {
                    document.getElementById('contentContainer').classList.add('scrollyPollyEn')
                    document.getElementById('contentContainer').classList.remove('scrollyPolly')
                } else {
                    document.getElementById('contentContainer').classList.remove('scrollyPollyEn')
                    document.getElementById('contentContainer').classList.add('scrollyPolly')
                }
            },
            reloadContent() {
                if (this.editor && this.language === "german") {
                    this.editor.commands.setContent(this.documentContent)
                } else if(this.editorEnglish && this.language === "english") {
                    this.editorEnglish.commands.setContent(this.documentContentEnglish)
                }
            }
        },
        mounted() {
            this.editor = new Editor({
                extensions: [
                    Document,
                    Paragraph,
                    Text,
                    History,
                    Bold,
                    Italic,
                    Underline,
                    Strike,
                    Code,
                    CodeBlock,
                    BulletList,
                    OrderedList,
                    ListItem,
                    Heading,
                    Blockquote,
                    ExpansionPanel,
                    Snippet,
                    Command,

                    CodeBlockLowlight.extend({
                        addNodeView() {
                            return VueNodeViewRenderer(CodeBlockComponent)
                        },
                    }).configure({ lowlight }),

                    Focus.configure({
                        className: 'has-focus',
                        nested: false,
                    }),
                ],
                editorProps: {
                    attributes: {
                        spellcheck: 'false',
                    }
                },
                content: this.documentContent,
                autofocus: true,
                onUpdate: () => {
                    this.setDocumentContent(this.editor.getJSON())
                    this.getSelectedSectionType()

                    this.setHtml(this.editor.getHTML())
                },
                // onFocus: () => {
                //     console.log(this.language)
                // }
            })

            this.editorEn = new Editor({
                extensions: [
                    Document,
                    Paragraph,
                    Text,
                    History,
                    Bold,
                    Italic,
                    Underline,
                    Strike,
                    Code,
                    CodeBlock,
                    BulletList,
                    OrderedList,
                    ListItem,
                    Heading,
                    Blockquote,
                    ExpansionPanel,
                    Snippet,
                    Command,

                    CodeBlockLowlight.extend({
                        addNodeView() {
                            return VueNodeViewRenderer(CodeBlockComponent)
                        },
                    }).configure({ lowlight }),

                    Focus.configure({
                        className: 'has-focus',
                        nested: false,
                    }),
                ],
                editorProps: {
                    attributes: {
                        spellcheck: 'false',
                    }
                },
                content: this.documentContentEnglish,
                autofocus: true,
                onUpdate: () => {
                    this.setDocumentContent(this.editorEn.getJSON())
                    this.getSelectedSectionType()

                    this.setHtml(this.editorEn.getHTML())
                },
                // onFocus: () => {
                //     console.log(this.language)
                // }
            })

            window.setInterval(() => {
                this.saveDocument()
            }, 30000)
        },
        beforeDestroy() {
            this.editor.destroy()
            this.editorEn.destroy()
        },
    }
</script>

<style lang="scss">
    .scrollyPollyEn {
        overflow-y: scroll;
        position: fixed;
        width: 33.3%;
        height: 87%;
        margin-bottom: 60px;
    }

    .scrollyPolly {
        overflow-y: scroll;
        position: fixed;
        width: 41.7%;
        height: 87%;
        margin-bottom: 60px;
    }

    .editor {
        width: 100%;
    }

    .editor__content {
        //position: absolute;
        width: 100%;
        height: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
        //overflow-y: scroll;
    }

    .editor__content pre{
        padding: .7rem 1rem;
        border-radius:5px;
        background: #2b2b2b;
        color: snow;
        font-size: .8rem;
        overflow-x: auto;
    }

    .has-focus {
        border-radius: 3px;
        box-shadow: 0 0 0 3px dodgerblue;
    }

    pre {
        &::before {
            content: attr(data-language);
            text-transform: uppercase;
            display: block;
            text-align: right;
            font-weight: bold;
            font-size: 0.6rem;
        }

        code {
            background: none !important;
            .hljs {
                display: block;
                overflow-x: auto;
                padding: 0.5em;
                background: #2b2b2b;
                color: #bababa;
            }

            .hljs-strong,
            .hljs-emphasis {
                color: #a8a8a2;
            }

            .hljs-bullet,
            .hljs-quote,
            .hljs-link,
            .hljs-number,
            .hljs-regexp,
            .hljs-literal {
                color: #6896ba;
            }

            .hljs-code,
            .hljs-selector-class {
                color: #a6e22e;
            }

            .hljs-emphasis {
                font-style: italic;
            }

            .hljs-keyword,
            .hljs-selector-tag,
            .hljs-section,
            .hljs-attribute,
            .hljs-name,
            .hljs-variable {
                color: #cb7832;
            }

            .hljs-params {
                color: #b9b9b9;
            }

            .hljs-string {
                color: #6a8759;
            }

            .hljs-subst,
            .hljs-type,
            .hljs-built_in,
            .hljs-builtin-name,
            .hljs-symbol,
            .hljs-selector-id,
            .hljs-selector-attr,
            .hljs-selector-pseudo,
            .hljs-template-tag,
            .hljs-template-variable,
            .hljs-addition {
                color: #e0c46c;
            }

            .hljs-comment,
            .hljs-deletion,
            .hljs-meta {
                color: #7f7f7f;
            }
        }
    }
</style>