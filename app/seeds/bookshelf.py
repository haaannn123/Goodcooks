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
    bookshelf4 = BookShelf(
        user_id=2,
        name="currently_reading",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf5 = BookShelf(
        user_id=2,
        name="read",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf6 = BookShelf(
        user_id=2,
        name="to_read",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf7 = BookShelf(
        user_id=3,
        name="currently_reading",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf8 = BookShelf(
        user_id=3,
        name="read",
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf9 = BookShelf(
        user_id=3,
        name="to_read",
        created_at=date.today(),
        updated_at=date.today()
    )
    all_bookshelf = [bookshelf1, bookshelf2, bookshelf3, bookshelf4, bookshelf5, bookshelf6, bookshelf7, bookshelf8, bookshelf9]
    add_bookshelf = [db.session.add(bookshelf) for bookshelf in all_bookshelf]
    db.session.commit()

def undo_bookshelf():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelves RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookshelves"))

    db.session.commit()
