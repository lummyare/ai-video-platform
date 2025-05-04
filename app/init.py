from flask import Flask
from .config import Config
from .database.db import close_db, init_db_command

def create_app(test_config=None):
    app = Flask(__name__, instance_relative_config=True)

    if test_config is None:
        app.config.from_object(Config)
    else:
        app.config.update(test_config)

    # Initialize Database
    app.teardown_appcontext(close_db)
    app.cli.add_command(init_db_command)

    # Register blueprints
    from .routes import videos
    app.register_blueprint(videos.bp)

    return app
