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


from flask import Flask
from flask_restx import Api
from flask_cors import CORS

name = 'tarandus'
description = 'Practical Editor API'

flask_app = Flask(__name__)

CORS(flask_app)

app = Api(flask_app)
api = app.namespace(name, description=description)


@api.route("/")
class Modules(Resource):
    def post(self):
        print(f'req: {request} data: {request.data} header: {request.headers}')

        moduleDict = json.loads(request.data)

        path = "../../files/modules/" + moduleDict['name']

        if Path(path).exists():
            print("A module  with the name " + moduleDict['name'] + "already exists")

            return {'status': 403}
        else:
            Path("../../files/modules/" + moduleDict['name']).mkdir(parents=False, exist_ok=True)

            metaFile = open(path + '/' + moduleDict['name'] + ".meta", "w")

            # metaFile.write('{"description": "' + moduleDict['description'] +
            #                '", "bilingual": ' + moduleDict['bilingual'] + '}')
            metaFile.write(json.dumps(moduleDict))

            metaFile.close()

            return {'status': 200}

    def get(self):
        path = "../../files/modules/"

        modules = []

        for elem in Path(path).iterdir():
            print(elem)
            if elem.is_dir():
                print(elem.name + " istDir")

                # dict = {"name": [], "description": [], "bilingual": []}

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
