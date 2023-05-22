from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import BookShelfItem, db, Book
from datetime import date, datetime

bookshelf_item_routes = Blueprint('bookshelf_items', __name__)

@bookshelf_item_routes.route('/<int:bookshelfId>')
def bookshelf_item(bookshelfId):
    books = Book.query.join(BookShelfItem).filter(BookShelfItem.bookshelf_id == bookshelfId).all()
    books_data = [item.to_dict() for item in books]
    return books_data
