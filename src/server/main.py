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

        module_dict = json.loads(request.data)

        print(module_dict)
        print(module_dict['name'])

        path = "../../files/modules/" + module_dict['name']

        if Path(path).exists():
            print("Module already exists")

            return {'status': 403}
        else:
            Path("../../files/modules/" + module_dict['name']).mkdir(parents=False, exist_ok=True)
