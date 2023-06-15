from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from follows import follows


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    profile_img = db.Column(db.String, nullable=True)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)

    books = db.relationship("Book", back_populates='owner', cascade='all, delete-orphan')
    bookshelf = db.relationship('BookShelf', back_populates='user',cascade="all, delete-orphan" )
    reviews = db.relationship('Review', back_populates='user', cascade="all, delete-orphan")
    followers = db.relationship('User', secondary='follows', primaryjoin=follows.columns.followed == id, secondaryjoin=follows.columns.follower == id, back_populates='following' )
    following  = db.relationship('User', secondary='follows', primaryjoin=follows.c.follower == id, secondaryjoin=follows.c.followed == id, back_populates="followers")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'profile_img': self.profile_img,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'username': self.username,
            'email': self.email
        }
