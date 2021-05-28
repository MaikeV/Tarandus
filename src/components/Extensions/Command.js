import {Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-2";
import Command from "./Command.vue";

export default Node.create({
    name: 'command',
    group: 'block',
    content: 'text*',
    marks: '',
    code: true,
    defining: true,

    defaultOptions: {
        HTMLAttributes: {},
    },

    parseHTML() {
        return [
            {
                tag: 'pre',
                preserveWhitespace: 'full',
            }
        ]
    },

    addNodeView() {
        return VueNodeViewRenderer(Command)
    },

    renderHTML({ HTMLAttributes }) {
        return ['pre', this.options.HTMLAttributes, ['code', HTMLAttributes, 0]]
    },

    addCommands() {
        return {
            toggleCommand: () => ({ commands }) => {
                return commands.toggleNode('command', 'paragraph')
            }
        }
    },
})