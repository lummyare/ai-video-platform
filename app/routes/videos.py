from flask import Blueprint, jsonify, request
from ..database.db import get_db

bp = Blueprint('videos', __name__, url_prefix='/api/videos')

@bp.route('/', methods=['GET'])
def get_videos():
    db = get_db()
    videos = db.execute('SELECT * FROM videos').fetchall()
    return jsonify([dict(video) for video in videos])

@bp.route('/<int:id>', methods=['GET'])
def get_video(id):
    db = get_db()
    video = db.execute('SELECT * FROM videos WHERE id = ?', (id,)).fetchone()
    return jsonify(dict(video)) if video else ('', 404)
