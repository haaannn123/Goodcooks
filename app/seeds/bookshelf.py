from app.models import db, BookShelf, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_bookshelf():
    bookshelf1 = BookShelf(
        user_id=1,
        name="currently_reading",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf2 = BookShelf(
        user_id=1,
        name="read",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf3 = BookShelf(
        user_id=1,
        name="to_read",
        created_at=date.today(),
        updated_at=date.today()
    )

    db.session.commit()

def undo_bookshelf():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookshelves"))

    db.session.commit()
