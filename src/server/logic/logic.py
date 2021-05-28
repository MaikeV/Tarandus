class Logic:
    def processText(self, contentList):
        text = ''
        for content in contentList:
            if content['type'] == 'text':
                if 'marks' in content:
                    marks = content['marks']

                    for mark in marks:  # marks in text element
                        if mark['type'] == 'code':
                            # text += "''')\nbash('''" + content['text'] + "''')\nwl(r'''"
                            text += '\n::m ' + content['text'] + '\n'
                            break

                        if mark['type'] == 'bold':
                            # ::b
                            text = text + '\n::b ' + content['text'] + '\n'
                            print('this is bold' + content['text'])

                        elif mark['type'] == 'italic':
                            # ::k
                            text = text + '\n::k ' + content['text'] + '\n'
                            print('this is italic' + content['text'])

                        elif mark['type'] == 'underline':
                            # ::u
                            text = text + '\n::u ' + content['text'] + '\n'
                            print('this is underlined' + content['text'])

                        elif mark['type'] == 'strike':
                            print('this is struck' + content['text'])
                            # TODO: include strike mark in practical tool

                        else:
                            print('Unknown mark type "' + mark['type'] + '"')
                else:
                    text = text + content['text']
        return text

    def compile(self, data, path):
        text = ''

        for elem in data['content']:  # editor elements
            if 'content' in elem:
                contentList = elem['content']
                if elem['type'] == 'paragraph':
                    text += "wl(r'''" + self.processText(contentList) + "''')\n"
                elif elem['type'] == 'heading':
                    level = elem['attrs']['level']
                    text += "h" + str(level) + "('''" + self.processText(contentList) + "''')\n"
                elif elem['type'] == 'codeBlock':
                    language = elem['attrs']['language']

                    if language is None:
                        language = 'None'

                    text += "print('This is a codeBlock in " + language + "')\n" + \
                            "wl(r'''" + self.processText(contentList) + "''')\n"
                elif elem['type'] == 'blockquote':
                    for item in elem['content']:
                        if item['type'] == 'paragraph':
                            content = item['content']

                            text += "print('This is a Blockquote')\n" + "wl(r'''" + self.processText(content) + "''')\n"
                elif elem['type'] == 'bulletList':
                    for item in elem['content']:
                        if item['type'] == 'listItem':
                            for par in item['content']:
                                if par['type'] == 'paragraph':
                                    content = par['content']

                                    text += "wl('''" + "- " + self.processText(content) + "\n''')\n"
                elif elem['type'] == 'orderedList':
                    start = elem['attrs']['start']

                    index = start
                    for item in elem['content']:
                        if item['type'] == 'listItem':
                            for par in item['content']:
                                if par['type'] == 'paragraph':
                                    content = par['content']

                                    text += "wl(r'''" + str(index) + ". " + self.processText(content) + "\n''')\n"

                                    index = index + 1
                elif elem['type'] == 'expansionPanel':
                    text += "print('This is an expansionPanel')\nwl(r'''" + self.processText(contentList) + "''')\n"
                elif elem['type'] == 'snippet':
                    for item in elem['content']:
                        if item['type'] == 'text':
                            if item['text'] == 'MoniTutor':
                                text += 'import shared_050_monitutor_install\n\n'
                            elif item['text'] == 'Preamble':
                                text += 'import shared_010_asciidoc_preamble\n\n'
                            elif item['text'] == 'General':
                                text += 'import shared_020_generelle_anmerkungen\n\n'
                            elif item['text'] == 'VM_Prep':
                                text += 'from shared_030_vm_prep import *\n\n'
                            elif item['text'] == 'UserData':
                                text += 'import shared_040_benutzerdaten\n\n'
                elif elem['type'] == 'command':
                    for item in elem['content']:
                        if item['type'] == 'text':
                            text += item['text'] + '\n'
                else:
                    print('Error: Unknown type ' + elem['type'] + '\n')

        f = open(path, 'w')

        text += 'def main():\n\tctxt.out_lines = filter_multiple_empty_lines(ctxt.out_lines) +' \
                '\n\tctxt.out_lines = rstrip_newlines(ctxt.out_lines)' + \
                '\n\tif write_file:' + \
                '\n\t\twith open(out_file, "w") as f:' + \
                '\n\t\t\tfor i, line in enumerate(ctxt.out_lines):' + \
                '\n\t\t\t\tf.write(line + "\\n")' + \
                '\n\telse:' + \
                '\n\t\tfor i, line in enumerate(ctxt.out_lines):' + \
                '\n\t\t\t# print(i, line)\n\t\t\tprint(line)\n\t\t\tpass' + \
                '\n\nif __name__ == "__main__":' + \
                '\n\tmain()\n'

        f.write(text)

        f.close()
