from db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    review_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('reviews.id')))
    title = db.Column(db.String(50), nullable=False)
    author = db.Column(db.String(50), nullable=False)
    description = db.Column(db.String(255), nullable=False)
    price = db.Column(db.Integer, nullable=False)
    published = db.Column(db.Date, nullable=False)

    review = db.relationship('Review', back_populates='book_review')
    shelf = db.relationship('BookShelfItem', back_populates="book")

    def to_dict(self):
        return {
            'id': self.id,
            'review_id': self.review_id,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'price': self.price,
            'published': self.published,
        }
