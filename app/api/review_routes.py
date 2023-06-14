from flask import Blueprint, jsonify, session, request
from flask_login import login_required
from app.models import Review, User, db
from app.forms.review_form import ReviewForm

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

@review_routes.route('/books/<int:book_id>/new', methods=['POST'])
def new_review(book_id):
    form = ReviewForm()
    user_id = session.get('_user_id')
    form['csrf_token'].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_review = Review(
            user_id = user_id,
            book_id = book_id,
            review = form.data['review'],
            rating = form.data['rating']
        )

        db.session.add(new_review)
        db.session.commit()

        user = User.query.get(user_id)
        review_user = user.to_dict()

        new_review_dict = new_review.to_dict()
        new_review_dict['User_info'] = review_user

        return new_review.to_dict()
    return form.errors

# @review_routes.route('/books/rate', methods=['POST'])
# def add_star_rating():
#     user_id = session.get('_user_id')
#     book_id = request.json.get('book_id')
#     rating = request.json.get('rating')
#     rating = Review(
#         user_id = user_id,
#         book_id = book_id,
#         rating = rating
#     )
#     db.session.add(rating)
#     db.session.commit()
#     return rating.to_dict()
