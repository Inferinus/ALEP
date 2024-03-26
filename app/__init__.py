from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config

db = SQLAlchemy()
cors = CORS()

def create_app():
    app = Flask(__name__, static_folder='../frontend/build', static_url_path='/')
    app.config.from_object(Config)

    db.init_app(app)
    cors.init_app(app)

    from app import routes, models

    return app