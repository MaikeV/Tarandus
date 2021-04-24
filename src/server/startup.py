from flask import Flask
from flask_restx import Api
from flask_cors import CORS

import json
import requests

name = 'tarandus'
description = 'Practical Editor API'

flask_app = Flask(__name__)

CORS(flask_app)

app = Api(flask_app)
api = app.namespace(name, description=description)
