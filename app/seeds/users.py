from app.models import db, User, environment, SCHEMA
from sqlalchemy.sql import text


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        profile_img = "https://i.imgur.com/nqak9tT.png",
        first_name="Demo",
        last_name = "User",
        username='Demo',
        email='demo@aa.io',
        password='Onecooldog123'
        )
    han = User(
        profile_img="https://i.imgur.com/pjS1da6.jpg",
        first_name="Han",
        last_name="Nguyen",
        username='HNguyen',
        email='hnguyen@aa.io',
        password='Onecooldog123'
        )
    bflood = User(
        profile_img="https://i.imgur.com/pjS1da6.jpg",
        first_name="Brennan",
        last_name="Flood",
        username='BFlood',
        email='bflood@aa.io',
        password='Onecooldog123'
        )

    db.session.add(demo)
    db.session.add(han)
    db.session.add(bflood)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM users"))

    db.session.commit()
