import { Node, mergeAttributes } from '@tiptap/core'
import {VueNodeViewRenderer} from '@tiptap/vue-2'
import ExpansionPanel from "./ExpansionPanel.vue";

export default Node.create({
    name: 'expansionPanel',
    group: 'block',
    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'expansionPanel'
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['expansionPanel', mergeAttributes(HTMLAttributes), 0]
    },

    addNodeView() {
        return VueNodeViewRenderer(ExpansionPanel)
    },

    addCommands() {
        return {
            toggleExpansionPanel: () => ({ commands }) => {
                return commands.toggleNode('expansionPanel', 'paragraph')
            },
        }
    },
})