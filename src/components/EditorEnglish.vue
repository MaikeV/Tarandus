<!--<template>-->
<!--    <v-container class="editor ma-0 pa-0">-->
<!--        <v-app-bar v-if="editorEnglish" color="blue darken-3">-->
<!--            <div class="menubar">-->
<!--                <v-container fluid>-->
<!--                    <v-row class="pa-0 align-center">-->
<!--                        <v-col class="ma-0 pa-0">-->
<!--                            <v-btn icon @click="editorEnglish.chain().focus().undo().run()">-->
<!--                                <v-icon>mdi-undo</v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->
<!--                        <v-col class="ma-0 pa-0">-->
<!--                            <v-btn icon @click="editorEnglish.chain().focus().redo().run()">-->
<!--                                <v-icon>mdi-redo</v-icon>-->
<!--                            </v-btn>-->
<!--                        </v-col>-->
<!--                        <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>-->
<!--                        <v-col class="ma-0 pa-0">-->
<!--                            <v-btn-toggle v-model="toggleSectionType" background-color="primary" class="menubar__button" mandatory>-->
<!--                                <v-tooltip top>-->
<!--                                    <template v-slot:activator="{ on, attrs }">-->
<!--                                        <v-btn :disabled="sectionType === 'text'" icon small v-bind="attrs" v-on="on" @click="textSectionPressed()">-->
<!--                                            <v-icon>mdi-format-text</v-icon>-->
<!--                                        </v-btn>-->
<!--                                    </template>-->
<!--                                    <span>Text Section</span>-->
<!--                                </v-tooltip>-->
<!--                                <v-tooltip top>-->
<!--                                    <template v-slot:activator="{ on, attrs }">-->
<!--                                        <v-btn :disabled="sectionType === 'code'" small icon class="menubar__button" v-bind="attrs" v-on="on" :class="{ 'is-active': editorEnglish.isActive('codeBlock') }" @click="codeSectionPressed()">-->
<!--                                            <v-icon>mdi-code-not-equal-variant</v-icon>-->
<!--                                        </v-btn>-->
<!--                                    </template>-->
<!--                                    <span>Code Section</span>-->
<!--                                </v-tooltip>-->
<!--                            </v-btn-toggle>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                </v-container>-->
<!--            </div>-->
<!--        </v-app-bar>-->
<!--        <bubble-menu :editor="editorEnglish" class="bubble-menu" v-if="editorEnglish && sectionType === 'text'">-->
<!--            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark multiple class="ma-0" v-model="marks">-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('bold') }" @click.stop="editor.chain().focus().toggleBold().run()">-->
<!--                    <v-icon small>mdi-format-bold</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('italic') }" @click.stop="editor.chain().focus().toggleItalic().run()">-->
<!--                    <v-icon small>mdi-format-italic</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('underline') }" @click.stop="editor.chain().focus().toggleUnderline().run()">-->
<!--                    <v-icon small>mdi-format-underline</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('strike') }" @click.stop="editor.chain().focus().toggleStrike().run()">-->
<!--                    <v-icon small>mdi-format-strikethrough</v-icon>-->
<!--                </v-btn>-->
<!--            </v-btn-toggle>-->
<!--            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('code') }" @click.stop="editor.chain().focus().toggleCode().run()">-->
<!--                    <v-icon small>mdi-code-tags</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('bulletList') }" @click.stop="editor.chain().focus().toggleBulletList().run()">-->
<!--                    <v-icon small>mdi-format-list-bulleted</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('orderedList') }" @click.stop="editor.chain().focus().toggleOrderedList().run()">-->
<!--                    <v-icon small>mdi-format-list-numbered</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('blockquote') }" @click.stop="editor.chain().focus().toggleBlockquote().run()">-->
<!--                    <v-icon small>mdi-format-quote-close</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editor.isActive('expansionPanel') }" @click="editor.chain().focus().toggleExpansionPanel().run()">-->
<!--                    <v-icon>mdi-chevron-down</v-icon>-->
<!--                </v-btn>-->
<!--            </v-btn-toggle>-->
<!--        </bubble-menu>-->
<!--        <floating-menu :editor="editorEnglish" class="floating-menu" v-if="editorEnglish">-->
<!--            <v-btn-toggle v-if="sectionType === 'text'" mandatory background-color="primary" small dark class="ma-0" v-model="textType">-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('paragraph') }" @click.stop="editorEnglish.chain().focus().setParagraph().run()">-->
<!--                    <v-icon small>mdi-format-text-variant</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('heading', { level: 2 }) }" @click.stop="editorEnglish.chain().focus().toggleHeading({ level: 2 }).run()">-->
<!--                    <v-icon small>mdi-format-header-2</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('heading', { level: 3 }) }" @click.stop="editorEnglish.chain().focus().toggleHeading({ level: 3 }).run()">-->
<!--                    <v-icon small>mdi-format-header-3</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('heading', { level: 4 }) }" @click.stop="editorEnglish.chain().focus().toggleHeading({ level: 4 }).run()">-->
<!--                    <v-icon small>mdi-format-header-4</v-icon>-->
<!--                </v-btn>-->
<!--            </v-btn-toggle>-->
<!--            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="specials">-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('code') }" @click.stop="editorEnglish.chain().focus().toggleCode().run()">-->
<!--                    <v-icon small>mdi-code-tags</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('bulletList') }" @click.stop="editorEnglish.chain().focus().toggleBulletList().run()">-->
<!--                    <v-icon small>mdi-format-list-bulleted</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('orderedList') }" @click.stop="editorEnglish.chain().focus().toggleOrderedList().run()">-->
<!--                    <v-icon small>mdi-format-list-numbered</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('blockquote') }" @click.stop="editorEnglish.chain().focus().toggleBlockquote().run()">-->
<!--                    <v-icon small>mdi-format-quote-close</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('expansionPanel') }" @click="editorEnglish.chain().focus().toggleExpansionPanel().run()">-->
<!--                    <v-icon>mdi-chevron-down</v-icon>-->
<!--                </v-btn>-->
<!--            </v-btn-toggle>-->
<!--            <v-btn-toggle v-if="sectionType === 'text'" background-color="primary" small dark class="ma-0 ml-2" v-model="administrational">-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('snippet') }" @click.stop="editorEnglish.chain().focus().toggleSnippet().run()">-->
<!--                    <v-icon>mdi-slash-forward</v-icon>-->
<!--                </v-btn>-->
<!--                <v-btn small icon class="menubar__button" :class="{ 'is-active': editorEnglish.isActive('command') }" @click.stop="editorEnglish.chain().focus().toggleCommand().run()">-->
<!--                    <v-icon>mdi-language-python</v-icon>-->
<!--                </v-btn>-->
<!--            </v-btn-toggle>-->
<!--        </floating-menu>-->

