<template>
    <node-view-wrapper>
        <p class="snippetText"><node-view-content></node-view-content></p>
    </node-view-wrapper>
</template>

<script>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from "@tiptap/vue-2";

export default {
    name: "Snippet",
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,
}
</script>

<style scoped>
    .snippetText {
        color: #42A5F5;
    }
</style>