import {mergeAttributes, Node} from "@tiptap/core";
import {VueNodeViewRenderer} from "@tiptap/vue-2";
import Snippet from "./Snippet.vue";

export default Node.create({
    name: 'snippet',
    group: 'block',
    content: 'inline*',
    marks: '',

    defaultOptions: {
        HTMLAttributes: {},
    },

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

    addNodeView() {
        return VueNodeViewRenderer(Snippet)
    },

    addCommands() {
        return {
            toggleSnippet: () => ({ commands }) => {
                return commands.toggleNode('snippet', 'paragraph')
            }
        }
    },
})