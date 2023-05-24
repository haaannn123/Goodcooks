from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Book(db.Model):
    __tablename__ = 'books'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')))
    title = db.Column(db.Text, nullable=False)
    author = db.Column(db.Text, nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    published = db.Column(db.Date)
    preview_img= db.Column(db.String, nullable=False)

    owner = db.relationship("User", back_populates="books")
    reviews = db.relationship('Review', back_populates="book")
    shelf = db.relationship('BookShelfItem', back_populates="book")

    def to_dict(self):
        return {
            'id': self.id,
            'owner_id': self.owner_id,
            'title': self.title,
            'author': self.author,
            'description': self.description,
            'price': self.price,
            'published': self.published,
            'preview_img': self.preview_img
        }
