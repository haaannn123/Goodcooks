# Goodcooks

Goodcooks is a full-stack clone of Goodreads using React & Redux for the front end and Python & Flask for the back end. It allows users to keep track of their favorite cookbooks as well as see what their friends are cooking. 

<div align=center>
<img src="https://i.imgur.com/G5cBrlo.png" width=100%/>
<img src="https://i.imgur.com/0zdbxp3.png" width=100%/>
</div>

## Live Link: https://greatcooks-social-app.onrender.com

## Goodcooks was created with the following languages and frameworks:
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![Python](https://img.shields.io/badge/Python-%233776AB.svg?style=for-the-badge&logo=python&logoColor=white)
![Flask](https://img.shields.io/badge/Flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-%23FCA121.svg?style=for-the-badge&logo=sqlalchemy&logoColor=white)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)


## Connect with me! 
<div id="">
    <a href="https://www.linkedin.com/in/han-nguyen-developer/">
      <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
    </a> 
 </div>

---

# Flask React Project

This is the starter for the Flask React project.

## Getting started
1. Clone this repository (only this branch)

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment

4. Make sure the SQLite3 database connection URL is in the **.env** file

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention**.

6. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.

---

# Features List

### 1. New account creation, log in, log out, and guest/demo login
* New Users can sign up or use demo login
* Users can sign in and sign out
* Users can't use certain features without logging in(like adding the book to their bookshelf)
* Upon Login users are directed to their homepage
* Upon Logout users are directed to the splash page

### 2. Hosting on Render

### 3. BOOK
* Logged-in users can create books that they don't already see on the website. 
* Logged in users can delete books that they've created. 
* Logged in users can view a list of all books of other users. 

### 4. BOOKSHELF
* Logged-in users can create bookshelf items within their bookshelves as well as add and remove books.
* Logged-in users can see each other's bookshelves. 
