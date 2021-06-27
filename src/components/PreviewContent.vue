<template class="pa-0">
    <v-container class="pa-0">
        <div v-if="lang === 'english'" id="docPrevEn" class="ma-0 pa-0">

        </div>
        <div v-if="lang === 'german'" id="docPrev" class="ma-0 pa-0">

        </div>
<!--        <p v-if="lang === 'english'" v-text="getPDFEn"></p>-->
<!--        <p v-else v-text="getPDF"></p>-->
        <p v-text="output.err"></p>
    </v-container>
</template>

<script>
    import store from '../store'
    // import Vue from 'vue'
    // import axios from "axios";
    // import pdf from 'vue-pdf'

    export default {
        name: "PreviewContent",
        props: ['lang'],
        created() {
            console.log("Preview Content created for language: " + this.lang)
        },
        computed: {
            output() {
                if(this.lang === "english") {
                    let out = store.state.document.resp.respEn

                    if(out.err === "") {
                        return "doc"
                    } else {
                        return out
                    }
                } else {
                    let out = store.state.document.resp.respGer

                    if(out.err === "") {
                        return "doc"
                    } else {
                        return out
                    }
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
                let fileName = ''

                if(this.lang === "english") {
                    fileName = this.moduleName + "_" + this.documentName + "_EN.pdf"
                } else {
                    fileName = this.moduleName + "_" + this.documentName + ".pdf"
                }

                console.log(fileName)

                return "/docs/" + fileName
            },
            getPDF() {
                return store.state.document.pdfUrl
            },
            getPDFEn() {
                return store.state.document.pdfUrlEn
            }
        },
        methods: {
            getDocPrev() {
                // axios.get("/docs/" + this.getFileName).then(response => {
                //     console.log(response)
                //     // eslint-disable-next-line no-undef
                //     resolve({template: response.data})
                // }).catch(response => {
                //     console.log(response)
                // })
            },
            getDocument() {
                return "/docs/" + this.getFileName
            }
        },
        components: {
            // 'docPrev': () => {
            //     return Vue.component('docPrev', function(resolve) {
            //         axios.options("/docs/" + this.getFileName).then(response => {
            //             console.log(response)
            //             resolve({template: response.data})
            //         }).catch(response => {
            //             console.log(response)
            //         })
            //     })
            // }
            // pdf
        }
        // data: function () {
        //     return {
        //         prevData: import("../../public/docs/" + this.getFileName)
        //     }
        // },
    }
</script>

<style lang="scss">
    #docPrev {
        height: 100%;
    }

    #docPrevEn {
        height: 100%;
    }

    .pdf {
        width: 100%;
        height: 100%;
    }

    //.preview {
    //    background-color: snow;
    //}
    //  .editor__content {
    //      height: 100%;
    //      word-wrap: break-word;
    //      overflow-wrap: break-word;
    //      word-break: break-word;
    //  }
    //
    //.editor__content pre{
    //    padding: .7rem 1rem;
    //    border-radius:5px;
    //    background: #2b2b2b;
    //    color: snow;
    //    font-size: .8rem;
    //    overflow-x: auto;
    //}
    //
    //.has-focus {
    //    border-radius: 3px;
    //    box-shadow: 0 0 0 3px dodgerblue;
    //}
    //
    //pre {
    //    &::before {
    //         content: attr(data-language);
    //         text-transform: uppercase;
    //         display: block;
    //         text-align: right;
    //         font-weight: bold;
    //         font-size: 0.6rem;
    //     }
    //
    //    code {
    //        background: none !important;
    //    .hljs {
    //        display: block;
    //        overflow-x: auto;
    //        padding: 0.5em;
    //        background: #2b2b2b;
    //        color: #bababa;
    //    }
    //
    //    .hljs-strong,
    //    .hljs-emphasis {
    //        color: #a8a8a2;
    //    }
    //
    //    .hljs-bullet,
    //    .hljs-quote,
    //    .hljs-link,
    //    .hljs-number,
    //    .hljs-regexp,
    //    .hljs-literal {
    //        color: #6896ba;
    //    }
    //
    //    .hljs-code,
    //    .hljs-selector-class {
    //        color: #a6e22e;
    //    }
    //
    //    .hljs-emphasis {
    //        font-style: italic;
    //    }
    //
    //    .hljs-keyword,
    //    .hljs-selector-tag,
    //    .hljs-section,
    //    .hljs-attribute,
    //    .hljs-name,
    //    .hljs-variable {
    //        color: #cb7832;
    //    }
    //
    //    .hljs-params {
    //        color: #b9b9b9;
    //    }
    //
    //    .hljs-string {
    //        color: #6a8759;
    //    }
    //
    //    .hljs-subst,
    //    .hljs-type,
    //    .hljs-built_in,
    //    .hljs-builtin-name,
    //    .hljs-symbol,
    //    .hljs-selector-id,
    //    .hljs-selector-attr,
    //    .hljs-selector-pseudo,
    //    .hljs-template-tag,
    //    .hljs-template-variable,
    //    .hljs-addition {
    //        color: #e0c46c;
    //    }
    //
    //    .hljs-comment,
    //    .hljs-deletion,
    //    .hljs-meta {
    //        color: #7f7f7f;
    //    }
    //    }
    //}
</style>