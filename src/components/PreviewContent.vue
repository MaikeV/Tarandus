<template>
    <p v-text="output"></p>
<!--        <iframe class="preview fill-height"></iframe>-->
</template>

<script>
    import store from '../store'

    export default {
        name: "PreviewContent",
        computed: {
            output() {
                return store.state.document.activeDocument.content
            }
        },
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