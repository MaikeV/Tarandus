# from startup import *
from flask_restx import Resource
from flask import request
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
            Path(path).touch()

            reqDict = json.loads(request.data)

            file = open(path + "/" + reqDict['title'] + '.' + reqDict['format'], 'x')
            file.close()

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

        if Path(path).is_file():
            os.remove(path)

    # Rename given document
    def put(self, moduleName, documentName):
        targetName = json.loads(request.data)

        print(targetName)

        path = "../../files/modules/" + moduleName + '/'
        oldName = path + documentName + '.json'
        newName = path + targetName['title'] + '.json'

        if Path(oldName).is_file():
            Path(oldName).rename(newName)

    # Load given document
    def get(self, moduleName, documentName):
        path = "../../files/modules/" + moduleName + '/' + documentName + ".json"

        file = open(path, "r")
        document = json.dumps(file.read())
        file.close()

        return document

    # Save given document
    def post(self, moduleName, documentName):
        path = "../../files/modules/" + moduleName + '/' + documentName + '.json'
        data = json.loads(request.data)
        print(request.data)
        if Path(path).is_file():
            file = open(path, 'w')
            file.write(json.dumps(data))
            file.close()
            return
        else:
            print('Error while saving changes to document')
            return {'status': 500}


@api.route('/compile/<string:moduleName>/<string:documentName>/')
class Compile(Resource):
    # Compile given document
    def post(self, moduleName, documentName):
        data = json.loads(request.data)

        path = "../../files/output/" + moduleName + "_" + documentName + ".py"

        print('############################### \njsonDict: ' + '\n\n')
        # print(data['content'])

        logi = logic.Logic()

        logi.compile(data=data, path=path)
