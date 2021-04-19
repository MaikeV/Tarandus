import { Node } from 'tiptap'
// eslint-disable-next-line no-unused-vars
import {setBlockType, toggleBlockType, } from "tiptap-commands";
// eslint-disable-next-line no-unused-vars
import { Plugin, PluginKey, Mark, Extension } from 'tiptap';
// eslint-disable-next-line no-unused-vars
import { toggleWrap, wrappingInputRule, toggleList, textblockTypeInputRule, chainCommands, exitCode, nodeInputRule, splitListItem, sinkListItem, liftListItem, insertText, replaceText, splitToDefaultListItem, toggleMark, markInputRule, markPasteRule, updateMark, removeMark, pasteRule } from 'tiptap-commands';
// eslint-disable-next-line no-unused-vars
import HiddenPanel from "./../HiddenPanel";
// eslint-disable-next-line no-unused-vars
import expansionContent from "./ExpansionContent"

export default class ExpansionPanel extends Node {
    get name() {
        return 'expansionPanel'
    }

    get schema() {
        return {
            content: 'text*',
            group: 'block',
            selectable: true,
            draggable: false,
            defining: true,
            parseDOM: [
                {
                    tag: "v-expansion-panels",
                    preserveWhitespace: 'full',
                },
                {
                    tag: 'v-expansion-panel'
                },
                {
                    tag: 'v-expansion-panel-header'
                },
                {
                    tag: 'v-expansion-panel-content'
                }
            ],
            toDOM: () => ['v-expansion-panels',
                ['v-expansion-panel',
                    ['v-expansion-panel-header', 0],
                    ['v-expansion-panel-content', ['p', { class: 'hiddenContent' }, 0]]
                ],
            ],
        };
    }

    commands({
        type,
        schema
    }) {
        return () => toggleBlockType(type, schema.nodes.paragraph)

    }

    keys({
        type
    }) {
        return {
            'Shift-Ctrl-\\': setBlockType(type),
        };
    }

    inputRules({
        type
    }) {
        return [textblockTypeInputRule(/^```$/, type)];
    }

    get view() {
        return HiddenPanel
    }
}