<!--        <v-container v-on:keydown.ctrl="setSectionType('text')" v-on:click="getSelectedSectionType" class="pa-2 scrollyPolly fill-height">-->
<!--            <editor-content class="editor__content" :editor="editorEnglish"/>-->
<!--        </v-container>-->
<!--    </v-container>-->
<!--</template>-->

<!--<script>-->
<!--import {BubbleMenu, Editor, EditorContent, FloatingMenu, VueNodeViewRenderer} from "@tiptap/vue-2";-->
<!--import Document from "@tiptap/extension-document";-->
<!--import Paragraph from "@tiptap/extension-paragraph";-->
<!--import Text from "@tiptap/extension-text";-->
<!--import History from "@tiptap/extension-history";-->
<!--import Bold from "@tiptap/extension-bold";-->
<!--import Italic from "@tiptap/extension-italic";-->
<!--import Underline from "@tiptap/extension-underline";-->
<!--import Strike from "@tiptap/extension-strike";-->
<!--import Code from "@tiptap/extension-code";-->
<!--import CodeBlock from "@tiptap/extension-code-block";-->
<!--import BulletList from "@tiptap/extension-bullet-list";-->
<!--import OrderedList from "@tiptap/extension-ordered-list";-->
<!--import ListItem from "@tiptap/extension-list-item";-->
<!--import Heading from "@tiptap/extension-heading";-->
<!--import Blockquote from "@tiptap/extension-blockquote";-->
<!--import ExpansionPanel from "./Extensions/ExpansionPanel";-->
<!--import Snippet from "./Extensions/Snippet";-->
<!--import Command from "./Extensions/Command";-->
<!--import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";-->
<!--import CodeBlockComponent from "./Extensions/CodeBlockComponent";-->
<!--import lowlight from "lowlight";-->
<!--import Focus from "@tiptap/extension-focus";-->
<!--import store from "../store";-->

