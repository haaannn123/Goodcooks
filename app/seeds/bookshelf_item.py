from app.models import db, BookShelf, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_bookshelf_item():
    bookshelf_item1 = BookShelf(
        bookshelf_id = 1,
        book_id = 1,
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf_item2= BookShelf(
        bookshelf_id = 1,
        book_id = 2,
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf_item1 = BookShelf(
        bookshelf_id = 1,
        book_id = 3,
        created_at=date.today(),
        updated_at=date.today()
    )

    db.session.commit()

def undo_bookshelf_item():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelf_item RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookshelf_item"))

    db.session.commit()
