// import {Node} from "tiptap";
// import HiddenPanel from "../HiddenPanel";
//
// export default class ExpansionContent extends Node {
//     get name() {
//         return 'expansionContent'
//     }
//
//     get schema() {
//         return {
//             content: 'text*',
//             // group: 'block',
//             //code: true,
//             selectable: true,
//             draggable: false,
//             defining: true,
//             attrs: {
//
//             },
//             parseDOM: [
//                 {
//                     tag: "v-expansion-panel",
//                 },
//                 // {
//                 //     tag: 'v-expansion-panel-header',
//                 // },
//                 // {
//                 //     tag: 'v-expansion-panel-content',
//                 // },
//                 // {
//                 //     tag: 'div',
//                 //     preserveWhitespace: 'full'
//                 // }
//             ],
//             toDOM: () => ['v-expansion-panel',
//                 ['v-expansion-panel-header', 0],
//                 ['v-expansion-panel-content', ['div', 0]]
//             ],
//         };
//     }
//
//     get view() {
//         return HiddenPanel
//     }
// }
