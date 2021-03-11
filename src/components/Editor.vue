<template>
    <editor-content :editor="editor"/>
</template>

<script>
    import {Editor, EditorContent} from 'tiptap'

    export default {
        //name: "Editor"
        components: {
            EditorContent,
        },
        data() {
            return {
                editor: new Editor({
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