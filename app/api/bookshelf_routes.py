from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import BookShelf, db
from datetime import date, datetime

bookshelf_routes = Blueprint('bookshelf', __name__)

@bookshelf_routes.route('/current')
def bookshelf():
    """
    Query for current user's bookshelf
    """
    user_id = session.get('_user_id')
    bookshelves = BookShelf.query.filter_by(user_id=user_id).all()
    response = [bookshelf.to_dict() for bookshelf in bookshelves]
    return response

