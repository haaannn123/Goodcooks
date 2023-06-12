from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, User, db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/books/<int:book_id>')
def get_book_reviews(book_id):
    """
    Query for reviews based on book id.
    """
    book_reviews = Review.query.filter_by(book_id=book_id).all()
    reviews = [review.to_dict() for review in book_reviews]

    for review in reviews:
        userId = review['user_id']
        user = User.query.get(userId)
        review_user = user.to_dict()
        review['User_info'] = review_user

    return reviews

@review_routes.route('/books/rate', methods=['POST'])
def add_star_rating():
    user_id = session.get('_user_id')
    book_id = request.json.get('book_id')
    rating = request.json.get('rating')
    rating = Review(
        user_id = user_id,
        book_id = book_id,
        rating = rating
    )
    db.session.add(rating)
    db.session.commit()
    return rating.to_dict()
