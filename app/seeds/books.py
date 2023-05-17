from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import date

def seed_books():
    book1 = Book(
        review_id= 1,
        title='The Science of Good cooking',
        author="The Editors of America's Test Kitchen and Guy Crosby Ph.D",
        description='"The Science of Good Cooking" is a cookbook by Americas Test Kitchen. It explores the science behind cooking techniques, ingredients, and recipes. It empowers home cooks with a deeper understanding of why certain methods work. The book covers 50 concepts, such as the Maillard Reaction and brining, with practical recipes and troubleshooting tips. Its a valuable resource for beginners and experienced cooks, providing knowledge to create delicious dishes confidently.',
        price=22.99,
    )

    book2 = Book(
        review_id=2,
        title='Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking',
        author='Samin Nosrat',
        description='In "Salt, Fat, Acid, Heat," Samin Nosrat explores the fundamental elements of good cooking. She explains the role of salt, fat, acid, and heat in creating balanced and delicious dishes. With insightful explanations and practical recipes, this cookbook empowers cooks to become more confident and intuitive in the kitchen.',
        price=18.99,
    )

    book3 = Book(
        review_id=3,
        title='The Joy of Cooking',
        author='Irma S. Rombauer, Marion Rombauer Becker, and Ethan Becker',
        description='For over 85 years, "The Joy of Cooking" has been a staple in kitchens around the world. This classic cookbook offers a comprehensive collection of recipes, cooking techniques, and tips for both beginners and experienced cooks. From basic everyday dishes to complex gourmet recipes, it covers a wide range of culinary delights.',
        price=27.99,
    )

    book4 = Book(
        review_id=4,
        title='Cooking for Geeks: Real Science, Great Hacks, and Good Food',
        author='Jeff Potter',
        description='"Cooking for Geeks" combines food and science in a captivating way. It explores the scientific principles behind cooking while providing practical tips and innovative recipes. With a focus on experimentation and creativity, this cookbook is perfect for those who love to tinker in the kitchen and want to take their culinary skills to the next level.',
        price=24.99,
        created_at=date.today(),
        updated_at=date.today()
    )
    book5 = Book(
        review_id=5,
        title='The Flavor Bible: The Essential Guide to Culinary Creativity',
        author='Karen Page and Andrew Dornenburg',
        description='"The Flavor Bible" is a comprehensive guide that explores the art of flavor pairing. It provides an extensive list of ingredients and their potential flavor affinities, empowering cooks to create harmonious and innovative dishes. With this book as a companion, you can unleash your creativity in the kitchen.',
        price=29.99,
        created_at=date.today(),
        updated_at=date.today()
    )

    book6 = Book(
        review_id=6,
        title='Plenty: Vibrant Vegetable Recipes from London\'s Ottolenghi',
        author='Yotam Ottolenghi',
        description='"Plenty" showcases the versatility and vibrancy of vegetable-based cooking. With bold flavors, innovative combinations, and stunning photography, this cookbook celebrates the beauty of plant-based cuisine. It offers a wide range of recipes that will delight vegetarians, vegans, and meat-lovers alike.',
        price=32.50,
        created_at=date.today(),
        updated_at=date.today()
    )

    book7 = Book(
        review_id=7,
        title='Bread Baking for Beginners: The Essential Guide to Baking Kneaded Breads, No-Knead Breads, and Enriched Breads',
        author='Bonnie Ohara',
        description='"Bread Baking for Beginners" is a comprehensive guide for anyone who wants to master the art of baking bread. It covers the basics of bread making, including various techniques and recipes for kneaded breads, no-knead breads, and enriched breads. With step-by-step instructions and helpful tips, this book will have you baking delicious homemade bread in no time.',
        price=16.99,
        created_at=date.today(),
        updated_at=date.today()
    )

    book8 = Book(
        review_id=8,
        title='The Pioneer Woman Cooks: Recipes from an Accidental Country Girl',
        author='Ree Drummond',
        description='In "The Pioneer Woman Cooks," Ree Drummond shares her delightful recipes inspired by her life on a ranch. With a mix of comfort food classics and dishes with a twist, this cookbook captures the essence of country cooking. Ree\'s warm and humorous storytelling makes this book a joy to read and cook from.',
        price=25.99,
        created_at=date.today(),
        updated_at=date.today()
    )

    book9 = Book(
        review_id=9,
        title='Cravings: Recipes for All the Food You Want to Eat',
        author='Chrissy Teigen',
        description='In "Cravings," Chrissy Teigen presents a collection of delicious and satisfying recipes that reflect her love for food. From hearty comfort meals to lighter fare, this cookbook offers a diverse range of dishes that are approachable and full of flavor. Chrissy\'s personal anecdotes and humor make this book a delightful read.',
        price=21.95,
        created_at=date.today(),
        updated_at=date.today()
    )

    book10 = Book(
        review_id=10,
        title='Jerusalem: A Cookbook',
        author='Yotam Ottolenghi and Sami Tamimi',
        description='"Jerusalem" takes you on a culinary journey through the vibrant city, showcasing its diverse and rich food culture. With a combination of traditional and modern recipes, this cookbook highlights the flavors and influences that make Jerusalems cuisine unique. Its a celebration of the city\'s culinary heritage and a source of inspiration for home cooks.',
        price=35.00,
        created_at=date.today(),
        updated_at=date.today()
    )

    all_books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10]
    add_books = [db.session.add(book) for book in all_books]

    db.session.commit()

def undo_books():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
