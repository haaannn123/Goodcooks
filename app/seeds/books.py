from app.models import db, Book, environment, SCHEMA
from sqlalchemy.sql import text
from datetime import datetime, date

def seed_books():
    book1 = Book(
        title='The Science of Good cooking',
        owner_id=2,
        author="The Editors of America's Test Kitchen and Guy Crosby Ph.D",
        description='"The Science of Good Cooking" is a cookbook by Americas Test Kitchen. It explores the science behind cooking techniques, ingredients, and recipes. It empowers home cooks with a deeper understanding of why certain methods work. The book covers 50 concepts, such as the Maillard Reaction and brining, with practical recipes and troubleshooting tips. Its a valuable resource for beginners and experienced cooks, providing knowledge to create delicious dishes confidently.',
        price=22.99,
        published=datetime.strptime('2012-01-01','%Y-%m-%d').date(),
        preview_img="https://imgur.com/ACUEwcK.jpg"
    )

    book2 = Book(
        title='Salt, Fat, Acid, Heat: Mastering the Elements of Good Cooking',
        owner_id=2,
        author='Samin Nosrat',
        description='In "Salt, Fat, Acid, Heat," Samin Nosrat explores the fundamental elements of good cooking. She explains the role of salt, fat, acid, and heat in creating balanced and delicious dishes. With insightful explanations and practical recipes, this cookbook empowers cooks to become more confident and intuitive in the kitchen.',
        price=18.99,
        published=datetime.strptime('2017-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/QiFk5e0.jpg"
    )

    book3 = Book(
        title='The Joy of Cooking',
        owner_id=2,
        author='Irma S. Rombauer, Marion Rombauer Becker, and Ethan Becker',
        description='For over 85 years, "The Joy of Cooking" has been a staple in kitchens around the world. This classic cookbook offers a comprehensive collection of recipes, cooking techniques, and tips for both beginners and experienced cooks. From basic everyday dishes to complex gourmet recipes, it covers a wide range of culinary delights.',
        price=27.99,
        published=datetime.strptime('1931-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/2kwB7eE.jpg"
    )

    book4 = Book(
        title='Cooking for Geeks: Real Science, Great Hacks, and Good Food',
        owner_id=2,
        author='Jeff Potter',
        description='"Cooking for Geeks" combines food and science in a captivating way. It explores the scientific principles behind cooking while providing practical tips and innovative recipes. With a focus on experimentation and creativity, this cookbook is perfect for those who love to tinker in the kitchen and want to take their culinary skills to the next level.',
        price=24.99,
        published=datetime.strptime('2010-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/CIqGPYD.jpg"
    )
    book5 = Book(
        title='The Flavor Bible: The Essential Guide to Culinary Creativity',
        owner_id=2,
        author='Karen Page and Andrew Dornenburg',
        description='"The Flavor Bible" is a comprehensive guide that explores the art of flavor pairing. It provides an extensive list of ingredients and their potential flavor affinities, empowering cooks to create harmonious and innovative dishes. With this book as a companion, you can unleash your creativity in the kitchen.',
        price=29.99,
        published=datetime.strptime('2008-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/dPRDF8t.jpg"
    )

    book6 = Book(
        title='Plenty: Vibrant Vegetable Recipes from London\'s Ottolenghi',
        owner_id=2,
        author='Yotam Ottolenghi',
        description='"Plenty" showcases the versatility and vibrancy of vegetable-based cooking. With bold flavors, innovative combinations, and stunning photography, this cookbook celebrates the beauty of plant-based cuisine. It offers a wide range of recipes that will delight vegetarians, vegans, and meat-lovers alike.',
        price=32.50,
        published=datetime.strptime('2010-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/pocwzA2.jpg"
    )

    book7 = Book(
        title='Bread Baking for Beginners: The Essential Guide to Baking Kneaded Breads, No-Knead Breads, and Enriched Breads',
        owner_id=2,
        author='Bonnie Ohara',
        description='"Bread Baking for Beginners" is a comprehensive guide for anyone who wants to master the art of baking bread. It covers the basics of bread making, including various techniques and recipes for kneaded breads, no-knead breads, and enriched breads. With step-by-step instructions and helpful tips, this book will have you baking delicious homemade bread in no time.',
        price=16.99,
        published=datetime.strptime('2018-01-01','%Y-%m-%d').date(),
        preview_img="https://imgur.com/JnquzAp.jpg"
    )

    book8 = Book(
        title='The Pioneer Woman Cooks: Recipes from an Accidental Country Girl',
        owner_id=2,
        author='Ree Drummond',
        description='In "The Pioneer Woman Cooks," Ree Drummond shares her delightful recipes inspired by her life on a ranch. With a mix of comfort food classics and dishes with a twist, this cookbook captures the essence of country cooking. Ree\'s warm and humorous storytelling makes this book a joy to read and cook from.',
        price=25.99,
        published=datetime.strptime('2009-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/AmoyOJw.jpg"
    )

    book9 = Book(
        title='Cravings: Recipes for All the Food You Want to Eat',
        owner_id=2,
        author='Chrissy Teigen',
        description='In "Cravings," Chrissy Teigen presents a collection of delicious and satisfying recipes that reflect her love for food. From hearty comfort meals to lighter fare, this cookbook offers a diverse range of dishes that are approachable and full of flavor. Chrissy\'s personal anecdotes and humor make this book a delightful read.',
        price=21.95,
        published=datetime.strptime('2016-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/WOEiz7Q.jpg"
    )

    book10 = Book(
        title='Jerusalem: A Cookbook',
        owner_id=2,
        author='Yotam Ottolenghi and Sami Tamimi',
        description='"Jerusalem" takes you on a culinary journey through the vibrant city, showcasing its diverse and rich food culture. With a combination of traditional and modern recipes, this cookbook highlights the flavors and influences that make Jerusalems cuisine unique. Its a celebration of the city\'s culinary heritage and a source of inspiration for home cooks.',
        price=35.00,
        published=datetime.strptime('2012-01-01','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/qktu2mj.jpg"
    )
    book11 = Book(
        title='The Wok: Recipes and Techniques',
        owner_id=2,
        author="J. Kenji López-Alt",
        description='J. Kenji López-Alt’s debut cookbook, The Food Lab, revolutionized home cooking, selling more than half a million copies with its science-based approach to everyday foods. And for fast, fresh cooking for his family, there’s one pan López-Alt reaches for more than any other: the wok.Whether stir-frying, deep frying, steaming, simmering, or braising, the wok is the most versatile pan in the kitchen. Once you master the basics—the mechanics of a stir-fry, and how to get smoky wok hei at home—you’re ready to cook home-style and restaurant-style dishes from across Asia and the United States, including Kung Pao Chicken, Pad Thai, and San Francisco–Style Garlic Noodles. López-Alt also breaks down the science behind beloved Beef Chow Fun, fried rice, dumplings, tempura vegetables or seafood, and dashi-simmered dishes.Featuring more than 200 recipes—including simple no-cook sides—explanations of knife skills and how to stock a pantry, and more than 1,000 color photographs, The Wok provides endless ideas for brightening up dinner.',
        price=27.80,
        published=datetime.strptime('2022-03-08','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/gP6AJM3.jpg'
    )
    book12 = Book(
        title='Binging With Babish: 100 Recipes Recreated from Your Favorite Movies and TV Shows',
        owner_id=2,
        author="Andrew Rea",
        description='The internet cooking show Binging with Babish has taken YouTube by storm with an astounding 5 million fans and views as high as 12 million per episode. For each video, Andrew Rea, a self-proclaimed movie and TV buff, teaches a recipe based on a favorite TV show or film, such as the babka from the classic Seinfeld episode, the beef bourguignon from Julie & Julia, or the timpano from Big Night. This cookbook includes these and other fan-favorite recipes. Some are so delicious that you’ll want to make them for dinner right away, like Bubbas shrimp from Forrest Gump, while others can be saved for impressing a loved one—like the chocolate lava cake from Jon Favreau’s Chef, which the actor/director asked to make during a guest appearance on Rea’s show. Complete with behind-the-scenes stories and answers to frequently asked fan questions, Binging with Babish is a must-have companion to the wildly popular YouTube show.',
        price=20.99,
        published=datetime.strptime('2019-10-22','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/msM1PTC.jpg'
    )
    book13 = Book(
        title='An Unapologetic Cookbook',
        owner_id=2,
        author='Joshua Weissman',
        description="As Weissman once said '...can we please stop with the barrage of 2.3 second meals that only need 1 ingredient? I get it… we’re busy. But let’s refocus on the fact that beautifully crafted burgers don't grow on trees.' Ironically this sounds a lot like he's trying to convince you to cook, but he's really not. Is this selling the cookbook? The point is that the food in this book is an invitation that speaks for itself. Great cooking does, and should, take time. Now is the time to double down and get your head in the cooking game. Or you know, don't. Maybe get someone else to cook this stuff for you...that works too. How can you know if something is your favorite if 50 to 80 percent of the stuff you've been eating was made by someone else? Butter, condiments, cheese, pickles, patties, and buns. For a superior and potentially even life-changing experience, you can (and should, to be honest) make these from scratch. Create the building blocks necessary to make the greatest meal of your life. While you're at it, give it the Joshua Weissman—or your own—twist. As Joshua would say, “If you don’t like blue cheese, then don’t use blue cheese.” From simple staples to to gourmet to deep-fried, you are the master of your own kitchen, and you'll make it all, on your terms. With no regrets, excuses, or apologies, Joshua Weissman will instruct you how with his irreverent humor, a little bit of light razzing, and over 100 perfectly delectable recipes. If you love to host and entertain; if you like a good project; if you crave control of your food; if fast food or the frozen aisle or the super-fast-super-easy cookbook keeps letting your tastebuds down; then Joshua Weissman: An Unapologetic Cookbook is your ideal kitchen companion.",
        price=12.99,
        published=datetime.strptime('2021-09-14','%Y-%m-%d').date(),
        preview_img="https://i.imgur.com/GJV1xXZ.jpg"
    )
    book14 = Book(
        title="That Sounds So Good: 100 Real-Life Recipes for Every Day of the Week: A Cookbook",
        owner_id=2,
        author="Carla Lalli Music",
        description='Great food is an achievable part of every day, no matter how busy you are; the key is to have go-to recipes for every situation and for whatever you have on hand. The recipes in That Sounds So Good are split between weekday and weekend cooking. When time is short, turn to quick stovetop suppers, one-pot meals, and dinner salads. And for the weekend, lean into lazy lunches, simmered stews, and hands-off roasts. Carlas dishes are as inviting and get-your-attention-good as ever. All the recipes--such as Fat Noodles with Pan-Roasted Mushrooms and Crushed Herb Sauce or Chicken Legs with Warm Spices--come with multiple ingredient swaps and suggestions, so you can make eachone your own. That Sounds So Good shows Carla at her effortless best, and shows how you can be, too.',
        price=5.99,
        published=datetime.strptime('2021-10-12','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/S6IaWUj.jpg'
    )
    book15 = Book(
        title='Mi Cocina: Recipes and Rapture from My Kitchen in México',
        owner_id=2,
        author='Rick Martinez',
        description='Join Rick Martínez on a once-in-a-lifetime culinary journey throughout México that begins in Mexico City and continues through 32 states, in 156 cities, and across 20,000 incredibly delicious miles. In Mi Cocina, Rick shares deeply personal recipes as he re-creates the dishes and specialties he tasted throughout his journey. Inspired by his travels, the recipes are based on his taste memories and experiences. True to his spirit and reflective of his deep connections with people and places, these dishes will revitalize your pantry and transform your cooking repertoire. Highlighting the diversity, richness, and complexity of Mexican cuisine, he includes recipes like herb and cheese meatballs bathed in a smoky, spicy chipotle sauce from Oaxaca called Albóndigas en Chipotle; northern Méxicos grilled Carne Asada that he stuffs into a grilled quesadilla for full-on cheesy-meaty food euphoria; and tender sweet corn tamales packed with succulent shrimp, chiles, and roasted tomatoes from Sinaloa on the west coast. Ricks poignant essays throughout lend context--both personal and cultural--to quilt together a story that is rich and beautiful, touching and insightful.',
        price=14.99,
        published=datetime.strptime('2022-05-03','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/au1q62H.jpg'
    )
    book16 = Book(
        title='The Complete Mediterranean Cookbook',
        owner_id=2,
        author='America\'s Test Kitchen',
        description='This comprehensive cookbook by America\'s Test Kitchen explores the vibrant and healthy cuisine of the Mediterranean. It features over 500 recipes inspired by the flavors and ingredients of the Mediterranean region. From fresh salads and flavorful seafood dishes to hearty soups and satisfying desserts, this cookbook offers a wide range of recipes for every occasion.',
        price=26.99,
        published=datetime.strptime('2016-12-27','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/D85azaO.jpg'
    )
    book17 = Book(
        title='Mastering the Art of French Cooking',
        owner_id=2,
        author='Julia Child, Louisette Bertholle, Simone Beck',
        description='Julia Child\'s "Mastering the Art of French Cooking" is a culinary masterpiece that has been a classic for decades. This iconic cookbook introduces readers to the techniques and recipes of French cuisine, with detailed instructions and illustrations. From classic dishes like boeuf bourguignon to delicate pastries, this book is a must-have for anyone interested in French cooking.',
        price=34.99,
        published=datetime.strptime('1961-10-16','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/iS17Ecv.jpg'
    )
    book18 = Book(
        title='The Oh She Glows Cookbook: Over 100 Vegan Recipes to Glow from the Inside Out',
        owner_id=2,
        author='Angela Liddon',
        description='For those interested in vegan cooking, "The Oh She Glows Cookbook" is a fantastic resource. Angela Liddon shares over 100 plant-based recipes that are delicious, nourishing, and vibrant. From energizing breakfasts to satisfying main dishes and indulgent desserts, this cookbook proves that vegan food can be both healthy and flavorful.',
        price=19.95,
        published=datetime.strptime('2014-03-04','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/7V2Kh7x.jpg'
    )
    book19 = Book(
        title='The Complete America\'s Test Kitchen TV Show Cookbook',
        owner_id=2,
        author='America\'s Test Kitchen',
        description='If you\'re a fan of the America\'s Test Kitchen TV show, this cookbook is a must-have. It features every recipe from all 21 seasons of the show, providing a wide range of dishes to choose from. With detailed instructions and helpful tips, this cookbook will help you perfect your cooking skills and expand your recipe repertoire.',
        price=39.99,
        published=datetime.strptime('2001-10-01','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/BR2T4fE.jpg'
    )
    book20 = Book(
        title='Vegetable Kingdom: The Abundant World of Vegan Recipes',
        owner_id=2,
        author='Bryant Terry',
        description='"Vegetable Kingdom" is a cookbook that celebrates the vibrant flavors and textures of plant-based cuisine. Bryant Terry presents over 100 recipes inspired by global flavors and culinary traditions. From soulful soups and stews to refreshing salads and inventive grain dishes, this cookbook showcases the versatility and deliciousness of vegetables.',
        price=22.49,
        published=datetime.strptime('2020-02-11','%Y-%m-%d').date(),
        preview_img='https://i.imgur.com/u3ilKcQ.jpg'
    )

    all_books = [book1, book2, book3, book4, book5, book6, book7, book8, book9, book10, book11, book12, book13, book14, book15, book16, book17, book18, book19, book20]
    add_books = [db.session.add(book) for book in all_books]

    db.session.commit()

def undo_books():
    if environment == 'production':
        db.session.execute(f"TRUNCATE table {SCHEMA}.books RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM books"))

    db.session.commit()
