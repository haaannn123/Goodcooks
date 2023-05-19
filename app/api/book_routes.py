from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Book, db
from app.forms import BookForm
from datetime import date, datetime

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
    """
    Create a new book
    """
    form = BookForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_book = Book(
            title = form.data['title'],
            author = form.data['author'],
            description = form.data['description'],
            price = form.data['price'],
            published = form.data['published'],
            preview_img = form.data['preview_img'],
        )
        print('BACKEnd', new_book)
        db.session.add(new_book)
        db.session.commit()
        return new_book.to_dict()
    return form.errors


@book_routes.route('/<int:bookId>', methods=['PUT'])
def update_book(bookId):
    """
    Update the book by it's id
    """
    book = Book.query.get(bookId)
    data = request.get_json()

    if book:
        book.title = data['title']
        book.author = data['author']
        book.description = data['description']
        book.price = data['price']

        # Convert the date string to a Pythong date object
        published_date = datetime.strptime(data['published'], '%Y-%m-%d').date()
        book.published = published_date

        book.preview_img = data['preview_img']
        db.session.commit()
        return book.to_dict()
    return 'this didnt work!!!!'


@book_routes.route('/<int:bookId>', methods=['DELETE'])
def delete_book(bookId):
    book = Book.query.get(bookId)
    if (not book):
        return ('No Book Found'), 404

    db.session.delete(book)
    db.session.commit()
    return {'Book deleted!Yay!': bookId}
