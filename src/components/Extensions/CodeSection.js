import { Node } from 'tiptap'
import { toggleWrap } from 'tiptap-commands'

export default class CodeSection extends Node {
    get name() {
        return 'codeSection'
    }

    get schema() {
        return {
            content: 'code_block*',
            group: 'block',
            code: true,
            draggable: false,
            parseDOM: [
                { tag: 'codeSection' },
            ],
            toDOM: () => ['div', { class: 'codeSection' }, 0],
        }
    }

    commands({ type }) {
        return () => toggleWrap(type)
    }
}