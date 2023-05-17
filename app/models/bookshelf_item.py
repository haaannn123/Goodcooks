from db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class BookShelfItem(db.Model):
    __tablename__ = 'bookshelf_items'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    bookshelf_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('bookshelves.id')))
    book_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('books.id')))
    created_at = db.Column(db.DateTime, default=datetime.now)
    updated_at = db.Column(db.DateTime, default=datetime.now)

    bookshelf = db.relationship("User", back_populates="item")
    book = db.relationship("Book", back_populates="shelf", )

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.bookshelf_id,
            'user_id': self.book_id,
            'created_at': self.created_at,
            'updated_at': self.updated_at,
        }
