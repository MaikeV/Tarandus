import json
import os
import shutil
import subprocess

from pathlib import Path


class Logic:

    def checkBilingual(self, moduleName):
        metaPath = "../../files/modules/" + moduleName + "/" + moduleName + ".meta"

        module = False

        if Path(metaPath).exists() and Path(metaPath).is_file():  # check if module is bilingual
            metaFile = open(metaPath, 'r')
            module = json.loads(metaFile.read())['bilingual']

        return module

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
                            # print('this is bold' + content['text'])

                        elif mark['type'] == 'italic':
                            # ::k
                            text = text + '\n::k ' + content['text'] + '\n'
                            # print('this is italic' + content['text'])

                        elif mark['type'] == 'underline':
                            # ::u
                            text = text + '\n::u ' + content['text'] + '\n'
                            # print('this is underlined' + content['text'])

                        elif mark['type'] == 'strike':
                            print('this is struck' + content['text'])
                            # TODO: include strike mark in practical tool

                        else:
                            print('Unknown mark type "' + mark['type'] + '"')
                else:
                    text = text + content['text']
        return text

    def compile(self, data, path, fileName):
        print("Compiling " + fileName + "...")

        text = '# -*- coding: utf-8 -*-' + \
            '\nwrite_file = 1' + \
            '\n\nimport os, os.path, sys, inspect, pprint, re, time' + \
            '\nfrom textwrap import dedent' + \
            '\n\nscript_dir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))' + \
            '\nscript_name = inspect.getfile(inspect.currentframe())' + \
            '\nout_file = script_name.replace(".py", ".adoc")' + \
            '\n\n# Enable importing from parent directory ...' + \
            '\nsys.path.insert(0, os.path.dirname(script_dir))' + \
            '\n\nimport itsdoc\nfrom itsdoc.Template import templ\nfrom itsdoc.utils import *' + \
            '\nfrom itsdoc.directives import *' + \
            '\n\nctxt = itsdoc.Context.ctxt\nctxt.globals = globals()' + \
            '\n\nfrom its_data import *\nfrom sose_2021_data import *\nfrom itis_data import *' + \
            '\nfrom support_vars import *' + \
            '\n\n\ndef db_update(dict1, dict2):\n\tdict1.update(dict2)\n\treturn dict1' + \
            '\n\n\ndef init_db_data():\n\treturn {' + \
            '\n\t\t"explain": True,  # Einleitende Hilfstexte, die erklären, was das Kommando macht' + \
            '\n\t\t"hint_at_cmds": True, # im Text: Hilfstext ...durch Eingabe des passenden Kommandos... o.ä.' + \
            '\n\t\t"show_cmd": True , # "show_hide",  # zeige die konkreten Befehle, ggfs erst nach Aufklappen' + \
            '\n\t\t"show_sudo": True, # zeige beim konkreten Befehl an, wenn sudo genutzt werden muss\n\t}' + \
            '\n\n\ndb_data = init_db_data()\n\nprakt_ergebniskontrolle = True\n\n' + \
            '\n\nheadings = ctxt.headings\n\n'

# vms etc

# # Dieses konkrete Praktikum...
# topic_long = "iSCSI"
# topic = "iSCSI"
# count = 3

        for elem in data['content']:  # editor elements
            if 'content' in elem:
                contentList = elem['content']
                if elem['type'] == 'paragraph':
                    text += 'wl(r"""' + self.processText(contentList) + '""")\n'
                elif elem['type'] == 'heading':
                    level = elem['attrs']['level']
                    text += 'h' + str(level) + '("""' + self.processText(contentList) + '""")\n'
                elif elem['type'] == 'codeBlock':
                    language = elem['attrs']['language']

                    if language is None:
                        language = 'None'

                    text += 'bash(r"""' + self.processText(contentList) + '""")\n'
                elif elem['type'] == 'blockquote':
                    for item in elem['content']:
                        if item['type'] == 'paragraph':
                            content = item['content']

                            text += 'wl(r"""' + self.processText(content) + '""")\n'
                elif elem['type'] == 'bulletList':
                    for item in elem['content']:
                        if item['type'] == 'listItem':
                            for par in item['content']:
                                if par['type'] == 'paragraph':
                                    content = par['content']

                                    text += 'wl("""' + '- ' + self.processText(content) + '\n""")\n'
                elif elem['type'] == 'orderedList':
                    start = elem['attrs']['start']

                    index = start
                    for item in elem['content']:
                        if item['type'] == 'listItem':
                            for par in item['content']:
                                if par['type'] == 'paragraph':
                                    content = par['content']

                                    text += 'wl(r"""' + str(index) + '. ' + self.processText(content) + '\n""")\n'

                                    index = index + 1
                elif elem['type'] == 'expansionPanel':
                    text += 'wl(r"""' + self.processText(contentList) + '""")\n'
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

        text += '\n\ndef main():\n\tctxt.out_lines = filter_multiple_empty_lines(ctxt.out_lines)' + \
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

        dstPath = "../../PracticalTool/itis-praktika-master/Test/" + fileName

        # shutil.copyfile(path, dstPath)
        # print(os.getcwd())

        cp = subprocess.Popen(['cp', path, dstPath])
        cp.wait()

        p = subprocess.Popen(['./compile.sh', 'Test/' + fileName],
                             cwd="../../PracticalTool/itis-praktika-master/",
                             stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        out, err = p.communicate()
        # print(out)
        # print(err)

        p.wait()

        # out = json.dumps(out)
        # err = json.dumps(err)

        outNew = out.decode('utf-8')
        errNew = err.decode('utf-8')

        # for e in errNew:
        #     print("-" + e)

        resp = {
            "out": outNew,
            "err": errNew
        }

        print("Finished compiling of " + fileName)

        return resp
