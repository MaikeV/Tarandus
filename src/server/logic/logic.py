class Logic:
    def processText(self, contentList):
        text = ''
        for content in contentList:
            if content['type'] == 'text':
                if 'marks' in content:
                    marks = content['marks']

                    for mark in marks:  # marks in text element
                        if mark['type'] == 'code':
                            print('This is code')
                            text += "''')\nbash('''" + content['text'] + "''')\nwl(r'''"
                            break

                        if mark['type'] == 'bold':
                            # ::b
                            text = text + '::b ' + content['text'] + ' b:: '
                            print('this is bold' + content['text'])

                        if mark['type'] == 'italic':
                            # ::k
                            text = text + '::k ' + content['text'] + ' k:: '
                            print('this is italic' + content['text'])

                        if mark['type'] == 'underline':
                            # ::u
                            text = text + '::u ' + content['text'] + ' u:: '
                            print('this is underlined' + content['text'])

                        if mark['type'] == 'strike':
                            print('this is struck' + content['text'])
                else:
                    text = text + content['text']
        return text

    def compile(self, data, path):
        text = ''

        for elem in data['content']:  # editor elements
            # print(elem)
            if 'content' in elem:
                contentList = elem['content']
                if elem['type'] == 'paragraph':
                    text += "wl(r'''" + self.processText(contentList) + "''')\n"
                    # print text wl(r''' ''')
                elif elem['type'] == 'heading':
                    level = elem['attrs']['level']
                    text += "h" + str(level) + "('''" + self.processText(contentList) + "''')\n"
                    # print with h*level*(...)
                elif elem['type'] == 'codeBlock':
                    language = elem['attrs']['language']

                    if language is None:
                        language = 'None'

                    text += "print('This is a codeBlock in " + language + "')\n" +\
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
                else:
                    print('Error: Unknown type ' + elem['type'] + '\n')

        f = open(path, 'w')

        f.write(text)

        f.close()
