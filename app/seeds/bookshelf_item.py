from app.models import db, BookShelfItem, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_bookshelf_items():
    bookshelf_item1 = BookShelfItem(
        bookshelf_id = 1,
        book_id = 1,
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf_item2= BookShelfItem(
        bookshelf_id = 1,
        book_id = 2,
        created_at=date.today(),
        updated_at=date.today()
    )
    bookshelf_item3 = BookShelfItem(
        bookshelf_id = 1,
        book_id = 3,
        created_at=date.today(),
        updated_at=date.today()
    )
    all_bookshelf_item = [bookshelf_item1, bookshelf_item2, bookshelf_item3]
    add_bookshelf_item = [db.session.add(bookshelf_item) for bookshelf_item in all_bookshelf_item]
    db.session.commit()

def undo_bookshelf_items():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.bookshelf_items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM bookshelf_items"))

    db.session.commit()
