<template>
    <v-container>
<!--        <prev-doc v-if="output === 'doc'"></prev-doc>-->
        <my-component v-if="output === 'doc'"></my-component>
        <p v-else v-text="output.err"></p>
    </v-container>
</template>

<script>
    import store from '../store'
    import Vue from 'vue'
    import axios from "axios";

    // var prevDoc = Vue.component('prevDoc', function(resolve) {
    //                 axios.get("../../PracticalTool/itis-praktika-master/Test/text/" + this.getFileName).then(response => {
    //                     resolve({template: response.data})
    //                 })
    //              })

    export default {
        name: "PreviewContent",
        computed: {
            output() {
                let out = store.state.document.resp
                if(out.err === "") {
                    return "doc"
                } else {
                    return out
                }
            },
            moduleName() {
                let modName = store.state.module.selectedModule.name

                if (modName.includes(" ")) {
                    modName = modName.split(" ").join("")
                }

                console.log(modName)

                return modName
            },
            documentName() {
                let docName = store.state.module.selectedDocument.title

                if (docName.includes(' ')) {
                    docName = docName.split("").join("")
                }

                console.log(docName)

                return docName
            },
            getFileName() {
                let fileName = this.moduleName + "_" + this.documentName + ".html"

                console.log(fileName)

                return fileName
            }
        },
        methods: {

        },
        components: {
            // prevDoc

            'my-component': () => {
                Vue.component('prevDoc', function(resolve) {
                    axios.get("../../PracticalTool/itis-praktika-master/Test/text/" + this.getFileName).then(response => {
                        resolve({template: response.data})
                    })
                })
            }
            // import('../../PracticalTool/itis-praktika-master/Test/text/' + this.getFileName)
            // Vue.component('prevDoc', function(resolve, reject) {
            //     axios.get("../../PracticalTool/itis-praktika-master/Test/text/" + this.getFileName).then(response => {
            //         resolve({template: response.data})
            //     })
            // })
        }
    }
</script>

<style lang="scss">
    .preview {
        background-color: snow;
    }
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