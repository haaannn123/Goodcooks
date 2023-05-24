from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import BookShelf, db
from app.forms import BookshelfForm
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


@bookshelf_routes.route('/new', methods=['POST'])
def add_shelf():
    """
    Create a new shelf
    """
    form = BookshelfForm()
    user_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_shelf = BookShelf(
            user_id = user_id,
            name = form.data['name']
        )
        db.session.add(new_shelf)
        db.session.commit()
        return new_shelf.to_dict()
    return form.errors


@bookshelf_routes.route('<int:shelfId>', methods=['PUT'])
def update_shelf(shelfId):
    """
    Updates a shelf name
    """
    shelf = BookShelf.query.get(shelfId)
    data = request.get_json()
    print("DATA HERE!!", data)

    if shelf:
        shelf.name = data['name']
        db.session.commit()
        return shelf.to_dict()
    return "this didn't work at all"


@bookshelf_routes.route('/<int:shelfId>', methods=['DELETE'])
def delete_shelf(shelfId):
    shelf = BookShelf.query.get(shelfId)
    if (shelf.name == 'currently_reading' or shelf.name == 'to_read' or shelf.name == 'read'):
        return ("Can't Delete"), 404
    elif not shelf:
        return ('No Shelf Found'), 404

    db.session.delete(shelf)
    db.session.commit()
    return {"DELETED SHELF": shelfId}
