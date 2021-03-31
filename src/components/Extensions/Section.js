import { Node } from 'tiptap'
import {toggleWrap} from "tiptap-commands";

export default class Section extends Node {
    get name() {
        return 'section'
    }

    get schema() {
        return {
            content: 'block+',
            group: 'block',
            code: true,
            selectable: true,
            draggable: false,
            attrs: {
                type: {
                    default: 'text',
                }
            },
            parseDOM: [
                {
                    tag: 'div',
                    getAttrs: dom => ({
                       type: dom.getAttribute('type'),
                    }),
                    class: 'Section'
                },
            ],
            toDOM: node => ['div', {
                class: node.attrs.type + 'Section'
            }, 0],
        }
    }

    // get view() {
    //     return {
    //         props: ['node', 'uppdateAttrs', 'view'],
    //         computed: {
    //             type: {
    //                 get() {
    //                     return this.node.attrs.type
    //                 },
    //                 set(type) {
    //                     this.updateAttrs({
    //                         type,
    //                     })
    //                 }
    //             }
    //         },
    //         template: `
    //             <div class="textSection">
    //
    //             </div>`,
    //     }
    // }

    // eslint-disable-next-line no-unused-vars
    commands( { type, schema, attrs } ) {
        return () => {
            toggleWrap(type, attrs)
        }
    }
}