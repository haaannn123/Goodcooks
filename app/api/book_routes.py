from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Book

book_routes = Blueprint('books', __name__)

@book_routes.route('/')
def books():
    """
    Query for all books
    """
    books = Book.query.all()
    return {book.to_dict() for book in books}

# @book_routes.route('/')
# def book(id):
#     """
#     Query for all books
#     """
#     book = Book.query.get(id)
#     return book.to_dict()
