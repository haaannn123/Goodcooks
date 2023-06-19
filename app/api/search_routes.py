from flask import Blueprint, jsonify, request, session
from flask_login import login_required
from app.models import Book, db, User
from app.forms import BookForm
from datetime import date, datetime

search_routes = Blueprint('search', __name__)

@search_routes.route('/<string:query>')
def search_results(query):
    results = []
    
    if query:
        # Query books from the database
        books = Book.query.all()
        
        # Perform a simple case-insensitive search based on the query string
        results = [book.to_dict() for book in books if query.lower() in book.title.lower()]

    return jsonify(results)

