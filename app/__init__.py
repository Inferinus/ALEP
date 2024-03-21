from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_cors import CORS

app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
app.config.from_object(Config)
db = SQLAlchemy(app)
CORS(app)

from app import routes, models