<!--export default {-->
<!--    name: "EditorEnglish",-->
<!--    components: {-->
<!--        EditorContent,-->
<!--        BubbleMenu,-->
<!--        FloatingMenu,-->
<!--    },-->
<!--    created() {-->
<!--        store.commit('module/setSelectedModuleByName', this.$route.params.moduleName)-->
<!--        store.commit('module/setSelectedDocumentByTitle', this.$route.params.documentTitle)-->

<!--        store.dispatch('module/loadDocument')-->
<!--    },-->
<!--    data() {-->
<!--        return {-->
<!--            toggleSectionType: store.state.section.activeSection.type === 'text' ? 0 : 1,-->
<!--            editorEnglish: null,-->
<!--            marks: [],-->
<!--            textType: 0,-->
<!--            specials: null,-->
<!--            administrational: null,-->
<!--        }-->
<!--    },-->
<!--    computed: {-->
<!--        sectionType() {-->
<!--            return store.state.section.activeSectionEN.type === undefined ? 'text' : store.state.section.activeSection.type;-->
<!--        },-->
<!--        activeSection() {-->
<!--            return store.state.document.activeSectionEN-->
<!--        },-->
<!--        documentContentEnglish() {-->
<!--            return store.state.document.activeDocument.contentEnglish-->
<!--        },-->
<!--        activeModuleBilingual() {-->
<!--            return store.state.module.selectedModule.bilingual-->
<!--        }-->
<!--    },-->
<!--    methods: {-->
<!--        getSelectedSectionType() {-->
<!--            if(this.$el.querySelector('.has-focus') === null) return-->

<!--            if (this.$el.querySelector('.has-focus').tagName === 'DIV' && this.editorEnglish.isActive('codeBlock')) {-->
<!--                console.log(this.$el.querySelector('.has-focus').tagName)-->
<!--                this.setSectionType('code')-->
<!--            } else{-->
<!--                console.log(this.$el.querySelector('.has-focus').tagName)-->
<!--                this.setSectionType('text')-->
<!--            }-->
<!--        },-->
<!--        setSectionType(attr) {-->
<!--            store.commit('section/setEN', attr)-->
<!--            if (attr === 'text') {-->
<!--                return this.toggleSectionType = 0-->
<!--            }-->
<!--            else {-->
<!--                return this.toggleSectionType = 1-->
<!--            }-->
<!--        },-->
<!--        setDocumentContent(content) {-->
<!--            store.commit('document/setContentEN2', content)-->
<!--        },-->
<!--        codeSectionPressed() {-->
<!--            if(this.sectionType === 'code') return-->

<!--            this.editorEnglish.chain().focus().setCodeBlock().run()-->
<!--            this.setSectionType('code')-->
<!--            this.editorEnglish.focus()-->
<!--        },-->
<!--        textSectionPressed() {-->
<!--            if(this.sectionType === 'text') return-->

<!--            if(this.sectionType === 'code') {-->
<!--                this.editorEnglish.chain().focus().setCodeBlock().run()-->
<!--            }-->

<!--            this.setSectionType('text')-->
<!--            this.editorEnglish.focus()-->
<!--        },-->
<!--        saveDocument() {-->
<!--            store.dispatch('document/saveDoc')-->
<!--        },-->
<!--        setEditorContent(content) {-->
<!--            console.log('bla ' + this.output())-->

<!--            this.editorEnglish.setContent(content, true)-->
<!--        },-->
<!--        getOutput() {-->
<!--            return this.output-->
<!--        },-->
<!--        setHtml(value) {-->
<!--            console.log('bla: ' + value)-->
<!--            store.commit('document/setHTML', value)-->
<!--        },-->
<!--        changeLanguage() {-->
<!--            this.lang === 'EN' ? this.lang = 'DE' : this.lang = 'EN'-->

<!--            console.log('language changed to ' + this.lang)-->
<!--        }-->
<!--    },-->
<!--    mounted() {-->
<!--        this.editorEnglish = new Editor({-->
<!--            extensions: [-->
<!--                Document,-->
<!--                Paragraph,-->
<!--                Text,-->
<!--                History,-->
<!--                Bold,-->
<!--                Italic,-->
<!--                Underline,-->
<!--                Strike,-->
<!--                Code,-->
<!--                CodeBlock,-->
<!--                BulletList,-->
<!--                OrderedList,-->
<!--                ListItem,-->
<!--                Heading,-->
<!--                Blockquote,-->
<!--                ExpansionPanel,-->
<!--                Snippet,-->
<!--                Command,-->

<!--                CodeBlockLowlight.extend({-->
<!--                    addNodeView() {-->
<!--                        return VueNodeViewRenderer(CodeBlockComponent)-->
<!--                    },-->
<!--                }).configure({ lowlight }),-->

<!--                Focus.configure({-->
<!--                    className: 'has-focus',-->
<!--                    nested: false,-->
<!--                }),-->
<!--            ],-->
<!--            editorProps: {-->
<!--                attributes: {-->
<!--                    spellcheck: 'false',-->
<!--                }-->
<!--            },-->
<!--            content:-->
<!--            this.documentContentEnglish,-->
<!--            autofocus: true,-->
<!--            onUpdate: () => {-->
<!--                this.setDocumentContent(this.editorEnglish.getJSON())-->
<!--                this.getSelectedSectionType()-->

<!--                console.log(this.editor.getHTML())-->
<!--                this.setHtml(this.editorEnglish.getHTML())-->
<!--            },-->
<!--        })-->

<!--        window.setInterval(() => {-->
<!--            this.saveDocument()-->
<!--        }, 30000)-->
<!--    },-->
<!--    beforeDestroy() {-->
<!--        this.editorEnglish.destroy()-->
<!--    },-->
<!--}-->
<!--</script>-->

