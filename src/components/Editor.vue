<template>
    <v-container class="editor ma-0 pa-0">
        <v-app-bar color="blue darken-3">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
                <div class="menubar">
                    <v-container fluid>
                        <v-row class="pa-0 align-center">
                            <v-col class="ma-0 pa-0">
                                <v-btn icon class="menubar_button" @click.stop="commands.undo">
                                    <v-icon>mdi-undo</v-icon>
                                </v-btn>
                            </v-col>
                            <v-col class="ma-0 pa-0">
                                <v-btn icon class="menubar_button" @click.stop="commands.redo">
                                    <v-icon>mdi-redo</v-icon>
                                </v-btn>
                            </v-col>
                            <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                            <v-col class="ma-0 pa-0">
                                <v-btn-toggle v-model="toggleSectionType" background-color="primary" class="menubar__button" mandatory>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn :disabled="sectionType === 'text'" icon small v-bind="attrs" v-on="on" @click="textSectionPressed(commands)">
                                                <v-icon>mdi-format-text</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Text Section</span>
                                    </v-tooltip>
                                    <v-tooltip top>
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn :disabled="sectionType === 'code'" small icon class="menubar__button" v-bind="attrs" v-on="on" :class="{ 'is-active': isActive.code_block() }" @click="codeSectionPressed(commands)">
                                              <v-icon>mdi-code-not-equal-variant</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Code Section</span>
                                    </v-tooltip>
                                </v-btn-toggle>
                            </v-col>
                            <v-divider vertical class="ml-3 mr-3 mb-2 mt-3"></v-divider>
                            <template v-if="sectionType === 'text'">
                                <v-col>
                                    <v-btn-toggle v-model="format" background-color="primary" small dark multiple class="ma-0">
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
                            </template>
                            <v-col v-if="sectionType === 'text'">
                                <v-btn-toggle v-model="size" mandatory background-color="primary" small dark class="ma-0">
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
                            <v-col v-if="sectionType === 'code'">
                                <v-btn-toggle v-model="codeLang" background-color="primary" small dark class="ma-0">
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button" v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-language-python</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Python</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-language-go</v-icon>
                                            </v-btn>
                                            </template>
                                        <span>Go</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-language-cpp</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>C++</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-language-javascript</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>JavaScript</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-language-html5</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>HTML</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-bash</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Bash</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-powershell</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Shell</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-docker</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Dockerfile</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-wrench-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>yaml</span>
                                    </v-tooltip>
                                    <v-tooltip top color="secondary">
                                        <template v-slot:activator="{ on, attrs }">
                                            <v-btn small icon class="menubar__button"  v-bind="attrs" v-on="on">
                                                <v-icon small>mdi-file-cog-outline</v-icon>
                                            </v-btn>
                                        </template>
                                        <span>Makefile</span>
                                    </v-tooltip>
                                </v-btn-toggle>
                            </v-col>
                            <v-col v-if="sectionType === 'text'">
                                <v-btn-toggle v-model="specialText" background-color="primary" small dark class="ma-0">
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.code() }" @click.stop="commands.code">
                                        <v-icon small>mdi-code-tags</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.bullet_list() }" @click.stop="commands.bullet_list">
                                        <v-icon small>mdi-format-list-bulleted</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.ordered_list() }" @click.stop="commands.ordered_list">
                                        <v-icon small>mdi-format-list-numbered</v-icon>
                                    </v-btn>
                                    <v-btn small icon class="menubar__button" :class="{ 'is-active': isActive.blockquote() }" @click.stop="commands.blockquote">
                                      <v-icon small>mdi-format-quote-close</v-icon>
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
<!--        <v-virtual-scroll>-->
            <v-container v-on:keydown.ctrl.enter="setSectionType('text')">
                <editor-content class="editor__content fill-height" :editor="editor"/>
            </v-container>
<!--        </v-virtual-scroll>-->
    </v-container>
</template>

