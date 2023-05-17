from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, User, db

review_routes = Blueprint('reviews', __name__)

@review_routes.route('/user/<int:user_id>')
@login_required
def reviews_of_user(user_id):
    """
    Query for all of the reviews of the current user
    """
    user_reviews = Review.query.filter_by(user_id=user_id).all()
    return [review.to_dict() for review in user_reviews]
