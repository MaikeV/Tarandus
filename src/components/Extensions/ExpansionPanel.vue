<template>
    <node-view-wrapper class="expansionPanel">
        <v-expansion-panels>
            <v-expansion-panel>
                <v-expansion-panel-header>Show Solution</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <node-view-content class="content" as="p"/>
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </node-view-wrapper>
</template>

<script>
    import { NodeViewWrapper, NodeViewContent, nodeViewProps } from '@tiptap/vue-2'

    export default {
        name: "ExpansionPanel",
        components: {
            NodeViewWrapper,
            NodeViewContent,
        },
        props: nodeViewProps,
    }
</script>

<style scoped>

</style>