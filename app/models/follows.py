from .db import db

follows = db.Table(
    'follows',
    db.Column(
        "follower",
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    ),
    db.Column(
        'followed',
        db.Integer,
        db.ForeignKey("users.id"),
        primary_key=True
    )
)