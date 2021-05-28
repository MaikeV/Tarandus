<template>
    <node-view-wrapper class="code-block">
        <p class="languageSign">Python</p>
        <pre><node-view-content as="code" /></pre>
    </node-view-wrapper>
</template>

<script>
import {NodeViewContent, nodeViewProps, NodeViewWrapper} from "@tiptap/vue-2";

export default {
    name: "Command",
    components: {
        NodeViewWrapper,
        NodeViewContent,
    },

    props: nodeViewProps,
}
</script>

<style scoped>
    .languageSign {
        position: absolute;
        top: 0.5rem;
        right: 0.5rem;
        color: #E3F2FD;
    }

    pre {
        background: #0D47A1 !important;
    }
</style>