<script>
    import javascript from 'highlight.js/lib/languages/javascript'
    import cpp from 'highlight.js/lib/languages/cpp'
    import python from 'highlight.js/lib/languages/python'
    import bash from 'highlight.js/lib/languages/bash'
    import html from 'highlight.js/lib/languages/htmlbars'
    import go from 'highlight.js/lib/languages/go'
    import dockerfile from 'highlight.js/lib/languages/dockerfile'
    import shell from 'highlight.js/lib/languages/shell'
    import yaml from 'highlight.js/lib/languages/yaml'
    import makefile from 'highlight.js/lib/languages/makefile'
    //import darcula from 'highlight.js/styles/darcula.css'

    import {
        Editor,
        EditorContent,
        EditorMenuBar
    } from 'tiptap'
    import {
      Bold,
      Italic,
      Underline,
      Strike,
      Code,
      // CodeBlock,
      CodeBlockHighlight,
      Heading,
      BulletList,
      OrderedList,
      ListItem,
      Blockquote,
      History,
      Focus,
    } from 'tiptap-extensions'
    // import Section from "./Extensions/Section";
    // import { setBlockType } from 'prosemirror-commands';
    import store from '../store'
    import Preview from "./Preview";

    export default {
        name: "Ebitor",
        components: {
            EditorContent,
            EditorMenuBar,
        },
        computed: {
            sectionType() {
                return store.state.section.activeSection.type === undefined ? 'text' : store.state.section.activeSection.type;
            },
        },
        methods: {
            setSectionType(attr) {
                store.commit('section/set', attr)

                if (attr === 'text') {
                    console.log(0);
                    return this.toggleSectionType = 0
                }
                else {
                    return this.toggleSectionType = 1
                }
            },
            getSectionType() {
                // if( {//isActive.code_block) {
                //     this.setSectionType('code')
                // } else {
                //     this.setSectionType('text')
                // }

                return store.state.section.activeSection.type
            },
            setDocumentContent(content) {
                store.commit('document/setContent', content)
            },
            getDocumentContent() {
                return store.state.document.selectedDocument.content
            },
            getActiveSection() {
                return store.state.document.activeSection
            },
            setActiveSection() {
                store.commit('document/getActiveSection')
            },
            codeSectionPressed(commands) {
                if(this.sectionType === 'code') return

                commands.code_block()
                this.setSectionType('code')
                this.editor.focus()
            },
            textSectionPressed(commands) {
                if(this.sectionType === 'text') return

                if(this.sectionType === 'code') {
                    commands.code_block()
                }

                this.setSectionType('text')
                this.editor.focus()
            }
        },
        data() {
            return {
                toggleSectionType: store.state.section.activeSection.type === 'text' ? 0 : 1,
                editor: new Editor({
                    extensions: [
                        new History(),
                        new Bold(),
                        new Italic(),
                        new Underline(),
                        new Strike(),
                        new Code(),
                        new BulletList(),
                        new OrderedList(),
                        new Heading({levels: [2, 3, 4]}),
                        new ListItem(),
                        new Blockquote(),
                        new Focus({
                           className: 'has-focus',
                           nested: false,
                        }),
                        new CodeBlockHighlight({
                            languages: {
                                javascript,
                                cpp,
                                python,
                                bash,
                                html,
                                go,
                                dockerfile,
                                shell,
                                yaml,
                                makefile,
                            },
                        },),
                    ],
                    autoFocus: true,
                    content: this.getDocumentContent() === '' ? '<p>Type Here</p>' : this.getDocumentContent(),
                    onUpdate: ({ getJSON }) => {
                        this.setDocumentContent(getJSON())
                        Preview.setJson(getJSON(), this.getSectionType())
                        // console.log(this.getDocumentContent())

                        console.log(this.editor.activeNodes.name)
                    }
                })
            }
        },
        beforeDestroy() {
            this.editor.destroy()
        },
    }
</script>

<style lang="scss">
    .editor__content {
        height: 100%;
        word-wrap: break-word;
        overflow-wrap: break-word;
        word-break: break-word;
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