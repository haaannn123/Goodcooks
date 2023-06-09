from app.models import db, Review, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date



def seed_reviews():
    review1 = Review(
        user_id=2,
        book_id=1,
        review="This cookbook completely transformed my cooking skills! The science-based approach helped me understand the 'why' behind techniques. Highly recommend it!",
        rating=5,
        created_at=date.today(),
        updated_at=date.today()
    )

    review2 = Review(
        user_id=1,
        book_id=2,
        review="Salt, Fat, Acid, Heat is a game-changer! Samin Nosrat's explanations are so insightful, and the recipes are delicious. A must-have for any cook.",
        rating=4,
        created_at=date.today(),
        updated_at=date.today()
    )

    review3 = Review(
        user_id=1,
        book_id=3,
        review="The Joy of Cooking is a classic for a reason. It's my go-to guide whenever I want to explore new recipes. Highly comprehensive and reliable.",
        rating=4.5,
        created_at=date.today(),
        updated_at=date.today()
    )

    review4 = Review(
        user_id=2,
        book_id=4,
        review="Cooking for Geeks is a fascinating read. It combines science and cooking in a fun way. The recipes are unique and push the boundaries of traditional cooking.",
        rating=4.5,
        created_at=date.today(),
        updated_at=date.today()
    )

    review5 = Review(
        user_id=2,
        book_id=5,
        review="The Flavor Bible is a treasure trove for flavor inspiration. I love exploring different ingredient pairings and experimenting with new flavors. A must-have for creative cooks.",
        rating=4,
        created_at=date.today(),
        updated_at=date.today()
    )

    review6 = Review(
        user_id=1,
        book_id=6,
        review="Plenty is a beautiful cookbook that celebrates the wonders of vegetarian cooking. The recipes are bursting with flavor and creativity. A must-try for vegetable lovers.",
        rating=5,
        created_at=date.today(),
        updated_at=date.today()
    )

    review7 = Review(
        user_id=2,
        book_id=7,
        review="Bread Baking for Beginners helped me overcome my fear of baking bread. The instructions are clear, and the recipes turn out amazing. I'm now a confident bread baker!",
        rating=4.5,
        created_at=date.today(),
        updated_at=date.today()
    )

    review8 = Review(
        user_id=1,
        book_id=8,
        review="The Pioneer Woman Cooks captures the essence of comfort cooking. Ree's recipes are hearty and delicious, perfect for satisfying cravings. I love her storytelling too!",
        rating=4,
        created_at=date.today(),
        updated_at=date.today()
    )

    review9 = Review(
        user_id=1,
        book_id=9,
        review="Cravings is a fun and relatable cookbook. Chrissy Teigen's recipes are flavorful and accessible. It's like cooking with a friend in the kitchen!",
        rating=4.5
    )
    review10 = Review(
        user_id=2,
        book_id=10,
        review="I'm blown away by the flavors in Jerusalem. The recipes are approachable yet exciting. It's become one of my favorite cookbooks in my collection.",
        rating=5,
        created_at=date.today(),
        updated_at=date.today()
    )


    all_reviews = [review1, review2, review3, review4, review5, review6, review7, review8, review9, review10]
    add_reviews = [db.session.add(review) for review in all_reviews]
    db.session.commit()


def undo_reviews():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.reviews RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM reviews"))

    db.session.commit()