<!--<style lang="scss">-->

<!--.scrollyPolly {-->
<!--    overflow-y: scroll;-->
<!--    position: fixed;-->
<!--    width: 41.7%;-->
<!--    height: 87%;-->
<!--    margin-bottom: 60px;-->
<!--}-->

<!--.editor {-->
<!--    width: 100%;-->
<!--}-->

<!--.editor__content {-->
<!--    //position: absolute;-->
<!--    width: 100%;-->
<!--    height: 100%;-->
<!--    word-wrap: break-word;-->
<!--    overflow-wrap: break-word;-->
<!--    word-break: break-word;-->
<!--    //overflow-y: scroll;-->
<!--}-->

<!--.editor__content pre{-->
<!--    padding: .7rem 1rem;-->
<!--    border-radius:5px;-->
<!--    background: #2b2b2b;-->
<!--    color: snow;-->
<!--    font-size: .8rem;-->
<!--    overflow-x: auto;-->
<!--}-->

<!--.has-focus {-->
<!--    border-radius: 3px;-->
<!--    box-shadow: 0 0 0 3px dodgerblue;-->
<!--}-->

<!--pre {-->
<!--    &::before {-->
<!--        content: attr(data-language);-->
<!--        text-transform: uppercase;-->
<!--        display: block;-->
<!--        text-align: right;-->
<!--        font-weight: bold;-->
<!--        font-size: 0.6rem;-->
<!--    }-->

<!--    code {-->
<!--        background: none !important;-->
<!--        .hljs {-->
<!--            display: block;-->
<!--            overflow-x: auto;-->
<!--            padding: 0.5em;-->
<!--            background: #2b2b2b;-->
<!--            color: #bababa;-->
<!--        }-->

<!--        .hljs-strong,-->
<!--        .hljs-emphasis {-->
<!--            color: #a8a8a2;-->
<!--        }-->

<!--        .hljs-bullet,-->
<!--        .hljs-quote,-->
<!--        .hljs-link,-->
<!--        .hljs-number,-->
<!--        .hljs-regexp,-->
<!--        .hljs-literal {-->
<!--            color: #6896ba;-->
<!--        }-->

<!--        .hljs-code,-->
<!--        .hljs-selector-class {-->
<!--            color: #a6e22e;-->
<!--        }-->

<!--        .hljs-emphasis {-->
<!--            font-style: italic;-->
<!--        }-->

<!--        .hljs-keyword,-->
<!--        .hljs-selector-tag,-->
<!--        .hljs-section,-->
<!--        .hljs-attribute,-->
<!--        .hljs-name,-->
<!--        .hljs-variable {-->
<!--            color: #cb7832;-->
<!--        }-->

<!--        .hljs-params {-->
<!--            color: #b9b9b9;-->
<!--        }-->

<!--        .hljs-string {-->
<!--            color: #6a8759;-->
<!--        }-->

<!--        .hljs-subst,-->
<!--        .hljs-type,-->
<!--        .hljs-built_in,-->
<!--        .hljs-builtin-name,-->
<!--        .hljs-symbol,-->
<!--        .hljs-selector-id,-->
<!--        .hljs-selector-attr,-->
<!--        .hljs-selector-pseudo,-->
<!--        .hljs-template-tag,-->
<!--        .hljs-template-variable,-->
<!--        .hljs-addition {-->
<!--            color: #e0c46c;-->
<!--        }-->

<!--        .hljs-comment,-->
<!--        .hljs-deletion,-->
<!--        .hljs-meta {-->
<!--            color: #7f7f7f;-->
<!--        }-->
<!--    }-->
<!--}-->
<!--</style>-->