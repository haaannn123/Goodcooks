from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Book, db
from app.forms import BookForm
from datetime import date

book_routes = Blueprint('books', __name__)

@book_routes.route('/')
def books():
    """
    Query for all books
    """
    books = Book.query.all()
    response = [book.to_dict() for book in books]
    return response

@book_routes.route('/<int:id>')
def book(id):
    """
    Query for a book by its id
    """
    book = Book.query.get(id)
    return book.to_dict()

@book_routes.route('/new', methods=['POST'])
def create_book():
    form = BookForm()
    print('BOOK FORM:', form)

    if form.validate_on_submit():
        new_book = Book(
            title = form.data['title'],
            author = form.data['author'],
            description = form.data['description'],
            price = form.data['price'],
            published = form.data['published'],
            preview_img = form.data['preview_img'],
            created_at = date.today(),
            updated_at = date.today()
        )
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict()
    return "BAD DATA :("

