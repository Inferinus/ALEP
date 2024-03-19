from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config

app = Flask(__name__, static_folder='/Users/awwalahmed/Documents/SeniorSeminar/ALEP/frontend/dist/frontend-app/browser')
app.config.from_object(Config)
db = SQLAlchemy(app)

from app import routes, models