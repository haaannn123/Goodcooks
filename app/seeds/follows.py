from app.models import db, User, environment, SCHEMA, follows
from sqlalchemy.sql import text
from datetime import date

def seed_follows():
    user_1 = User.query.filter_by(username='Demo').first()
    user_2 = User.query.filter_by(username='HNguyen').first()
    user_3 = User.query.filter_by(username='BFlood').first()

    # Make user_1 follow user2 and user_3
    user_1.following.append(user_2)
    user_1.following.append(user_3)

    # Make user_2 follow user1 and user_3
    user_2.following.append(user_1)
    user_2.following.append(user_3)

    # Make user3 follow user_1 and user_2
    user_3.following.append(user_1)
    user_3.following.append(user_2)

    # Commit the changes to the database
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_follows():
    if environment == "production":
        db.session.execute(f"TRUNCATE TABLE {SCHEMA}.follows RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text(f"DELETE FROM follows"))

    db.session.commit()