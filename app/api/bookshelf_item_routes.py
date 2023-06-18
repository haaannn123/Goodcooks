from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import BookShelfItem, db, Book, BookShelf
from datetime import date, datetime

bookshelf_item_routes = Blueprint('bookshelf_items', __name__)

@bookshelf_item_routes.route('/<int:shelfId>')
def bookshelf_item(shelfId):
    """
    Query for all the books in the bookshelf
    """
    books = Book.query.join(BookShelfItem).filter(BookShelfItem.bookshelf_id == shelfId).all()
    books_data = [item.to_dict() for item in books]
    return books_data

@bookshelf_item_routes.route('/want_to_read/<int:bookId>')
def book_in_want_to_read_shelf(bookId):
    """
    Check if a book exists in the specified bookshelf
    """
    current_user_id = session.get('_user_id')
    if current_user_id is None:
        return "Not authenticated"
    bookshelves = BookShelf.query.filter_by(user_id=current_user_id, name="Your Bookshelf Name").all()
    
    
    bookshelf_item_exists = BookShelfItem.query.join(BookShelf).filter(
        BookShelf.id.in_([shelf.id for shelf in bookshelves]),
        BookShelfItem.book_id == bookId
    ).count() > 0
    
    print("\n\n",bookshelf_item_exists, "\n\n" )

    return str(bookshelf_item_exists)


@bookshelf_item_routes.route('/<int:bookId>', methods=['POST'])
def add_to_shelf(bookId):
    """
    Add a book to the bookshelf item
    """
    bookshelf_id = request.json.get('bookshelf_id')

    #Check if book exists in data
    existing_book = BookShelfItem.query.filter_by(bookshelf_id=bookshelf_id,book_id=bookId).first()
    if existing_book:
        return ("Book already belongs to this shelf"), 400
    new_bookshelf_item = BookShelfItem(
        bookshelf_id=bookshelf_id,
        book_id=bookId
    )
    db.session.add(new_bookshelf_item)
    db.session.commit()
    return new_bookshelf_item.to_dict()


@bookshelf_item_routes.route('/<int:bookshelfId>/<int:bookId>', methods=['DELETE'])
def delete_item(bookshelfId, bookId):
    bookshelf_item = BookShelfItem.query.filter_by(bookshelf_id=bookshelfId, book_id=bookId).first()
    if (not bookshelf_item):
        return ('No Item Found'), 404
    db.session.delete(bookshelf_item)
    db.session.commit()
    return {"Item was sucessfully deleted": bookId}
