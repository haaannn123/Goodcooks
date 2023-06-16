from flask.cli import AppGroup
from .users import seed_users, undo_users
from .books import seed_books, undo_books
from .reviews import seed_reviews, undo_reviews
from .bookshelf import seed_bookshelf, undo_bookshelf
from .follows import seed_follows, undo_follows
from .bookshelf_item import seed_bookshelf_items, undo_bookshelf_items
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo
        # command, which will  truncate all tables prefixed with
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_follows()
        undo_reviews()
        undo_bookshelf_items()
        undo_bookshelf()
        undo_books()
        undo_users()
    seed_users()
    seed_books()
    seed_bookshelf()
    seed_bookshelf_items()
    seed_reviews()
    seed_follows()


    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_follows()
    undo_reviews()
    undo_bookshelf_items()
    undo_bookshelf()
    undo_books()
    undo_users()
    # Add other undo functions here
