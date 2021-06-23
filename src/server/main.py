# from startup import *
from flask_restx import Resource
from flask import request, send_from_directory
from flask_cors import CORS, cross_origin
from flask import Flask
from flask_restx import Api
from pathlib import Path
import requests
import json
import os
import shutil

from flask import Flask
from flask_restx import Api
from flask_cors import CORS

from logic import logic

name = 'tarandus'
description = 'Practical Editor API'

flask_app = Flask(__name__)

CORS(flask_app)

app = Api(flask_app)
api = app.namespace(name, description=description)


@api.route("/")
class Modules(Resource):
    # Create a new module
    def post(self):
        moduleDict = json.loads(request.data)

        path = "../../files/modules/" + moduleDict['name']

        if Path(path).exists():
            print("A module  with the name " + moduleDict['name'] + "already exists")

            return {'status': 403}
        else:
            Path("../../files/modules/" + moduleDict['name']).mkdir(parents=False, exist_ok=True)

            metaFile = open(path + '/' + moduleDict['name'] + ".meta", "w")

            metaFile.write(json.dumps(moduleDict))
            metaFile.close()

            return {'status': 200}

    # Load existing modules
    def get(self):
        path = "../../files/modules/"

        modules = []

        for elem in Path(path).iterdir():
            if elem.is_dir():
                moduleName = elem.name

                metaFile = open(path + "/" + moduleName + "/" + moduleName + ".meta", "r")
                module = json.loads(metaFile.read())

                docList = []

                for doc in Path(path + "/" + moduleName).glob('*.json'):
                    docString = doc.name.split(".", 1)

                    if docString[0].endswith("_EN"): # only include german version of document in response
                        continue

                    docDict = {"title": docString[0], "format": docString[1]}
                    docList.append(docDict)

                module['documents'] = docList

                modules.append(module)

        return modules


@api.route('/<string:moduleName>/')
class Modules(Resource):
    # Create document in given module
    def post(self, moduleName):
        path = "../../files/modules/" + moduleName

        if Path(path).exists():
            # Path(path).touch()

            reqDict = json.loads(request.data)

            fileName = path + "/" + reqDict['title']

            file = open(fileName + '.' + reqDict['format'], 'x') #{"type": "doc", "content": [{"type": "paragraph", "content": []}]}
            file.close()

            metaPath = path + "/" + moduleName + ".meta"

            if Path(metaPath).exists() and Path(metaPath).is_file(): # check if module is bilingual
                metaFile = open(metaPath, 'r')
                module = json.loads(metaFile.read())

                print(module['bilingual'])

                if module['bilingual']: # create file for english version of document
                    fileEn = open(fileName + "_EN." + reqDict['format'], 'x')
                    fileEn.close()

    # Edit given module
    def put(self, moduleName):
        target = json.loads(request.data)
        path = "../../files/modules/"

        oldName = path + moduleName
        newName = path + target['name']

        if Path(path).exists():
            Path(oldName).rename(newName)
            Path(newName + '/' + moduleName + '.meta').rename(newName + '/' + target['name'] + '.meta')

            metaFile = open(newName + '/' + target['name'] + ".meta", "w")

            metaFile.write(json.dumps(target))
            metaFile.close()

    # Delete given module
    def delete(self, moduleName):
        path = "../../files/modules/" + moduleName

        if Path(path).exists():
            try:
                shutil.rmtree(path)
                return {'status': 200}
            except:
                print("Error while deleting module")
                return {'status': 500}


@api.route('/<string:moduleName>/<string:documentName>/')
class Documents(Resource):
    # Delete given document in given module
    def delete(self, moduleName, documentName):
        path = "../../files/modules/" + moduleName + '/' + documentName + '.json'
        pathEn = "../../files/modules/" + moduleName + '/' + documentName + '_EN.json'

        if Path(path).is_file():
            os.remove(path)

        if Path(pathEn).is_file():
            os.remove(pathEn)

    # Rename given document
    def put(self, moduleName, documentName):
        targetName = json.loads(request.data)

        # print(targetName)

        path = "../../files/modules/" + moduleName + '/'
        oldName = path + documentName + '.json'
        newName = path + targetName['title'] + '.json'

        oldNameEn = path + documentName + '_EN.json'
        newNameEn = path + targetName['title'] + '_EN.json'

        if Path(oldName).is_file():
            Path(oldName).rename(newName)

        if Path(oldNameEn).is_file():
            Path(oldNameEn).rename(newNameEn)

    # Load given document
    def get(self, moduleName, documentName):
        path = "../../files/modules/" + moduleName + '/' + documentName + ".json"
        pathEn = "../../files/modules/" + moduleName + '/' + documentName + "_EN.json"

        resp = {
            "german": '',
            "english": '',
        }

        if Path(path).exists() and Path(path).is_file():
            file = open(path, "r")
            document = json.dumps(file.read())
            file.close()
            resp['german'] = document

        if Path(pathEn).exists() and Path(pathEn).is_file():
            file = open(pathEn, "r")
            document = json.dumps(file.read())
            file.close()
            resp['english'] = document

        return resp

    # Save given document
    def post(self, moduleName, documentName):
        path = "../../files/modules/" + moduleName + '/' + documentName + '.json'
        pathEn = "../../files/modules/" + moduleName + '/' + documentName + '_EN.json'
        data = json.loads(request.data)
        # print(request.data)
        if Path(path).is_file():
            file = open(path, 'w')
            file.write(json.dumps(data['content']))
            file.close()

            if Path(pathEn).exists() and Path(pathEn).is_file():
                fileEn = open(pathEn, 'w')
                fileEn.write(json.dumps(data['contentEnglish']))
                fileEn.close()

            return
        else:
            print('Error while saving changes to document')
            return {'status': 500}


@api.route('/compile/<string:moduleName>/<string:documentName>/')
class Compile(Resource):
    # Compile given document
    def post(self, moduleName, documentName):
        moduleName = moduleName.replace(" ", "")
        documentName = documentName.replace(" ", "")

        data = json.loads(request.data)

        fileName = moduleName + "_" + documentName + ".py"
        path = "../../files/output/" + fileName

        print('############################### \njsonDict: ' + '\n\n')
        # print(data['content'])

        logi = logic.Logic()

        resp = logi.compile(data=data, path=path, fileName=fileName)

        return resp

    def get(self, moduleName, documentName):
        moduleName = moduleName.replace(" ", "")
        documentName = documentName.replace(" ", "")

        fileName = moduleName + "_" + documentName + ".pdf"
        path = "../../PracticalTool/itis-praktika-master/Test/text/"

        if Path(path + fileName).exists:
            print(fileName)

        try:
            return send_from_directory(directory=path, filename=fileName, as_attachment=True)
        except Exception as e:
            return {}, 500
