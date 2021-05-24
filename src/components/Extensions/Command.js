import {mergeAttributes, Node} from "@tiptap/core";

export default Node.create({
    name: 'command',
    group: 'block',
    content: 'inline*',

    parseHTML() {
        return [
            {
                tag: 'p'
            }
        ]
    },

    renderHTML({ HTMLAttributes }) {
        return ['p', mergeAttributes(this.options.HTMLAttributes, HTMLAttributes), 0]
    },

    addCommands() {
        return {
            toggleCommand: () => ({ commands }) => {
                return commands.toggleNode('command', 'paragraph')
            }
        }
    },
})