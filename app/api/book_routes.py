from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import Book, db, User
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

    # Add owner to response
    for book in response:
        owner_id = book.get('owner_id')
        owner = User.query.get(owner_id)
        if owner:
            book['owner_info'] = owner.to_dict()['username']
    return response

@book_routes.route('/', methods=["POST"])
def search_books():
    data = request.get_json()
    query = data["query"]
    results = []
    print("\n\nQUERY: ", query, "\n\n")
    
    if query:
        # Query books from the database
        books = Book.query.all()
        
        # Perform a simple case-insensitive search based on the query string
        results = [book.to_dict() for book in books if query.lower() in book.title.lower()]

    return jsonify(results)


@book_routes.route('/<int:id>')
def book(id):
    """
    Query for a book by its id
    """
    book = Book.query.get(id)
    response = book.to_dict()
    owner_id = book.owner_id
    owner = User.query.get(owner_id)
    if owner:
        response['owner_info'] = owner.to_dict()['username']
    return response


@book_routes.route('/new', methods=['POST'])
def create_book():
    """
    Create a new book
    """
    form = BookForm()
    owner_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        new_book = Book(
            owner_id = owner_id,
            title = form.data['title'],
            author = form.data['author'],
            description = form.data['description'],
            price = form.data['price'],
            published = form.data['published'],
            preview_img = form.data['preview_img'],
        )
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
